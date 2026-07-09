"use client";

import { useState } from "react";

import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

const FRASES = [
  "A CULPA DE TUDO É SEMPRE MINHA",
  "EU NÃO FAÇO NADA DIREITO",
  "SE ELE ME DEIXAR VOU ACABAR SOZINHA",
  "ELE ME AMA, POR ISSO É TÃO CIUMENTO",
  "NÃO SOU BONITA O BASTANTE PARA ELE",
] as const;

/**
 * Cortar os Fios — Módulo 3 (Rompendo Ciclos).
 * 5 frases-peso comuns em rel. tóxicos. Toque = frase se dissolve.
 * Todas soltas = concluído. Céu ganha brilho suave.
 */
export function CortarFios({ aoConcluir }: { aoConcluir: () => void }) {
  const [soltas, setSoltas] = useState<Set<number>>(new Set());
  const total = FRASES.length;

  function soltar(indice: number) {
    if (soltas.has(indice)) return;
    vibrar("toque");
    const novo = new Set(soltas);
    novo.add(indice);
    setSoltas(novo);
    if (novo.size === total) {
      vibrar("conclusao");
      setTimeout(() => aoConcluir(), 600);
    }
  }

  return (
    <div className="space-y-4 select-none">
      <p className="text-sm text-bruma-muted text-center">
        {soltas.size < total
          ? "Toque em cada peso para deixá-lo pelo caminho"
          : "Mochila mais leve"}
      </p>

      <ul className="space-y-3">
        {FRASES.map((frase, i) => {
          const solta = soltas.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => soltar(i)}
                disabled={solta}
                aria-pressed={solta}
                className={cn(
                  "relative w-full text-left rounded-2xl border px-4 py-4",
                  "flex items-center gap-3 transition-all duration-500",
                  solta
                    ? "border-mauve/30 bg-blush/20 opacity-30 blur-[1px]"
                    : "border-laranja-claro bg-laranja-claro active:scale-[0.98]",
                )}
              >
                <span aria-hidden="true" className="text-xl shrink-0">
                  {solta ? "🕊️" : "🪨"}
                </span>
                <span
                  className={cn(
                    "text-[15px] leading-snug font-medium",
                    solta ? "text-noite/40 line-through" : "text-noite",
                  )}
                >
                  {frase}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
