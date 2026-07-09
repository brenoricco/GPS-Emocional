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

/** Ângulos fixos para a purpurina de cada pilar (raio ~72px). */
function gerarParticulas(qtd = 10) {
  return Array.from({ length: qtd }, (_, i) => {
    const angulo = (i / qtd) * Math.PI * 2 + Math.random() * 0.4;
    const raio = 55 + Math.random() * 30;
    return {
      dx: `${Math.cos(angulo) * raio}px`,
      dy: `${Math.sin(angulo) * raio}px`,
      delay: `${Math.random() * 90}ms`,
    };
  });
}

/**
 * Reconstrução de Pilares — Módulo 2 (Cura do Coração).
 * Toque em cada pilar → explosão de purpurina dourada (autoria Rejane).
 * Todos coletados → explosão final maior + conclui.
 */
export function ReconstrucaoPilares({ aoConcluir }: { aoConcluir: () => void }) {
  const [coletados, setColetados] = useState<Set<number>>(new Set());
  const [particulasPorPilar, setParticulasPorPilar] = useState<Record<number, ReturnType<typeof gerarParticulas>>>({});
  const [explosaoFinal, setExplosaoFinal] = useState(false);
  const total = PILARES.length;

  function tocar(indice: number) {
    if (coletados.has(indice)) return;
    vibrar("toque");
    const novo = new Set(coletados);
    novo.add(indice);
    setColetados(novo);
    setParticulasPorPilar((atual) => ({ ...atual, [indice]: gerarParticulas() }));
    if (novo.size === total) {
      vibrar("conclusao");
      setExplosaoFinal(true);
      setTimeout(() => aoConcluir(), 1400);
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
          const particulas = particulasPorPilar[i] ?? [];
          return (
            <button
              key={pilar.nome}
              type="button"
              onClick={() => tocar(i)}
              aria-pressed={dentro}
              aria-label={`Pilar ${pilar.nome}${dentro ? " — colocado no lugar" : ""}`}
              className={cn(
                "relative min-h-[90px] rounded-2xl border transition-all text-center px-3 py-3 overflow-visible",
                "flex flex-col items-center justify-center gap-1",
                dentro
                  ? "border-dourado/60 bg-dourado/25 shadow-[0_0_25px_rgba(201,164,106,0.35)]"
                  : "border-mauve/25 bg-creme-medio/60 active:scale-95",
              )}
            >
              <span className={cn("text-2xl transition-transform", dentro && "scale-110")} aria-hidden="true">
                {pilar.emoji}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  dentro ? "text-dourado-700" : "text-noite",
                )}
              >
                {pilar.nome}
              </span>

              {/* Purpurina dourada — só renderiza no pilar recém-tocado */}
              {dentro && particulas.length > 0 && (
                <span aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  {particulas.map((p, k) => (
                    <span
                      key={k}
                      className="particula-dourada"
                      style={{
                        // @ts-expect-error — CSS custom props aceitas em runtime
                        "--dx": p.dx,
                        "--dy": p.dy,
                        animationDelay: p.delay,
                      }}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Templo/base — enche à medida que pedras entram */}
      <div className="relative h-3 rounded-full bg-creme-escuro/60 overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-dourado via-amarelo-sol to-rosa-flor transition-all duration-500"
          style={{ width: `${(coletados.size / total) * 100}%` }}
        />
      </div>

      {/* Explosão final dourada — cobre todo o grid */}
      {explosaoFinal && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 flex items-center justify-center z-40">
          <div className="relative w-64 h-64">
            <div className="explosao-final" />
          </div>
        </div>
      )}
    </div>
  );
}
