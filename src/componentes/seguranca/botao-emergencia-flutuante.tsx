"use client";

import { useState } from "react";

import { BottomSheetEmergencia } from "@/componentes/seguranca/bottom-sheet-emergencia";

function vibrar(padrao: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(padrao);
    } catch {
      /* silencioso */
    }
  }
}

export function BotaoEmergenciaFlutuante() {
  const [sheetAberto, setSheetAberto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          vibrar(30);
          setSheetAberto(true);
        }}
        aria-label="Abrir ferramentas de emergência emocional"
        className="fixed z-30 right-4 w-14 h-14 rounded-full bg-coral-500 text-white shadow-lg hover:bg-coral-600 transition-colors flex items-center justify-center focus-visible:ring-4 focus-visible:ring-coral-400/40"
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <span className="text-2xl" aria-hidden="true">
          🫂
        </span>
      </button>

      <BottomSheetEmergencia
        aberto={sheetAberto}
        aoFechar={() => setSheetAberto(false)}
      />
    </>
  );
}
