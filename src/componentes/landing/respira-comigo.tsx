"use client";

import { useEffect, useState } from "react";

import { RespiracaoGuiada } from "@/componentes/seguranca/respiracao-guiada";

function vibrar(padrao: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(padrao);
    } catch {
      /* silencioso */
    }
  }
}

export function BotaoRespiraComigo() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const fechar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    document.addEventListener("keydown", fechar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", fechar);
    };
  }, [aberto]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          vibrar(40);
          setAberto(true);
        }}
        className="w-full min-h-[60px] px-8 rounded-full bg-brisa-500 text-white text-base font-medium shadow-lg active:scale-95 transition-transform duration-150 hover:bg-brisa-600 flex items-center justify-center gap-2"
      >
        <span aria-hidden="true">🌬️</span>
        Respira comigo agora
      </button>

      {aberto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Respiração guiada de 60 segundos"
          className="fixed inset-0 z-50 bg-fundo-claro"
        >
          <div
            className="h-[100svh] flex flex-col max-w-md mx-auto px-5 pt-6"
            style={{
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
            }}
          >
            <header className="flex items-center justify-end mb-2">
              <button
                type="button"
                onClick={() => setAberto(false)}
                aria-label="Fechar respiração"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-oceano-600 hover:text-oceano-800 rounded-full active:scale-95 transition-transform"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6 L18 18 M18 6 L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>
            <RespiracaoGuiada
              aoFinalizar={() => setAberto(false)}
              ciclos={3}
            />
          </div>
        </div>
      )}
    </>
  );
}
