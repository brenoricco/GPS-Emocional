import Link from "next/link";
import type { Metadata } from "next";

import { BotaoSentimento } from "@/componentes/quiz/botao-sentimento";
import { MODULOS } from "@/constantes/modulos";
import { QUIZ } from "@/constantes/copy";

export const metadata: Metadata = {
  title: "Como você está?",
};

export default function PaginaQuiz() {
  return (
    <main className="jornada-container">
      {/* Cabeçalho — apenas link discreto de voltar (sem logo, decisão Rejane) */}
      <header className="flex items-center justify-between mb-3">
        <Link
          href="/"
          aria-label="Voltar"
          className="min-h-touch min-w-touch inline-flex items-center justify-center -ml-2 text-bruma-muted"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </Link>
        <div className="min-h-touch min-w-touch" aria-hidden="true" />
        <div className="min-h-touch min-w-touch" aria-hidden="true" />
      </header>

      {/* Pergunta — versão minimalista pedida pela Rejane: só o título no alto */}
      <section className="text-center mt-1 mb-6 px-1">
        <h1 className="text-xl sm:text-2xl font-medium text-noite leading-snug">
          {QUIZ.pergunta}
        </h1>
      </section>

      {/* Lista de botões coloridos — cada um leva a um módulo */}
      <div className="flex-1 flex flex-col gap-3 pb-4">
        {MODULOS.map((modulo) => (
          <BotaoSentimento key={modulo.slug} modulo={modulo} />
        ))}
      </div>

      <p className="text-center text-[11px] text-bruma-muted pt-3">
        Você pode voltar aqui sempre que precisar.
      </p>
    </main>
  );
}
