"use client";

import { useEffect, useRef, useState } from "react";

interface PropsPlayer {
  audioUrl: string | null;
  audioDuracaoSegundos: number | null;
  roteiroMarkdown: string | null;
  tituloModulo: string;
  aoConcluir: () => void;
}

function formatarTempo(segundos: number): string {
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Parser de markdown mínimo (só ##, parágrafos, ênfase) — evita lib externa
 * pra MVP. Suficiente pros roteiros da Rejane.
 */
function renderizarMarkdownSimples(md: string) {
  const blocos = md.split(/\n{2,}/);
  return blocos.map((bloco, i) => {
    const trim = bloco.trim();
    if (trim.startsWith("## ")) {
      return (
        <h3
          key={i}
          className="text-sm font-medium text-brisa-600 uppercase tracking-wider mt-6 first:mt-0"
        >
          {trim.slice(3)}
        </h3>
      );
    }
    return (
      <p key={i} className="text-base text-oceano-700 leading-relaxed mt-3">
        {trim}
      </p>
    );
  });
}

export function PlayerAudio({
  audioUrl,
  audioDuracaoSegundos,
  roteiroMarkdown,
  tituloModulo,
  aoConcluir,
}: PropsPlayer) {
  const refAudio = useRef<HTMLAudioElement | null>(null);
  const [tocando, setTocando] = useState(false);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [duracao, setDuracao] = useState(audioDuracaoSegundos ?? 0);
  const [velocidade, setVelocidade] = useState<1 | 1.25 | 1.5>(1);

  useEffect(() => {
    const audio = refAudio.current;
    if (!audio) return;
    const onTimeUpdate = () => setTempoAtual(audio.currentTime);
    const onLoadedMetadata = () => setDuracao(audio.duration);
    const onEnd = () => setTocando(false);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnd);
    };
  }, [audioUrl]);

  function toggle() {
    const audio = refAudio.current;
    if (!audio) return;
    if (tocando) {
      audio.pause();
      setTocando(false);
    } else {
      audio.play();
      setTocando(true);
    }
  }

  function trocarVelocidade() {
    const audio = refAudio.current;
    if (!audio) return;
    const proxima: 1 | 1.25 | 1.5 =
      velocidade === 1 ? 1.25 : velocidade === 1.25 ? 1.5 : 1;
    setVelocidade(proxima);
    audio.playbackRate = proxima;
  }

  // Sem áudio — exibe roteiro como leitura
  if (!audioUrl) {
    return (
      <section className="flex flex-col h-full">
        <header className="space-y-2 mb-6 text-center">
          <p className="text-xs uppercase tracking-wider text-brisa-600 font-medium">
            Meditação guiada
          </p>
          <h2 className="text-xl font-light text-oceano-800 leading-snug">
            {tituloModulo}
          </h2>
        </header>

        <div className="rounded-2xl bg-areia-50 border border-oceano-100 p-4 mb-5 text-xs text-oceano-700 leading-relaxed text-center">
          <span aria-hidden="true">🎙️</span> Áudio em produção. Por enquanto, você
          pode ler o roteiro abaixo no seu ritmo.
        </div>

        <article className="flex-1 overflow-y-auto rounded-2xl bg-white border border-oceano-100 p-5 mb-6">
          {roteiroMarkdown ? (
            renderizarMarkdownSimples(roteiroMarkdown)
          ) : (
            <p className="text-sm text-oceano-500">Roteiro indisponível.</p>
          )}
        </article>

        <footer>
          <button
            type="button"
            onClick={aoConcluir}
            className="w-full min-h-[60px] px-8 rounded-full bg-brisa-500 text-white text-base font-medium shadow-md active:scale-95 transition-transform duration-150 hover:bg-brisa-600"
          >
            Receber o selo
          </button>
        </footer>
      </section>
    );
  }

  // Com áudio
  const progresso = duracao > 0 ? (tempoAtual / duracao) * 100 : 0;

  return (
    <section className="flex flex-col h-full">
      <header className="space-y-2 mb-6 text-center">
        <p className="text-xs uppercase tracking-wider text-brisa-600 font-medium">
          Meditação guiada
        </p>
        <h2 className="text-xl font-light text-oceano-800 leading-snug">
          {tituloModulo}
        </h2>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div
          className={`w-44 h-44 rounded-full bg-brisa-200/50 flex items-center justify-center text-5xl ${tocando ? "animate-respirar" : ""}`}
          aria-hidden="true"
        >
          🌬️
        </div>

        <audio ref={refAudio} src={audioUrl} preload="metadata" />

        <div className="w-full space-y-2">
          <div className="h-2 bg-oceano-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brisa-500 transition-[width] duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-oceano-500">
            <span>{formatarTempo(tempoAtual)}</span>
            <span>{formatarTempo(duracao)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={trocarVelocidade}
            aria-label={`Velocidade ${velocidade}x`}
            className="min-h-[44px] min-w-[60px] px-3 rounded-full bg-white border border-oceano-200 text-oceano-700 text-sm font-medium active:scale-95 transition-transform"
          >
            {velocidade}x
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={tocando ? "Pausar" : "Tocar"}
            className="w-16 h-16 rounded-full bg-brisa-500 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            {tocando ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="w-[60px]" aria-hidden="true" />
        </div>
      </div>

      <footer className="pt-6">
        <button
          type="button"
          onClick={aoConcluir}
          className="w-full min-h-[60px] px-8 rounded-full bg-brisa-500 text-white text-base font-medium shadow-md active:scale-95 transition-transform duration-150 hover:bg-brisa-600"
        >
          Receber o selo
        </button>
      </footer>
    </section>
  );
}
