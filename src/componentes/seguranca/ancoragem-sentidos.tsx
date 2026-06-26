"use client";

import { useState } from "react";

interface PropsAncoragem {
  aoFinalizar: () => void;
}

const PASSOS = [
  { qtd: 5, sentido: "que você consegue VER", emoji: "👀" },
  { qtd: 4, sentido: "que você consegue TOCAR", emoji: "✋" },
  { qtd: 3, sentido: "que você consegue OUVIR", emoji: "👂" },
  { qtd: 2, sentido: "que você consegue CHEIRAR", emoji: "👃" },
  { qtd: 1, sentido: "que você consegue SENTIR (sabor ou emoção)", emoji: "💧" },
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

export function AncoragemSentidos({ aoFinalizar }: PropsAncoragem) {
  const [passo, setPasso] = useState(0);
  const ehUltimo = passo === PASSOS.length - 1;
  const ehFim = passo === PASSOS.length;
  const passoAtual = PASSOS[passo];

  function avancar() {
    vibrar(30);
    setPasso((p) => p + 1);
  }

  if (ehFim) {
    return (
      <div className="flex flex-col h-full">
        <header className="text-center space-y-2 mb-6">
          <h2 className="text-xl font-light text-oceano-800">Você voltou</h2>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-brisa-200/70 flex items-center justify-center text-4xl" aria-hidden="true">
            🌿
          </div>
          <p className="text-base text-oceano-700 leading-relaxed max-w-xs">
            Esse é o seu agora. Pequeno, simples, real.
          </p>
        </div>
        <footer className="pt-6">
          <button
            type="button"
            onClick={aoFinalizar}
            className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors"
          >
            Voltar
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="text-center space-y-2 mb-6">
        <h2 className="text-xl font-light text-oceano-800">
          Ancoragem dos sentidos
        </h2>
        <p className="text-xs text-oceano-600">
          Passo {passo + 1} de {PASSOS.length}
        </p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-em-aparicao" key={passo}>
        <div
          className="w-24 h-24 rounded-full bg-brisa-100 border-4 border-brisa-400 flex items-center justify-center text-4xl"
          aria-hidden="true"
        >
          {passoAtual?.emoji}
        </div>
        <div className="space-y-3">
          <p className="text-5xl font-light text-brisa-600">{passoAtual?.qtd}</p>
          <p className="text-base text-oceano-700 leading-relaxed max-w-xs">
            coisa{passoAtual?.qtd !== 1 ? "s" : ""}{" "}
            {passoAtual?.sentido}.
          </p>
        </div>
        <p className="text-xs text-oceano-500 max-w-xs">
          Toque quando tiver nomeado em silêncio.
        </p>
      </div>

      <footer className="pt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={avancar}
          className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors"
        >
          {ehUltimo ? "Finalizar" : "Próximo"}
        </button>
        <button
          type="button"
          onClick={aoFinalizar}
          className="w-full min-h-[44px] px-4 text-sm text-oceano-600 hover:text-oceano-800 transition-colors"
        >
          Sair quando quiser
        </button>
      </footer>
    </div>
  );
}
