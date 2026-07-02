"use client";

import { useState } from "react";

import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

type Luz = {
  cor: "rosa" | "amarela" | "azul";
  emoji: string;
  microAcao: string;
  classe: string;
  ativa: string;
};

const LUZES: Luz[] = [
  {
    cor: "rosa",
    emoji: "🌸",
    microAcao: "Beba um copo de água calmamente agora.",
    classe: "bg-rosa-flor/20 border-rosa-flor/40",
    ativa: "bg-rosa-flor text-noite shadow-[0_0_40px_rgba(255,183,197,0.5)]",
  },
  {
    cor: "amarela",
    emoji: "☀️",
    microAcao: "Abra a janela por 1 minuto e sinta o ar no rosto.",
    classe: "bg-amarelo-sol/20 border-amarelo-sol/40",
    ativa: "bg-amarelo-sol text-noite shadow-[0_0_40px_rgba(255,224,130,0.5)]",
  },
  {
    cor: "azul",
    emoji: "💧",
    microAcao: "Apenas estique os braços e dê um leve suspiro de alívio.",
    classe: "bg-azul-ceu/20 border-azul-ceu/40",
    ativa: "bg-azul-ceu text-bruma shadow-[0_0_40px_rgba(74,144,226,0.5)]",
  },
];

/**
 * Despertar das Cores — Módulo 4 (Depressão).
 * Menos é mais aqui. UI minimalista, texto grande, uma única escolha basta.
 * Apenas 1 luz precisa ser acesa para concluir (respeitar quem tem baixa energia).
 */
export function DespertarCores({ aoConcluir }: { aoConcluir: () => void }) {
  const [acesa, setAcesa] = useState<number | null>(null);

  function acender(indice: number) {
    if (acesa !== null) return;
    vibrar("toque");
    setAcesa(indice);
    setTimeout(() => {
      vibrar("conclusao");
      aoConcluir();
    }, 800);
  }

  return (
    <div className="space-y-6 select-none">
      {/* Luzes */}
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
                "transition-all duration-500 active:scale-95",
                estaAcesa ? luz.ativa : luz.classe,
                acesa !== null && !estaAcesa && "opacity-30",
              )}
            >
              <span aria-hidden="true">{luz.emoji}</span>
            </button>
          );
        })}
      </div>

      {/* Micro-ação revelada */}
      {acesa !== null && LUZES[acesa] && (
        <div
          role="status"
          className="rounded-2xl border border-bruma/15 bg-noite-400/30 px-4 py-4 text-center animate-aparecer"
        >
          <p className="text-acolhimento text-bruma">{LUZES[acesa]!.microAcao}</p>
        </div>
      )}

      {acesa === null && (
        <p className="text-center text-sm text-bruma-muted">
          Toque em uma luz. Só uma. Já é o suficiente.
        </p>
      )}
    </div>
  );
}
