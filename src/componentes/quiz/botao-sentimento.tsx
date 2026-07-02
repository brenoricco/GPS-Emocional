"use client";

import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useState } from "react";

import type { Modulo } from "@/tipos/modulo";
import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

/**
 * Botão colorido do quiz (Tela 2) — leva ao módulo correspondente.
 * Cada botão herda a cor de sentimento do módulo.
 * Ao tocar: haptic + pequeno delay animado + navigation.
 */
export function BotaoSentimento({ modulo }: { modulo: Modulo }) {
  const router = useRouter();
  const [pressionado, setPressionado] = useState(false);

  function aoTocar() {
    if (pressionado) return;
    setPressionado(true);
    vibrar("toque");
    // 180ms para o feedback visual "afundar" antes de trocar de tela
    setTimeout(() => {
      router.push(`/modulo/${modulo.slug}` as Route);
    }, 180);
  }

  return (
    <button
      type="button"
      onClick={aoTocar}
      aria-label={`Escolher: ${modulo.frase} — vai para ${modulo.titulo}`}
      className={cn(
        "w-full min-h-[92px] rounded-2xl px-5 py-4 text-left",
        "transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4",
        "focus-visible:ring-bruma/30 shadow-lg shadow-noite-700/40",
        modulo.classeFundo,
        modulo.classeTexto,
        pressionado && "scale-[0.98]",
      )}
    >
      <p className="text-[15px] leading-snug font-medium">
        {modulo.frase}
      </p>
    </button>
  );
}
