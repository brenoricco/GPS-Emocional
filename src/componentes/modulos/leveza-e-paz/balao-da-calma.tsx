"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

type Fase = "descansando" | "inspirando" | "segurando" | "expirando";
const CICLOS_ALVO = 3;
const INSPIRA_MS = 4000;
const SEGURA_MS = 2000;
const EXPIRA_MS = 4000;

/**
 * Balão da Calma — Módulo 1.
 * Press-and-hold no círculo:
 *   - segurando → círculo cresce por 4s (inspiração)
 *   - após 4s → segura 2s
 *   - soltar → círculo encolhe por 4s (expiração)
 * 3 ciclos completos = concluído.
 */
export function BalaoDaCalma({ aoConcluir }: { aoConcluir: () => void }) {
  const [fase, setFase] = useState<Fase>("descansando");
  const [ciclos, setCiclos] = useState(0);
  const [progresso, setProgresso] = useState(0); // 0..1 — tamanho do círculo
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const inicioRef = useRef<number>(0);
  const jaConcluido = useRef(false);

  const limparTimers = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    timerRef.current = null;
    rafRef.current = null;
  };

  useEffect(() => () => limparTimers(), []);

  useEffect(() => {
    if (ciclos >= CICLOS_ALVO && !jaConcluido.current) {
      jaConcluido.current = true;
      vibrar("conclusao");
      aoConcluir();
    }
  }, [ciclos, aoConcluir]);

  const animarProgresso = useCallback(
    (de: number, para: number, duracaoMs: number, aoFim: () => void) => {
      inicioRef.current = performance.now();
      const passo = (agora: number) => {
        const t = Math.min(1, (agora - inicioRef.current) / duracaoMs);
        setProgresso(de + (para - de) * t);
        if (t < 1) {
          rafRef.current = window.requestAnimationFrame(passo);
        } else {
          aoFim();
        }
      };
      rafRef.current = window.requestAnimationFrame(passo);
    },
    [],
  );

  function iniciarInspiracao() {
    if (fase !== "descansando" && fase !== "expirando") return;
    limparTimers();
    vibrar("respiracao");
    setFase("inspirando");
    animarProgresso(progresso, 1, INSPIRA_MS * (1 - progresso), () => {
      setFase("segurando");
      timerRef.current = window.setTimeout(() => {
        // Se a usuária soltar durante o "segurando", já vai pra expirando naturalmente
        // Se ela continuar segurando, o sistema aguarda ela soltar
      }, SEGURA_MS);
    });
  }

  function iniciarExpiracao() {
    if (fase === "descansando") return;
    limparTimers();
    vibrar("respiracao");
    setFase("expirando");
    animarProgresso(progresso, 0, EXPIRA_MS * progresso, () => {
      setFase("descansando");
      setProgresso(0);
      setCiclos((c) => c + 1);
    });
  }

  const escala = 0.55 + progresso * 0.55; // 0.55 → 1.10

  const texto = {
    descansando: "Toque e segure",
    inspirando: "Puxe o ar...",
    segurando: "Segure...",
    expirando: "Solte o ar devagar...",
  }[fase];

  return (
    <div className="flex flex-col items-center gap-6 py-4 select-none">
      {/* Instrução dinâmica */}
      <p
        aria-live="polite"
        className={cn(
          "text-lg font-medium tracking-wide transition-colors",
          fase === "inspirando" && "text-rosa-flor",
          fase === "segurando" && "text-lavanda",
          fase === "expirando" && "text-azul-ceu",
          fase === "descansando" && "text-bruma-muted",
        )}
      >
        {texto}
      </p>

      {/* Círculo pressionável */}
      <button
        type="button"
        aria-label="Toque e segure para inspirar, solte para expirar"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          iniciarInspiracao();
        }}
        onPointerUp={iniciarExpiracao}
        onPointerCancel={iniciarExpiracao}
        onPointerLeave={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) return;
          iniciarExpiracao();
        }}
        className={cn(
          "relative w-64 h-64 rounded-full outline-none",
          "focus-visible:ring-4 focus-visible:ring-rosa-flor-400/40",
          "touch-none",
        )}
      >
        <span
          aria-hidden="true"
          style={{ transform: `scale(${escala})` }}
          className={cn(
            "absolute inset-0 rounded-full transition-transform duration-100",
            "bg-gradient-to-br from-rosa-flor via-lavanda to-orquidea",
            "shadow-[0_0_60px_rgba(255,183,197,0.35)]",
          )}
        />
        <span
          aria-hidden="true"
          style={{ transform: `scale(${escala * 0.85})` }}
          className="absolute inset-0 rounded-full bg-noite/40 transition-transform duration-100"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-bruma/90 text-sm"
        >
          {fase === "descansando" ? "🌸" : ""}
        </span>
      </button>

      {/* Contador de ciclos */}
      <div className="flex items-center gap-2" aria-label={`${ciclos} de ${CICLOS_ALVO} ciclos concluídos`}>
        {Array.from({ length: CICLOS_ALVO }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              i < ciclos ? "bg-rosa-flor" : "bg-noite-300",
            )}
          />
        ))}
      </div>

      <p className="text-xs text-bruma-muted text-center max-w-xs">
        {ciclos < CICLOS_ALVO
          ? `Complete ${CICLOS_ALVO - ciclos} ${CICLOS_ALVO - ciclos === 1 ? "ciclo" : "ciclos"} para continuar`
          : "Ciclos concluídos"}
      </p>
    </div>
  );
}
