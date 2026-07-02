/**
 * Paleta "Céu Noturno" — fonte única da verdade em código.
 * Espelho dos tokens do tailwind.config.ts. Use estas constantes quando
 * precisar da cor bruta (SVG, canvas, algum estilo dinâmico não-Tailwind).
 * Para 99% dos casos, use a classe utilitária do Tailwind (`bg-noite`, `text-bruma`).
 */

export const CORES = {
  noite: "#0B132B",
  bruma: "#F4F6F9",
  rosaFlor: "#FFB7C5",
  orquidea: "#C77DFF",
  azulCeu: "#4A90E2",
  lavanda: "#B39DDB",
  amareloSol: "#FFE082",
  dourado: "#D4AF37",
  atencao: "#FFA726",
  emergencia: "#EF5350",
} as const;

export type CorToken = keyof typeof CORES;
