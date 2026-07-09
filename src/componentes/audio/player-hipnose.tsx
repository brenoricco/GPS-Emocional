"use client";

import { useEffect, useRef, useState } from "react";

import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

type Props = {
  audioUrl: string;
  titulo?: string;
};

/**
 * Player de indução hipnótica. Roteiro em texto foi ocultado a pedido da Rejane
 * agora que os áudios estão gravados — a usuária deve apenas ouvir.
 */
export function PlayerHipnose({ audioUrl, titulo = "Indução hipnótica guiada" }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onFim = () => setTocando(false);
    audio.addEventListener("ended", onFim);
    return () => audio.removeEventListener("ended", onFim);
  }, [audioUrl]);

  function alternarPlay() {
    const audio = audioRef.current;
    if (!audio) return;
    vibrar("toque");
    if (audio.paused) {
      audio.play().then(() => setTocando(true)).catch(() => setTocando(false));
    } else {
      audio.pause();
      setTocando(false);
    }
  }

  return (
    <section
      aria-label={titulo}
      className="rounded-2xl border border-mauve/30 bg-creme-medio/60 p-4"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={alternarPlay}
          aria-label={tocando ? "Pausar áudio" : "Tocar áudio"}
          className={cn(
            "shrink-0 flex items-center justify-center rounded-full",
            "w-14 h-14 min-w-touch min-h-touch",
            "bg-violeta text-bruma hover:bg-violeta-600 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violeta-400/40 transition-transform",
          )}
        >
          {tocando ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M7 5l12 7-12 7V5z" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-noite">{titulo}</p>
          <p className="text-xs text-bruma-muted">
            {tocando ? "Feche os olhos e ouça no seu ritmo" : "Toque para começar a escutar"}
          </p>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" playsInline />
    </section>
  );
}
