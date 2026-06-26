import Link from "next/link";

export const metadata = {
  title: "Confira seu e-mail",
};

export default function PaginaVerificarEmail() {
  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <section className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div
          className="w-20 h-20 rounded-full bg-brisa-200/70 animate-respirar flex items-center justify-center text-3xl"
          aria-hidden="true"
        >
          ✉️
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-light text-oceano-800 leading-snug">
            Está a caminho.
          </h1>
          <p className="text-sm text-oceano-600 leading-relaxed max-w-xs mx-auto">
            Mandamos um link para o seu e-mail. Abra ele no aparelho onde
            quiser entrar.
          </p>
        </div>

        <div className="w-full rounded-2xl bg-areia-50 border border-oceano-100 p-5 text-xs text-oceano-700 leading-relaxed text-left space-y-2">
          <p>
            <strong className="text-oceano-800">Dica:</strong> o e-mail pode
            levar até 1 minuto pra chegar.
          </p>
          <p>
            Confira também a pasta de spam ou promoções. O link expira em 24
            horas.
          </p>
        </div>

        <Link
          href="/entrar"
          className="inline-flex items-center min-h-[44px] px-4 text-sm text-oceano-600 underline underline-offset-4"
        >
          Voltar e usar outro e-mail
        </Link>
      </section>

      <footer className="pt-6">
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
