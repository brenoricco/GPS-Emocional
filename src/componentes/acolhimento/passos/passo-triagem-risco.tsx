"use client";

interface OpcaoTriagem {
  rotulo: string;
  valor: 0 | 1 | 2 | 3 | 4;
}

const OPCOES_TRIAGEM: OpcaoTriagem[] = [
  { rotulo: "Nunca", valor: 0 },
  { rotulo: "Raramente", valor: 1 },
  { rotulo: "Às vezes", valor: 2 },
  { rotulo: "Frequentemente", valor: 3 },
  { rotulo: "Quase todos os dias", valor: 4 },
];

interface PropsPasso {
  resposta: 0 | 1 | 2 | 3 | 4 | null;
  aoResponder: (valor: 0 | 1 | 2 | 3 | 4) => void;
}

export function PassoTriagemRisco({ resposta, aoResponder }: PropsPasso) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h2 className="text-2xl font-light text-oceano-800 leading-snug">
          Uma última, com cuidado.
        </h2>
        <p className="text-sm text-oceano-600 leading-relaxed">
          Nas últimas semanas, você teve pensamentos de se machucar ou de que
          seria melhor não existir?
        </p>
      </header>

      <div
        role="radiogroup"
        aria-label="Frequência de pensamentos de autolesão"
        className="space-y-2"
      >
        {OPCOES_TRIAGEM.map((opcao) => {
          const selecionado = resposta === opcao.valor;
          return (
            <button
              key={opcao.valor}
              type="button"
              role="radio"
              aria-checked={selecionado}
              onClick={() => aoResponder(opcao.valor)}
              className={`w-full min-h-[52px] px-4 py-3 rounded-xl border text-base text-left transition-colors ${
                selecionado
                  ? "bg-brisa-50 border-brisa-400 text-oceano-800 ring-2 ring-brisa-300/40"
                  : "bg-white border-oceano-200 text-oceano-700 hover:bg-oceano-50/40"
              }`}
            >
              {opcao.rotulo}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl bg-areia-50 border border-oceano-100 p-5 text-xs text-oceano-700 leading-relaxed space-y-2">
        <p>
          Sua resposta nos ajuda a oferecer o suporte certo. Não há julgamento
          aqui.
        </p>
        <p>
          Se está em crise agora, ligue para o{" "}
          <a
            href="tel:188"
            className="text-coral-600 underline underline-offset-4"
          >
            CVV — 188
          </a>{" "}
          (24h, gratuito).
        </p>
      </div>
    </div>
  );
}
