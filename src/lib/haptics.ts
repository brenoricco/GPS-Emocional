/**
 * Wrapper de Vibration API.
 * Silencioso em servidor, iOS Safari (não implementa) e usuárias com prefers-reduced-motion.
 */

type Padrao = "toque" | "conclusao" | "erro" | "respiracao";

const PADROES: Record<Padrao, number | number[]> = {
  toque: 10,
  conclusao: [30, 60, 30],
  erro: [40, 40, 40],
  respiracao: 20,
};

function reducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function vibrar(padrao: Padrao): void {
  if (typeof navigator === "undefined") return;
  if (typeof navigator.vibrate !== "function") return;
  if (reducedMotion()) return;
  navigator.vibrate(PADROES[padrao]);
}
