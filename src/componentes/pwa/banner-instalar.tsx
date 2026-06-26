"use client";

import { useEffect, useState } from "react";

interface EventoInstalacao extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const CHAVE_DISPENSADO = "gps-emocional:banner-instalar-dispensado";

export function BannerInstalar() {
  const [eventoInstalacao, setEventoInstalacao] =
    useState<EventoInstalacao | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const dispensadoEm = localStorage.getItem(CHAVE_DISPENSADO);
    // Dispensa válida por 7 dias
    if (dispensadoEm) {
      const diasDesdeDispensa =
        (Date.now() - Number(dispensadoEm)) / (1000 * 60 * 60 * 24);
      if (diasDesdeDispensa < 7) return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setEventoInstalacao(e as EventoInstalacao);
      setVisivel(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dispensar() {
    setVisivel(false);
    localStorage.setItem(CHAVE_DISPENSADO, String(Date.now()));
  }

  async function instalar() {
    if (!eventoInstalacao) return;
    try {
      await eventoInstalacao.prompt();
      await eventoInstalacao.userChoice;
    } finally {
      setVisivel(false);
      setEventoInstalacao(null);
    }
  }

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-label="Instalar GPS Emocional"
      className="fixed inset-x-0 z-40 px-4"
      style={{
        bottom: "max(5rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="max-w-md mx-auto bg-white border border-oceano-200 shadow-xl rounded-2xl p-4 flex items-start gap-3 animate-em-aparicao">
        <span
          className="w-10 h-10 rounded-xl bg-brisa-100 flex items-center justify-center text-xl shrink-0"
          aria-hidden="true"
        >
          🧭
        </span>
        <div className="flex-1 min-w-0 space-y-1">
          <p className="text-sm font-medium text-oceano-800">
            Instala o GPS Emocional?
          </p>
          <p className="text-xs text-oceano-600 leading-relaxed">
            Vira atalho na tela inicial. Funciona como app, sem loja.
          </p>
        </div>
        <div className="flex flex-col gap-1 shrink-0">
          <button
            type="button"
            onClick={instalar}
            className="min-h-[40px] px-4 rounded-full bg-brisa-500 text-white text-sm font-medium hover:bg-brisa-600 active:scale-95 transition-transform"
          >
            Instalar
          </button>
          <button
            type="button"
            onClick={dispensar}
            className="min-h-[36px] text-xs text-oceano-500 hover:text-oceano-700"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
}
