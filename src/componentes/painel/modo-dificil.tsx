"use client";

import Link from "next/link";
import { useState } from "react";

import { RespiracaoGuiada } from "@/componentes/seguranca/respiracao-guiada";

interface PropsModoDificil {
  nome: string;
  aoSairDoModo: () => void;
}

export function ModoDificil({ nome, aoSairDoModo }: PropsModoDificil) {
  const [respirando, setRespirando] = useState(false);

  if (respirando) {
    return (
      <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
        <header className="flex items-center justify-end mb-2">
          <button
            type="button"
            onClick={() => setRespirando(false)}
            aria-label="Voltar"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-oceano-600 active:scale-95 transition-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          aoFinalizar={() => setRespirando(false)}
          ciclos={3}
        />
      </main>
    );
  }

  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <section className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div
          className="w-24 h-24 rounded-full bg-brisa-200/60 animate-respirar"
          aria-hidden="true"
        />
        <div className="space-y-3">
          <h1 className="text-2xl font-light text-oceano-800 leading-snug">
            {nome ? `Tá difícil, ${nome}.` : "Tá difícil."}
          </h1>
          <p className="text-base text-oceano-700 leading-relaxed max-w-xs">
            A gente vai com calma agora. Sem cobrança, sem trilha, sem nada.
          </p>
        </div>

        <div className="w-full space-y-3">
          <button
            type="button"
            onClick={() => setRespirando(true)}
            className="w-full min-h-[60px] px-8 rounded-full bg-brisa-500 text-white text-base font-medium shadow-md active:scale-95 transition-transform duration-150 hover:bg-brisa-600 flex items-center justify-center gap-2"
          >
            <span aria-hidden="true">🌬️</span>
            Respira comigo
          </button>

          <a
            href="tel:188"
            className="w-full min-h-[60px] px-8 rounded-full bg-coral-500 text-white text-base font-medium shadow-md active:scale-95 transition-transform duration-150 hover:bg-coral-600 flex items-center justify-center gap-2"
          >
            <span aria-hidden="true">📞</span>
            Ligar pro CVV — 188
          </a>
        </div>

        <div className="space-y-3">
          <Link
            href="/diario/novo"
            className="block text-sm text-oceano-600 underline underline-offset-4 min-h-[44px] inline-flex items-center"
          >
            Quero escrever no diário
          </Link>
          <button
            type="button"
            onClick={aoSairDoModo}
            className="block text-sm text-oceano-500 underline underline-offset-4 min-h-[44px] mx-auto"
          >
            Ver painel completo
          </button>
        </div>
      </section>
    </main>
  );
}
