import Link from "next/link";

export const metadata = {
  title: "Vamos com cuidado",
};

export default function PaginaCuidado() {
  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <section className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div
          className="w-20 h-20 rounded-full bg-brisa-200/70 animate-respirar flex items-center justify-center text-3xl"
          aria-hidden="true"
        >
          🌿
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-light text-oceano-800 leading-snug">
            Obrigado por ter contado.
          </h1>
          <p className="text-base text-oceano-700 leading-relaxed max-w-xs mx-auto">
            O que você sente é real. Vamos caminhar com cuidado extra — sem
            pressa, sem cobrança.
          </p>
        </div>

        <div className="w-full rounded-2xl bg-white border border-oceano-100 p-5 space-y-3 text-left">
          <h2 className="text-sm font-medium text-oceano-800">
            Recursos que sempre estão disponíveis pra você
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="tel:188"
                className="min-h-[44px] flex items-center gap-3 px-3 py-2 rounded-xl bg-oceano-50 text-oceano-800 text-sm hover:bg-oceano-100 transition-colors"
              >
                <span aria-hidden="true">☎️</span>
                <span>
                  <strong>CVV 188</strong> — escuta 24h, gratuita e sigilosa
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.cvv.org.br/chat/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-3 px-3 py-2 rounded-xl bg-oceano-50 text-oceano-800 text-sm hover:bg-oceano-100 transition-colors"
              >
                <span aria-hidden="true">💬</span>
                <span>
                  <strong>Chat do CVV</strong> — atendimento por mensagem
                </span>
              </a>
            </li>
          </ul>
        </div>

        <Link
          href="/painel"
          className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors shadow-sm flex items-center justify-center"
        >
          Continuar com cuidado
        </Link>
      </section>
    </main>
  );
}
