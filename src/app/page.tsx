import Link from "next/link";

import { BotaoPrimarioLink } from "@/componentes/jornada/botao-primario";
import { Logo } from "@/componentes/jornada/logo";
import { BOAS_VINDAS, PILARES_BOAS_VINDAS } from "@/constantes/copy";

const ICONES_PILARES = [
  // Cérebro com coração — exercícios de interação
  <svg key="cerebro" viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 10c-4 0-7 3-7 7 0 1.5.4 2.8 1.1 3.9-1.3 1.2-2.1 2.9-2.1 4.8 0 2.1 1 4 2.6 5.2C12.2 32 12 33 12 34c0 3.3 2.7 6 6 6h12c3.3 0 6-2.7 6-6 0-1-.2-2-.6-3.1 1.6-1.2 2.6-3.1 2.6-5.2 0-1.9-.8-3.6-2.1-4.8.7-1.1 1.1-2.4 1.1-3.9 0-4-3-7-7-7-1.4 0-2.7.4-3.8 1.1C25.2 10.4 24.6 10 24 10s-1.2.4-1.8.5C21.2 10 20 10 18 10z" />
    <path d="M24 18v6" />
    <path d="M20 28c1 1.3 2.5 2 4 2s3-.7 4-2" />
  </svg>,
  // Fones com coração — áudios
  <svg key="fones" viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 26v-2c0-8.8 7.2-16 16-16s16 7.2 16 16v2" />
    <rect x="6" y="26" width="8" height="12" rx="2" />
    <rect x="34" y="26" width="8" height="12" rx="2" />
    <path d="M24 20c-1.5-1.5-4-1.5-4 1 0 2 4 4 4 4s4-2 4-4c0-2.5-2.5-2.5-4-1z" fill="currentColor" fillOpacity="0.35" stroke="none" />
  </svg>,
  // Livro aberto com coração — desabafos
  <svg key="livro" viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 12h14c2.2 0 4 1.8 4 4v22c0-2.2-1.8-4-4-4H6V12z" />
    <path d="M42 12H28c-2.2 0-4 1.8-4 4v22c0-2.2 1.8-4 4-4h14V12z" />
    <path d="M31 22c-1-1-3-1-3 1 0 1.5 3 3 3 3s3-1.5 3-3c0-2-2-2-3-1z" fill="currentColor" fillOpacity="0.35" stroke="none" />
  </svg>,
];

export default function BoasVindas() {
  return (
    <main className="jornada-container ceu-com-estrelas">
      {/* Logo — assinatura visual no topo */}
      <header className="flex justify-center pt-2">
        <Logo variante="completo" tamanho={200} prioridade className="w-[45vw] max-w-[200px] h-auto" />
      </header>

      {/* Apresentação da Rejane */}
      <section className="text-center mt-3 mb-6 px-1">
        <h1 className="text-2xl font-semibold text-noite">
          {BOAS_VINDAS.titulo} <span aria-hidden="true" className="text-mauve">♥</span>
        </h1>

        <p className="text-noite mt-3 leading-snug">
          {BOAS_VINDAS.apresentacao}{" "}
          <span className="font-semibold text-mauve italic">Rejane Ricco</span>,
          <br className="hidden xs:block" />
          {" "}{BOAS_VINDAS.especialidade}
        </p>

        <p className="text-acolhimento text-noite/85 mt-4 max-w-sm mx-auto">
          {BOAS_VINDAS.destaqueLinha1}{" "}
          <span className="font-semibold text-mauve">{BOAS_VINDAS.destaqueLinha2}</span>
        </p>

        <p className="text-acolhimento text-noite/80 mt-3 max-w-sm mx-auto">
          {BOAS_VINDAS.corpo1}
        </p>

        <p className="text-acolhimento text-noite/80 mt-3 max-w-sm mx-auto">
          {BOAS_VINDAS.corpo2}
        </p>
      </section>

      {/* 3 pilares — o que ela vai encontrar */}
      <section
        aria-label="O que você vai encontrar aqui"
        className="grid grid-cols-3 gap-2 mb-6"
      >
        {PILARES_BOAS_VINDAS.map((pilar, i) => (
          <div
            key={pilar.titulo}
            className="rounded-2xl bg-creme-medio/50 border border-mauve/15 px-2 py-3 flex flex-col items-center text-center"
          >
            <span className="text-mauve mb-1.5" aria-hidden="true">
              {ICONES_PILARES[i]}
            </span>
            <p className="text-[10.5px] font-bold text-noite tracking-wide leading-tight">
              {pilar.titulo}
            </p>
            <p className="text-[10.5px] text-noite/70 leading-tight mt-0.5">
              {pilar.descricao}
            </p>
          </div>
        ))}
      </section>

      {/* CTAs — thumb zone, empilhados como pediu a Rejane */}
      <div className="mt-auto pt-2 space-y-3">
        <BotaoPrimarioLink href="/quiz" pulsar ariaLabel="Começar a jornada de hoje">
          {BOAS_VINDAS.cta}
        </BotaoPrimarioLink>

        <Link
          href="/desabafos"
          aria-label="Abrir meus desabafos — diário privado"
          className="flex w-full min-h-[52px] items-center justify-center rounded-cta bg-lavanda text-noite font-semibold text-center px-5 active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lavanda-400/40"
        >
          {BOAS_VINDAS.ctaSecundario}
        </Link>
      </div>
    </main>
  );
}
