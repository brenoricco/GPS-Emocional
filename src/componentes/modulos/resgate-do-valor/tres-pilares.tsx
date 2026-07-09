"use client";

import { useState } from "react";

import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

const PILARES = [
  {
    slug: "capacidade",
    titulo: "Pilar da Capacidade",
    emoji: "💪",
    reflexao:
      "Lembre-se de uma situação difícil no passado que você achou que não ia aguentar, mas aguentou e superou. Você tem recursos internos.",
  },
  {
    slug: "merecimento",
    titulo: "Pilar do Merecimento",
    emoji: "💝",
    reflexao:
      "Se um amigo querido estivesse sofrendo agora, você diria que ele merece ser feliz? Então por que você diz o contrário para si mesma? Você merece receber o melhor da vida.",
  },
  {
    slug: "recomeco",
    titulo: "Pilar do Recomeço",
    emoji: "🌱",
    reflexao:
      "Um plano que não deu certo é apenas um resultado, não o seu veredito. Fracassar em algo não faz de você um fracasso.",
  },
] as const;

/**
 * Três Pilares — Módulo 5 (Autoestima).
 * Escolher 1 pilar → revela reflexão guiada → confirmar → concluir.
 * Padrão de escolha guiada (não abre tudo de uma vez para dar peso à escolha).
 */
export function TresPilares({ aoConcluir }: { aoConcluir: () => void }) {
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [confirmado, setConfirmado] = useState(false);

  function escolher(indice: number) {
    vibrar("toque");
    setSelecionado(indice);
  }

  function confirmar() {
    vibrar("conclusao");
    setConfirmado(true);
    setTimeout(() => aoConcluir(), 400);
  }

  return (
    <div className="space-y-4 select-none">
      {/* Lista de pilares */}
      <div className="space-y-3">
        {PILARES.map((pilar, i) => {
          const ativo = selecionado === i;
          return (
            <div
              key={pilar.slug}
              className={cn(
                "rounded-2xl border transition-all",
                ativo
                  ? "border-dourado/60 bg-dourado/20 shadow-[0_0_30px_rgba(201,164,106,0.25)]"
                  : "border-mauve/30 bg-creme-medio/60",
              )}
            >
              <button
                type="button"
                onClick={() => escolher(i)}
                aria-expanded={ativo}
                className={cn(
                  "w-full text-left px-4 py-4 flex items-center gap-3",
                  "min-h-touch focus-visible:outline-none",
                )}
              >
                <span aria-hidden="true" className="text-2xl shrink-0">
                  {pilar.emoji}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "block text-base font-medium",
                      ativo ? "text-dourado-700" : "text-noite",
                    )}
                  >
                    {pilar.titulo}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-noite/55 transition-transform",
                    ativo && "rotate-90",
                  )}
                >
                  ›
                </span>
              </button>

              {ativo && (
                <div className="px-4 pb-4 animate-aparecer">
                  <p className="text-acolhimento text-noite/85 border-t border-dourado/30 pt-3">
                    {pilar.reflexao}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selecionado !== null && !confirmado && (
        <button
          type="button"
          onClick={confirmar}
          className={cn(
            "w-full min-h-[52px] rounded-cta bg-dourado text-noite font-semibold",
            "active:scale-[0.98] transition-transform animate-aparecer",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-dourado-400/40",
          )}
        >
          Guardar essa reflexão comigo
        </button>
      )}
    </div>
  );
}
