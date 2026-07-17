"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Wrapper de Web Speech API (SpeechRecognition) — transcreve fala em pt-BR.
 *
 * Nota de privacidade: em Chrome/Edge/Android a Google recebe o áudio para
 * processar (não é on-device). iOS Safari 16+ é on-device. Firefox não suporta.
 *
 * Fluxo de permissão: antes de iniciar o reconhecedor, este hook chama
 * `getUserMedia({audio:true})` para (a) forçar o prompt nativo do sistema
 * quando a permissão está no estado "prompt" e (b) detectar imediatamente
 * quando está "denied" — o SpeechRecognition puro tende a falhar silenciosa
 * ou tardiamente em Android nesse caso. O stream é liberado logo em seguida
 * (o próprio SpeechRecognition abre a captura interna quando `start()` roda).
 *
 * A callback `aoTrechoFinal` é chamada imperativamente a cada trecho final,
 * evitando loops de useEffect no consumidor.
 */

type ResultadoReconhecido = {
  isFinal: boolean;
  [index: number]: { transcript: string };
};

type EventoResultado = {
  resultIndex: number;
  results: ArrayLike<ResultadoReconhecido>;
};

type EventoErro = {
  error: string;
};

interface IReconhecedor extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: EventoResultado) => void) | null;
  onerror: ((e: EventoErro) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => IReconhecedor;
    webkitSpeechRecognition?: new () => IReconhecedor;
  }
}

export type StatusTranscricao = "inativo" | "solicitando" | "gravando" | "erro";

export type ErroTranscricao =
  | "sem-suporte"
  | "permissao-bloqueada"
  | "sem-microfone"
  | "sem-audio"
  | "rede"
  | "generico";

const MENSAGENS_ERRO: Record<ErroTranscricao, string> = {
  "sem-suporte":
    "Seu navegador ainda não escuta pt-BR. Escreva por aqui — funciona igual.",
  "permissao-bloqueada":
    "O microfone está bloqueado para este site.",
  "sem-microfone":
    "Não encontrei um microfone neste aparelho.",
  "sem-audio":
    "Não te escutei. Aproxime o celular da boca e tente de novo.",
  rede: "Sem internet no momento. Tente escrever ou volte quando conectar.",
  generico: "Não consegui gravar agora. Tente de novo em instantes.",
};

type Opcoes = {
  /** Chamada imperativamente a cada trecho FINAL reconhecido. */
  aoTrechoFinal?: (trecho: string) => void;
};

async function solicitarPermissaoMic(): Promise<
  "ok" | "negado" | "sem-mic" | "erro"
> {
  if (!navigator.mediaDevices?.getUserMedia) return "erro";
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Libera imediatamente — o SpeechRecognition abre seu próprio stream em start()
    stream.getTracks().forEach((t) => t.stop());
    return "ok";
  } catch (e) {
    const nome = (e as { name?: string } | null)?.name;
    if (nome === "NotAllowedError" || nome === "SecurityError") return "negado";
    if (nome === "NotFoundError" || nome === "OverconstrainedError") return "sem-mic";
    return "erro";
  }
}

export function useTranscricaoVoz({ aoTrechoFinal }: Opcoes = {}) {
  const [status, setStatus] = useState<StatusTranscricao>("inativo");
  const [erro, setErro] = useState<ErroTranscricao | null>(null);
  const [trechoParcial, setTrechoParcial] = useState("");
  const refReconhecedor = useRef<IReconhecedor | null>(null);
  const refCallback = useRef(aoTrechoFinal);

  useEffect(() => {
    refCallback.current = aoTrechoFinal;
  }, [aoTrechoFinal]);

  const suportado =
    typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const parar = useCallback(() => {
    refReconhecedor.current?.stop();
  }, []);

  const iniciar = useCallback(async () => {
    if (!suportado) {
      setErro("sem-suporte");
      setStatus("erro");
      return;
    }
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) return;

    setErro(null);
    setStatus("solicitando");

    // Força o prompt do sistema (se permissão for "prompt") ou detecta bloqueio
    const resultado = await solicitarPermissaoMic();
    if (resultado === "negado") {
      setErro("permissao-bloqueada");
      setStatus("erro");
      return;
    }
    if (resultado === "sem-mic") {
      setErro("sem-microfone");
      setStatus("erro");
      return;
    }

    const rec = new Ctor();
    rec.lang = "pt-BR";
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (evento) => {
      let finalAcumulado = "";
      let parcialAcumulado = "";
      for (let i = evento.resultIndex; i < evento.results.length; i++) {
        const r = evento.results[i];
        if (!r) continue;
        const t = r[0]?.transcript ?? "";
        if (r.isFinal) finalAcumulado += t;
        else parcialAcumulado += t;
      }
      if (finalAcumulado.trim()) {
        refCallback.current?.(finalAcumulado.trim());
      }
      setTrechoParcial(parcialAcumulado);
    };

    rec.onerror = (evento) => {
      const codigo = evento.error;
      let mapeado: ErroTranscricao = "generico";
      if (codigo === "not-allowed" || codigo === "service-not-allowed") mapeado = "permissao-bloqueada";
      else if (codigo === "no-speech" || codigo === "audio-capture") mapeado = "sem-audio";
      else if (codigo === "network") mapeado = "rede";
      setErro(mapeado);
      setStatus("erro");
    };

    rec.onend = () => {
      setTrechoParcial("");
      setStatus((s) => (s === "erro" ? s : "inativo"));
    };

    refReconhecedor.current = rec;
    setTrechoParcial("");
    try {
      rec.start();
      setStatus("gravando");
    } catch {
      setErro("generico");
      setStatus("erro");
    }
  }, [suportado]);

  const dispensarErro = useCallback(() => {
    setErro(null);
    setStatus("inativo");
  }, []);

  useEffect(() => {
    return () => {
      refReconhecedor.current?.abort();
    };
  }, []);

  return {
    suportado,
    status,
    erro,
    mensagemErro: erro ? MENSAGENS_ERRO[erro] : null,
    trechoParcial,
    iniciar,
    parar,
    dispensarErro,
  };
}
