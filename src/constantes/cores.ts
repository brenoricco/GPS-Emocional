/**
 * Paleta "Aurora Pastel" (v3 — extraída da nova logo GPS Emocional).
 * Espelho dos tokens do tailwind.config.ts. Use estas constantes quando
 * precisar da cor bruta (SVG, canvas, algum estilo dinâmico não-Tailwind).
 * Para 99% dos casos, use a classe utilitária do Tailwind (`bg-bruma`, `text-noite`).
 */

export const CORES = {
  // Semânticas (nomes históricos preservados)
  noite: "#3D2A5A", // texto/dark accent (violeta profundo)
  bruma: "#FBF2EE", // fundo/light accent (creme quente)

  // Superfícies cremes
  creme: "#FBF2EE",
  cremeClaro: "#FDF7F5",
  cremeMedio: "#F5E9E6",
  cremeEscuro: "#EBD9D0",

  // Brand
  violeta: "#5C3E8C",
  mauve: "#B58AAA",
  blush: "#F5D3D3",
  rosaFlor: "#E39CB0",
  lavanda: "#C8A5DF",
  dourado: "#C9A46A",

  // Sentimento
  orquidea: "#C77DFF",
  azulCeu: "#8FB8DC",
  amareloSol: "#F0D97C",

  // Alertas
  atencao: "#E8A855",
  emergencia: "#D96262",
} as const;

export type CorToken = keyof typeof CORES;
