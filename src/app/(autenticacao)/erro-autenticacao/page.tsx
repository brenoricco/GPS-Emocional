import Link from "next/link";

export const metadata = {
  title: "Algo deu errado",
};

interface PropsPagina {
  searchParams: Promise<{ error?: string }>;
}

const MENSAGENS_ERRO: Record<string, string> = {
  Configuration:
    "O sistema de entrada está temporariamente indisponível. Tente novamente em instantes.",
  AccessDenied:
    "O acesso foi negado. Se isso não fez sentido pra você, tente outro caminho de entrada.",
  Verification:
    "Esse link expirou ou já foi usado. Peça um novo link no seu e-mail.",
  OAuthAccountNotLinked:
    "Esse e-mail já está vinculado a outra forma de entrar. Use o método original.",
  default: "Algo não saiu como esperado. Tente novamente em instantes.",
};

export default async function PaginaErroAutenticacao({
  searchParams,
}: PropsPagina) {
  const { error } = await searchParams;
  const mensagem = MENSAGENS_ERRO[error ?? "default"] ?? MENSAGENS_ERRO.default;

  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <section className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div
          className="w-20 h-20 rounded-full bg-coral-400/20 flex items-center justify-center text-3xl"
          aria-hidden="true"
        >
          🫧
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-light text-oceano-800 leading-snug">
            Respira. Não foi você.
          </h1>
          <p className="text-sm text-oceano-600 leading-relaxed max-w-xs mx-auto">
            {mensagem}
          </p>
        </div>

        <Link
          href="/entrar"
          className="inline-flex items-center justify-center min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors shadow-sm"
        >
          Tentar de novo
        </Link>

        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] px-4 text-sm text-oceano-600 underline underline-offset-4"
        >
          Voltar à página inicial
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
