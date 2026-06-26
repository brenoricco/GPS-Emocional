import Link from "next/link";

import { BotaoEntrarComoTeste } from "@/componentes/autenticacao/botao-entrar-como-teste";
import { BotaoGoogle } from "@/componentes/autenticacao/botao-google";
import { FormularioLinkMagico } from "@/componentes/autenticacao/formulario-link-magico";

const ehProducao = process.env.NODE_ENV === "production";

export const metadata = {
  title: "Entrar",
  description: "Entre no GPS Emocional pelo seu e-mail ou Google.",
};

export default function PaginaEntrar() {
  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <header className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800 transition-colors"
          aria-label="Voltar"
        >
          ← Voltar
        </Link>
      </header>

      <section className="flex-1 space-y-8">
        <div className="space-y-3">
          <h1 className="text-2xl font-light text-oceano-800 leading-snug">
            Entrar
          </h1>
          <p className="text-sm text-oceano-600 leading-relaxed">
            Escolha o caminho que for mais confortável. Sem senhas.
          </p>
        </div>

        <FormularioLinkMagico />

        <div className="flex items-center gap-4" aria-hidden="true">
          <div className="flex-1 h-px bg-oceano-100" />
          <span className="text-xs uppercase tracking-wider text-oceano-400">
            ou
          </span>
          <div className="flex-1 h-px bg-oceano-100" />
        </div>

        <BotaoGoogle />

        <p className="text-xs text-oceano-500 leading-relaxed text-center pt-2">
          O link mágico chega no seu e-mail em segundos. Use-o em qualquer
          aparelho onde você quiser entrar.
        </p>

        {!ehProducao && (
          <div className="pt-6 mt-2 border-t border-dashed border-coral-300/40">
            <BotaoEntrarComoTeste />
          </div>
        )}
      </section>

      <footer className="pt-8 border-t border-oceano-100 mt-8">
        <p className="text-xs text-oceano-500 text-center leading-relaxed">
          Em crise, ligue para o{" "}
          <a
            href="tel:188"
            className="text-coral-600 underline underline-offset-4"
          >
            CVV — 188
          </a>{" "}
          (24h, gratuito).
        </p>
      </footer>
    </main>
  );
}
