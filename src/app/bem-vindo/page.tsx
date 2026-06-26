import Link from "next/link";

export const metadata = {
  title: "Vamos começar",
  description: "Conheça os passos do acolhimento antes de criar sua conta.",
};

const PASSOS_DA_JORNADA = [
  {
    titulo: "Você se localiza",
    descricao: "Conta o que ressoa com você e onde sente isso no corpo.",
  },
  {
    titulo: "A gente desenha o mapa",
    descricao: "Identifica em que região emocional você está agora.",
  },
  {
    titulo: "Traçamos uma rota",
    descricao: "Uma trilha cuidada pra o tema mais pesado, no seu ritmo.",
  },
  {
    titulo: "Você caminha",
    descricao: "Check-ins curtos, exercícios e diário com privacidade.",
  },
];

export default function PaginaBemVindo() {
  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <header className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800"
          aria-label="Voltar"
        >
          ← Voltar
        </Link>
      </header>

      <section className="flex-1 space-y-10">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div
              className="w-20 h-20 rounded-full bg-brisa-200/70 animate-respirar"
              aria-hidden="true"
            />
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-light text-oceano-800 leading-snug">
              Respira.
              <br />
              <span className="text-oceano-600">A gente começa juntos.</span>
            </h1>
            <p className="text-sm text-oceano-600 leading-relaxed max-w-xs mx-auto">
              Antes de qualquer pergunta, é importante que você saiba o que vem
              pela frente.
            </p>
          </div>
        </div>

        <ol className="space-y-4">
          {PASSOS_DA_JORNADA.map((passo, i) => (
            <li
              key={passo.titulo}
              className="flex gap-4 items-start p-4 rounded-2xl bg-white border border-oceano-100"
            >
              <span
                className="shrink-0 w-8 h-8 rounded-full bg-brisa-100 text-brisa-600 flex items-center justify-center text-sm font-medium"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="space-y-1">
                <h2 className="text-sm font-medium text-oceano-800">
                  {passo.titulo}
                </h2>
                <p className="text-xs text-oceano-600 leading-relaxed">
                  {passo.descricao}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="pt-8 space-y-4">
        <Link
          href="/entrar"
          className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors shadow-sm flex items-center justify-center"
        >
          Quero começar
        </Link>
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
