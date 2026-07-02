"use client";

import { useEffect, useRef, useState } from "react";

import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

type Props = {
  /** URL do MP3. Se undefined/null, renderiza estado "em produção" + roteiro. */
  audioUrl?: string | null;
  /** Roteiro em texto — sempre exibido como fallback e apoio. */
  roteiro: string;
  titulo?: string;
};

/**
 * Player de indução hipnótica.
 * Estado 1 (sem áudio): botão "Áudio em produção" desabilitado + roteiro em destaque.
 * Estado 2 (com áudio): controle real de play/pause + roteiro colapsável.
 */
export function PlayerHipnose({ audioUrl, roteiro, titulo = "Indução hipnótica guiada" }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tocando, setTocando] = useState(false);
  const [expandido, setExpandido] = useState(!audioUrl);

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
      className="rounded-2xl border border-lavanda/25 bg-noite-400/20 p-4 space-y-3"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={!audioUrl}
          onClick={alternarPlay}
          aria-label={tocando ? "Pausar áudio" : "Tocar áudio"}
          className={cn(
            "shrink-0 flex items-center justify-center rounded-full",
            "w-14 h-14 min-w-touch min-h-touch",
            audioUrl
              ? "bg-lavanda text-noite hover:bg-lavanda-600 active:scale-95"
              : "bg-noite-300/40 text-bruma-muted cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lavanda-400/40 transition-transform",
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
          <p className="text-sm font-medium text-bruma">{titulo}</p>
          {audioUrl ? (
            <p className="text-xs text-bruma-muted">Toque para começar a escutar</p>
          ) : (
            <p className="text-xs text-amarelo-sol">
              Áudio em produção — leia o roteiro abaixo
            </p>
          )}
        </div>
      </div>

      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} preload="metadata" playsInline />
      )}

      <div>
        <button
          type="button"
          onClick={() => setExpandido((v) => !v)}
          className="text-xs text-bruma-muted underline underline-offset-4 min-h-touch inline-flex items-center"
          aria-expanded={expandido}
        >
          {expandido ? "Ocultar roteiro" : "Ler roteiro"}
        </button>

        {expandido && (
          <div className="mt-3 text-acolhimento text-bruma/90 whitespace-pre-line">
            {roteiro}
          </div>
        )}
      </div>
    </section>
  );
}
