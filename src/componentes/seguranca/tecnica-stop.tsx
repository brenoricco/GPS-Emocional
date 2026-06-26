"use client";

import { useState } from "react";

interface PropsTecnicaStop {
  aoFinalizar: () => void;
}

const PASSOS = [
  {
    letra: "S",
    titulo: "Pare",
    descricao:
      "Apenas pare o que está fazendo. Não decida nada. Não responda nada. Só pare por alguns segundos.",
  },
  {
    letra: "T",
    titulo: "Respire",
    descricao:
      "Inspire pelo nariz, devagar. Solte o ar pela boca, mais devagar ainda. Sinta o pé tocando o chão.",
  },
  {
    letra: "O",
    titulo: "Observe",
    descricao:
      "O que está sentindo no corpo? Qual é o pensamento que voltou? Sem julgar — só nomear.",
  },
  {
    letra: "P",
    titulo: "Siga com escolha",
    descricao:
      "Agora você tem espaço. Qual é a próxima ação que serve a quem você quer ser, e não à emoção que te puxava?",
  },
];

function vibrar(padrao: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(padrao);
    } catch {
      /* silencioso */
    }
  }
}

export function TecnicaStop({ aoFinalizar }: PropsTecnicaStop) {
  const [passo, setPasso] = useState(0);
  const passoAtual = PASSOS[passo]!;
  const ehUltimo = passo === PASSOS.length - 1;

  function avancar() {
    vibrar(40);
    if (ehUltimo) {
      aoFinalizar();
      return;
    }
    setPasso((p) => p + 1);
  }

  return (
    <div className="flex flex-col h-full">
      <header className="text-center space-y-2 mb-6">
        <h2 className="text-xl font-light text-oceano-800">Técnica STOP</h2>
        <p className="text-xs text-oceano-600">
          Passo {passo + 1} de {PASSOS.length}
        </p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-em-aparicao" key={passo}>
        <div
          className="w-28 h-28 rounded-full bg-brisa-100 border-4 border-brisa-400 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-5xl font-light text-brisa-600">
            {passoAtual.letra}
          </span>
        </div>
        <h3 className="text-2xl font-light text-oceano-800">{passoAtual.titulo}</h3>
        <p className="text-base text-oceano-700 leading-relaxed max-w-xs">
          {passoAtual.descricao}
        </p>
      </div>

      <footer className="pt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={avancar}
          className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors"
        >
          {ehUltimo ? "Voltar" : "Próximo"}
        </button>
        {!ehUltimo && (
          <button
            type="button"
            onClick={aoFinalizar}
            className="w-full min-h-[44px] px-4 text-sm text-oceano-600 hover:text-oceano-800 transition-colors"
          >
            Sair quando quiser
          </button>
        )}
      </footer>
    </div>
  );
}
