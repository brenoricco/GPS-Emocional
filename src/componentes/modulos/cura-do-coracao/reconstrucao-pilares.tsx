"use client";

import { useState } from "react";

import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

const PILARES = [
  { nome: "Confiança", emoji: "🕊️" },
  { nome: "Autoestima", emoji: "✨" },
  { nome: "Planos", emoji: "🌱" },
  { nome: "Paz", emoji: "🌊" },
  { nome: "Amor-próprio", emoji: "💛" },
] as const;

/**
 * Reconstrução de Pilares — Módulo 2 (Cura do Coração).
 * Toque em cada pilar para "reposicioná-lo" no templo interno.
 * (Simplificação do drag original — mesma vivência emocional, gesto mais confiável em mobile).
 * 5 pilares → todos coletados = concluído.
 */
export function ReconstrucaoPilares({ aoConcluir }: { aoConcluir: () => void }) {
  const [coletados, setColetados] = useState<Set<number>>(new Set());
  const total = PILARES.length;

  function tocar(indice: number) {
    if (coletados.has(indice)) return;
    vibrar("toque");
    const novo = new Set(coletados);
    novo.add(indice);
    setColetados(novo);
    if (novo.size === total) {
      vibrar("conclusao");
      setTimeout(() => aoConcluir(), 500);
    }
  }

  const restantes = total - coletados.size;

  return (
    <div className="space-y-5 select-none">
      <p className="text-sm text-bruma-muted text-center">
        {restantes > 0
          ? `Toque em cada pedra para reconstruir seu templo interno · ${restantes} restantes`
          : "Seu templo está de pé."}
      </p>

      {/* Grid de pilares */}
      <div className="grid grid-cols-2 gap-3">
        {PILARES.map((pilar, i) => {
          const dentro = coletados.has(i);
          return (
            <button
              key={pilar.nome}
              type="button"
              onClick={() => tocar(i)}
              aria-pressed={dentro}
              aria-label={`Pilar ${pilar.nome}${dentro ? " — colocado no lugar" : ""}`}
              className={cn(
                "relative min-h-[90px] rounded-2xl border transition-all text-center px-3 py-3",
                "flex flex-col items-center justify-center gap-1",
                dentro
                  ? "border-atencao/60 bg-atencao/15 shadow-inner"
                  : "border-bruma/15 bg-noite-400/30 active:scale-95",
              )}
            >
              <span className={cn("text-2xl transition-transform", dentro && "scale-110")} aria-hidden="true">
                {pilar.emoji}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  dentro ? "text-atencao-400" : "text-bruma",
                )}
              >
                {pilar.nome}
              </span>
            </button>
          );
        })}
      </div>

      {/* Templo/base — enche à medida que pedras entram */}
      <div className="relative h-3 rounded-full bg-noite-400/40 overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-atencao via-rosa-flor to-lavanda transition-all duration-500"
          style={{ width: `${(coletados.size / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
