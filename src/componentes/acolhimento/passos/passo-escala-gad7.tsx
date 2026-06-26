"use client";

import {
  OPCOES_GAD7,
  PERGUNTAS_GAD7,
  type RespostaGad7,
} from "@/lib/clinico/escalas/gad7";

interface PropsPasso {
  respostas: RespostaGad7[];
  aoResponder: (questaoIndice: number, valor: 0 | 1 | 2 | 3) => void;
}

export function PassoEscalaGad7({ respostas, aoResponder }: PropsPasso) {
  const totalRespondidas = respostas.length;

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h2 className="text-2xl font-light text-oceano-800 leading-snug">
          Na última semana, com que frequência…
        </h2>
        <p className="text-sm text-oceano-600 leading-relaxed">
          Sem certo ou errado. Marque o que ressoa com sua experiência.
        </p>
      </header>

      <ol className="space-y-6">
        {PERGUNTAS_GAD7.map((pergunta, indice) => {
          const respostaAtual = respostas.find(
            (r) => r.questaoIndice === indice,
          );
          return (
            <li key={pergunta.id} className="space-y-3">
              <p className="text-base text-oceano-800 leading-relaxed">
                <span className="text-oceano-400 mr-1">{indice + 1}.</span>{" "}
                {pergunta.enunciado}
              </p>
              <div
                role="radiogroup"
                aria-label={pergunta.enunciado}
                className="grid grid-cols-1 gap-2"
              >
                {OPCOES_GAD7.map((opcao) => {
                  const selecionado = respostaAtual?.valor === opcao.valor;
                  return (
                    <button
                      key={opcao.valor}
                      type="button"
                      role="radio"
                      aria-checked={selecionado}
                      onClick={() => aoResponder(indice, opcao.valor)}
                      className={`w-full min-h-[48px] px-4 py-2 rounded-xl border text-sm text-left transition-colors ${
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
            </li>
          );
        })}
      </ol>

      <p className="text-xs text-oceano-500 text-center">
        {totalRespondidas} de {PERGUNTAS_GAD7.length} respondidas.
      </p>
    </div>
  );
}
