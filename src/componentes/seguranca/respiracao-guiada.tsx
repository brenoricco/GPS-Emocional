"use client";

import { useEffect, useRef, useState } from "react";

import { useAudioRespiracao } from "@/hooks/usar-audio-respiracao";

interface PropsRespiracao {
  aoFinalizar: () => void;
  /**
   * Número de ciclos da respiração 4-7-8 (default 4 ≈ 76s).
   * Use 2-3 pra versões "gostinho" sem fricção (landing pública).
   */
  ciclos?: number;
}

type FaseRespiratoria = "preparar" | "inspirar" | "segurar" | "expirar" | "fim";

interface ConfigFase {
  rotulo: string;
  duracaoSeg: number;
  contagem: number;
}

const FASES: Record<Exclude<FaseRespiratoria, "preparar" | "fim">, ConfigFase> = {
  inspirar: { rotulo: "Inspire pelo nariz", duracaoSeg: 4, contagem: 4 },
  segurar: { rotulo: "Segure", duracaoSeg: 7, contagem: 7 },
  expirar: { rotulo: "Expire pela boca", duracaoSeg: 8, contagem: 8 },
};

function vibrar(padrao: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(padrao);
    } catch {
      /* silencioso — alguns browsers requerem ativação por gesto */
    }
  }
}

function IconeAlto() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function IconeMudo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}

export function RespiracaoGuiada({ aoFinalizar, ciclos = 4 }: PropsRespiracao) {
  const totalCiclos = ciclos;
  const [fase, setFase] = useState<FaseRespiratoria>("preparar");
  const [cicloAtual, setCicloAtual] = useState(1);
  const [contagem, setContagem] = useState(0);
  const refTimer = useRef<NodeJS.Timeout | null>(null);
  const { mudo, tocar, alternarMudo } = useAudioRespiracao();

  useEffect(() => {
    return () => {
      if (refTimer.current) clearTimeout(refTimer.current);
    };
  }, []);

  // Toca o áudio guia ao entrar em cada fase.
  useEffect(() => {
    if (fase === "inspirar") tocar("inspire");
    else if (fase === "segurar") tocar("segure");
    else if (fase === "expirar") tocar("expire");
    else if (fase === "fim") tocar("pronto");
  }, [fase, tocar]);

  function iniciar() {
    vibrar(50);
    tocar("vamos-comecar");
    // Pequena pausa pra "Vamos começar" tocar antes do "Inspire pelo nariz"
    refTimer.current = setTimeout(() => {
      setCicloAtual(1);
      setContagem(FASES.inspirar.contagem);
      setFase("inspirar");
      rodarContagem("inspirar", 1);
    }, 1300);
  }

  function rodarContagem(faseInicial: keyof typeof FASES, ciclo: number) {
    const config = FASES[faseInicial];
    let restante = config.contagem;
    setContagem(restante);

    const tick = () => {
      restante -= 1;
      if (restante <= 0) {
        vibrar(80);
        const proxima = proximaFase(faseInicial);
        if (proxima === "fim") {
          if (ciclo >= totalCiclos) {
            setFase("fim");
            vibrar([100, 60, 100]);
            return;
          }
          // próximo ciclo
          const novoCiclo = ciclo + 1;
          setCicloAtual(novoCiclo);
          rodarContagem("inspirar", novoCiclo);
          setFase("inspirar");
          return;
        }
        setFase(proxima);
        rodarContagem(proxima, ciclo);
        return;
      }
      setContagem(restante);
      refTimer.current = setTimeout(tick, 1000);
    };

    refTimer.current = setTimeout(tick, 1000);
  }

  function proximaFase(
    atual: keyof typeof FASES,
  ): keyof typeof FASES | "fim" {
    if (atual === "inspirar") return "segurar";
    if (atual === "segurar") return "expirar";
    return "fim";
  }

  // tamanho do círculo conforme fase (com transição suave)
  const escalaCirculo =
    fase === "inspirar"
      ? "scale-125"
      : fase === "segurar"
        ? "scale-125"
        : fase === "expirar"
          ? "scale-90"
          : "scale-100";

  const duracaoTransicaoMs =
    fase === "inspirar"
      ? 4000
      : fase === "expirar"
        ? 8000
        : 800;

  return (
    <div className="flex flex-col h-full">
      <header className="relative text-center space-y-2 mb-6">
        <h2 className="text-xl font-light text-oceano-800">
          Respiração 4-7-8
        </h2>
        <p className="text-xs text-oceano-600">
          {fase === "preparar"
            ? "Sente-se confortável. Toque para começar."
            : fase === "fim"
              ? "Pronto. Você fez isso."
              : `Ciclo ${cicloAtual} de ${totalCiclos}`}
        </p>
        <button
          type="button"
          onClick={alternarMudo}
          aria-label={mudo ? "Ativar voz guia" : "Silenciar voz guia"}
          aria-pressed={mudo}
          className="absolute top-0 right-0 -mt-1 -mr-1 h-11 w-11 inline-flex items-center justify-center rounded-full text-oceano-600 hover:text-oceano-800 active:scale-95 transition-all"
        >
          {mudo ? <IconeMudo /> : <IconeAlto />}
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full bg-brisa-300/30 transition-transform ease-in-out ${escalaCirculo}`}
            style={{ transitionDuration: `${duracaoTransicaoMs}ms` }}
            aria-hidden="true"
          />
          <div
            className={`absolute inset-4 rounded-full bg-brisa-400/60 transition-transform ease-in-out ${escalaCirculo}`}
            style={{ transitionDuration: `${duracaoTransicaoMs}ms` }}
            aria-hidden="true"
          />
          <div
            className={`absolute inset-10 rounded-full bg-brisa-500 transition-transform ease-in-out ${escalaCirculo} flex items-center justify-center`}
            style={{ transitionDuration: `${duracaoTransicaoMs}ms` }}
          >
            {fase !== "preparar" && fase !== "fim" && (
              <span className="text-3xl font-light text-white">
                {contagem}
              </span>
            )}
          </div>
        </div>

        <div className="text-center space-y-1 min-h-[60px]" aria-live="polite">
          {fase === "preparar" && (
            <p className="text-base text-oceano-700">
              Inspire 4 · Segure 7 · Expire 8
            </p>
          )}
          {fase !== "preparar" && fase !== "fim" && (
            <p className="text-lg text-oceano-800 font-medium">
              {FASES[fase].rotulo}
            </p>
          )}
          {fase === "fim" && (
            <p className="text-base text-oceano-700 leading-relaxed max-w-xs">
              Repare como o corpo está agora. Sem pressa.
            </p>
          )}
        </div>
      </div>

      <footer className="pt-6 flex flex-col gap-3">
        {fase === "preparar" && (
          <button
            type="button"
            onClick={iniciar}
            className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors"
          >
            Começar
          </button>
        )}
        {fase === "fim" && (
          <button
            type="button"
            onClick={aoFinalizar}
            className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors"
          >
            Voltar
          </button>
        )}
        {fase !== "preparar" && fase !== "fim" && (
          <button
            type="button"
            onClick={() => {
              if (refTimer.current) clearTimeout(refTimer.current);
              aoFinalizar();
            }}
            className="w-full min-h-[44px] px-4 text-sm text-oceano-600 hover:text-oceano-800 transition-colors"
          >
            Sair quando quiser
          </button>
        )}
      </footer>
    </div>
  );
}
