"use client";

import { TEMAS_DISPONIVEIS } from "@/lib/clinico/temas-disponiveis";

interface PropsPasso {
  slugsCandidatos: string[];
  slugSelecionado: string;
  aoSelecionar: (slug: string) => void;
}

export function PassoTemaPrincipal({
  slugsCandidatos,
  slugSelecionado,
  aoSelecionar,
}: PropsPasso) {
  const temas = TEMAS_DISPONIVEIS.filter((t) =>
    slugsCandidatos.includes(t.slug),
  );

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h2 className="text-2xl font-light text-oceano-800 leading-snug">
          Dos que você marcou, qual está mais pesado hoje?
        </h2>
        <p className="text-sm text-oceano-600 leading-relaxed">
          Vou começar a trilha por esse. Os outros ficam disponíveis no seu mapa.
        </p>
      </header>

      <ul className="space-y-3">
        {temas.map((tema) => {
          const estaSelecionado = slugSelecionado === tema.slug;
          return (
            <li key={tema.slug}>
              <button
                type="button"
                onClick={() => aoSelecionar(tema.slug)}
                aria-pressed={estaSelecionado}
                className={`w-full min-h-[72px] p-4 rounded-2xl border text-left transition-colors flex items-center gap-4 ${
                  estaSelecionado
                    ? "bg-brisa-50 border-brisa-400 ring-2 ring-brisa-300/40"
                    : "bg-white border-oceano-200 hover:bg-oceano-50/40"
                }`}
              >
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {tema.emoji}
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-base text-oceano-800">
                    {tema.nome}
                  </span>
                  <span className="block text-xs text-oceano-600">
                    {tema.descricaoCurta}
                  </span>
                </span>
                {estaSelecionado && (
                  <span className="text-brisa-600 text-xl" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
