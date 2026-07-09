"use client";

import { useState } from "react";

import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

type Luz = {
  cor: "rosa" | "amarela" | "azul";
  emoji: string;
  microAcao: string;
};

const LUZES: Luz[] = [
  {
    cor: "rosa",
    emoji: "🌸",
    microAcao: "Beba um copo de água calmamente agora.",
  },
  {
    cor: "amarela",
    emoji: "☀️",
    microAcao: "Abra a janela por 1 minuto e sinta o ar no rosto.",
  },
  {
    cor: "azul",
    emoji: "💧",
    microAcao: "Apenas estique os braços e dê um leve suspiro de alívio.",
  },
];

/**
 * Despertar das Cores — Módulo 4 (Depressão).
 * Menos é mais aqui. Fundo pastel (#f2d6ca) com texto escuro — decisão Rejane.
 * Após tocar em uma luz, a micro-ação aparece e fica visível para leitura calma;
 * a usuária confirma quando estiver pronta para prosseguir.
 */
export function DespertarCores({ aoConcluir }: { aoConcluir: () => void }) {
  const [acesa, setAcesa] = useState<number | null>(null);
  const [prosseguindo, setProsseguindo] = useState(false);

  function acender(indice: number) {
    if (acesa !== null) return;
    vibrar("toque");
    setAcesa(indice);
  }

  function prosseguir() {
    if (prosseguindo) return;
    setProsseguindo(true);
    vibrar("conclusao");
    setTimeout(() => aoConcluir(), 300);
  }

  const luzAcesa = acesa !== null ? LUZES[acesa] : null;

  return (
    <div className="space-y-6 select-none">
      {/* Luzes — todas em fundo laranja-claro pastel com texto/emoji escuros */}
      <div className="grid grid-cols-3 gap-3">
        {LUZES.map((luz, i) => {
          const estaAcesa = acesa === i;
          return (
            <button
              key={luz.cor}
              type="button"
              onClick={() => acender(i)}
              disabled={acesa !== null && !estaAcesa}
              aria-label={`Luz ${luz.cor}`}
              className={cn(
                "aspect-square rounded-full border-2 flex items-center justify-center text-3xl",
                "bg-laranja-claro text-noite border-laranja-claro",
                "transition-all duration-500 active:scale-95",
                estaAcesa && "shadow-[0_0_40px_rgba(242,214,202,0.6)] scale-[1.03]",
                acesa !== null && !estaAcesa && "opacity-40",
              )}
            >
              <span aria-hidden="true">{luz.emoji}</span>
            </button>
          );
        })}
      </div>

      {/* Micro-ação revelada — fica visível até a usuária tocar em "Continuar" */}
      {luzAcesa && (
        <div
          role="status"
          className="rounded-2xl border border-mauve/25 bg-creme-medio/60 px-4 py-5 text-center animate-aparecer"
        >
          <p className="text-acolhimento text-noite">{luzAcesa.microAcao}</p>
        </div>
      )}

      {acesa === null && (
        <p className="text-center text-sm text-bruma-muted">
          Toque em uma luz. Só uma. Já é o suficiente.
        </p>
      )}

      {luzAcesa && !prosseguindo && (
        <button
          type="button"
          onClick={prosseguir}
          className={cn(
            "w-full min-h-[52px] rounded-cta bg-rosa-flor text-noite font-semibold",
            "active:scale-[0.98] transition-transform animate-aparecer",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rosa-flor-400/40",
          )}
        >
          Continuar
        </button>
      )}
    </div>
  );
}
