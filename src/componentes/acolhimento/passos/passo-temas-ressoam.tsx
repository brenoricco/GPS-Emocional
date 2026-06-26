"use client";

import { TEMAS_DISPONIVEIS } from "@/lib/clinico/temas-disponiveis";

interface PropsPasso {
  selecionados: string[];
  aoAlternar: (slug: string) => void;
  maximo: number;
}

export function PassoTemasRessoam({ selecionados, aoAlternar, maximo }: PropsPasso) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h2 className="text-2xl font-light text-oceano-800 leading-snug">
          O que ressoa com você agora?
        </h2>
        <p className="text-sm text-oceano-600 leading-relaxed">
          Escolha até {maximo} temas. Você pode mudar depois — isso é só pra
          gente começar pelo certo.
        </p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TEMAS_DISPONIVEIS.map((tema) => {
          const estaSelecionado = selecionados.includes(tema.slug);
          const desabilitado =
            !estaSelecionado && selecionados.length >= maximo;
          return (
            <li key={tema.slug}>
              <button
                type="button"
                onClick={() => aoAlternar(tema.slug)}
                disabled={desabilitado}
                aria-pressed={estaSelecionado}
                className={`w-full min-h-[72px] p-4 rounded-2xl border text-left transition-colors flex items-start gap-3 ${
                  estaSelecionado
                    ? "bg-brisa-50 border-brisa-400 ring-2 ring-brisa-300/40"
                    : "bg-white border-oceano-200 hover:bg-oceano-50/40"
                } ${desabilitado ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {tema.emoji}
                </span>
                <span className="flex-1 space-y-1">
                  <span className="block font-medium text-sm text-oceano-800">
                    {tema.nome}
                  </span>
                  <span className="block text-xs text-oceano-600 leading-snug">
                    {tema.descricaoCurta}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-oceano-500 text-center">
        Selecionados: {selecionados.length} de {maximo}
      </p>
    </div>
  );
}
