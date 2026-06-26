"use client";

import { REGIOES_CORPORAIS } from "@/lib/clinico/regioes-corporais";

interface PropsPasso {
  regioesMarcadas: string[];
  aoAlternar: (id: string) => void;
}

export function PassoMapaCorporal({
  regioesMarcadas,
  aoAlternar,
}: PropsPasso) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h2 className="text-2xl font-light text-oceano-800 leading-snug">
          Onde você sente isso no corpo?
        </h2>
        <p className="text-sm text-oceano-600 leading-relaxed">
          Toque nas regiões onde sente desconforto, tensão ou peso. Pode marcar
          quantas quiser.
        </p>
      </header>

      <div className="relative mx-auto w-full max-w-[280px] aspect-[1/2] bg-oceano-50/40 rounded-3xl border border-oceano-100 overflow-hidden">
        {/* Silhueta humana simplificada */}
        <svg
          viewBox="0 0 100 200"
          className="absolute inset-0 w-full h-full text-oceano-200"
          aria-hidden="true"
        >
          {/* Cabeça */}
          <circle cx="50" cy="18" r="10" fill="currentColor" />
          {/* Pescoço */}
          <rect x="46" y="26" width="8" height="6" fill="currentColor" />
          {/* Tronco */}
          <path
            d="M30 36 Q50 32 70 36 L66 110 Q50 114 34 110 Z"
            fill="currentColor"
          />
          {/* Braços */}
          <path d="M30 38 L18 70 L22 110 L26 110 L26 72 L34 42 Z" fill="currentColor" />
          <path d="M70 38 L82 70 L78 110 L74 110 L74 72 L66 42 Z" fill="currentColor" />
          {/* Pernas */}
          <path d="M36 110 L34 180 L42 180 L46 114 Z" fill="currentColor" />
          <path d="M64 110 L66 180 L58 180 L54 114 Z" fill="currentColor" />
        </svg>

        {/* Hotspots interativos */}
        {REGIOES_CORPORAIS.map((regiao) => {
          const marcada = regioesMarcadas.includes(regiao.id);
          return (
            <button
              key={regiao.id}
              type="button"
              onClick={() => aoAlternar(regiao.id)}
              aria-pressed={marcada}
              aria-label={
                marcada ? `${regiao.nome} marcada` : `Marcar ${regiao.nome}`
              }
              className={`absolute -translate-x-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all ${
                marcada
                  ? "bg-coral-500/80 ring-2 ring-coral-400 ring-offset-2 ring-offset-oceano-50 shadow-md scale-110"
                  : "bg-brisa-300/40 hover:bg-brisa-300/70"
              }`}
              style={{
                left: `${regiao.xPercent}%`,
                top: `${regiao.yPercent}%`,
              }}
            >
              <span className="sr-only">{regiao.nome}</span>
              {marcada && (
                <span className="text-white text-xs font-bold" aria-hidden="true">
                  ●
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-oceano-500 text-center">
        {regioesMarcadas.length === 0
          ? "Toque na silhueta para marcar."
          : `${regioesMarcadas.length} região(ões) marcada(s).`}
      </p>
    </div>
  );
}
