import Link from "next/link";

export const metadata = {
  title: "Estamos com você",
};

export default function PaginaEmergencia() {
  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <section className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div
          className="w-24 h-24 rounded-full bg-coral-400/20 animate-respirar flex items-center justify-center text-4xl"
          aria-hidden="true"
        >
          🫂
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-light text-oceano-800 leading-snug">
            Você não está sozinho(a).
          </h1>
          <p className="text-base text-oceano-700 leading-relaxed">
            O que você acabou de compartilhar importa. Antes de qualquer outra
            coisa, vamos garantir o seu agora.
          </p>
        </div>

        <a
          href="tel:188"
          className="w-full min-h-[64px] px-8 rounded-full bg-coral-500 text-white text-lg font-medium hover:bg-coral-600 transition-colors shadow-md flex items-center justify-center gap-3"
        >
          <span className="text-2xl" aria-hidden="true">
            📞
          </span>
          Ligar para o CVV — 188
        </a>

        <div className="w-full rounded-2xl bg-white border border-oceano-100 p-5 space-y-3 text-left">
          <h2 className="text-sm font-medium text-oceano-800">
            O CVV está com você
          </h2>
          <p className="text-xs text-oceano-700 leading-relaxed">
            O Centro de Valorização da Vida oferece apoio emocional gratuito,
            anônimo e confidencial, 24 horas por dia, todos os dias do ano.
          </p>
          <div className="grid gap-2 pt-2">
            <a
              href="tel:188"
              className="min-h-[44px] flex items-center gap-3 px-3 py-2 rounded-xl bg-oceano-50 text-oceano-800 text-sm hover:bg-oceano-100 transition-colors"
            >
              <span aria-hidden="true">☎️</span>
              <span>
                <strong>188</strong> — ligação gratuita, 24h
              </span>
            </a>
            <a
              href="https://www.cvv.org.br/chat/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center gap-3 px-3 py-2 rounded-xl bg-oceano-50 text-oceano-800 text-sm hover:bg-oceano-100 transition-colors"
            >
              <span aria-hidden="true">💬</span>
              <span>
                <strong>cvv.org.br/chat</strong> — atendimento por chat
              </span>
            </a>
          </div>
        </div>

        <p className="text-xs text-oceano-600 leading-relaxed max-w-xs">
          Quando você se sentir seguro(a), pode continuar de onde paramos.
          Estaremos aqui.
        </p>

        <Link
          href="/painel"
          className="inline-flex items-center min-h-[44px] px-4 text-sm text-oceano-600 underline underline-offset-4"
        >
          Continuar para o painel
        </Link>
      </section>
    </main>
  );
}
