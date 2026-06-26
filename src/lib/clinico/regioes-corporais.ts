/**
 * Regiões corporais do mapa interativo no onboarding.
 *
 * Cada região tem coordenadas relativas (0-100) usadas pra posicionar
 * círculos clicáveis sobre uma silhueta humana SVG simples (em vez de
 * desenhar a silhueta inteira, posicionamos "hotspots" sobre uma silhueta
 * neutra). Acessível: cada hotspot tem rótulo legível.
 */

export interface RegiaoCorporal {
  id: string;
  nome: string;
  xPercent: number;
  yPercent: number;
}

export const REGIOES_CORPORAIS: RegiaoCorporal[] = [
  { id: "cabeca", nome: "Cabeça", xPercent: 50, yPercent: 9 },
  { id: "mandibula", nome: "Mandíbula", xPercent: 50, yPercent: 16 },
  { id: "garganta", nome: "Garganta", xPercent: 50, yPercent: 21 },
  { id: "ombros", nome: "Ombros", xPercent: 50, yPercent: 27 },
  { id: "peito", nome: "Peito", xPercent: 50, yPercent: 36 },
  { id: "costas", nome: "Costas", xPercent: 78, yPercent: 36 },
  { id: "estomago", nome: "Estômago", xPercent: 50, yPercent: 46 },
  { id: "barriga", nome: "Barriga", xPercent: 50, yPercent: 53 },
  { id: "pelvis", nome: "Pélvis", xPercent: 50, yPercent: 60 },
  { id: "maos", nome: "Mãos", xPercent: 22, yPercent: 55 },
  { id: "pernas", nome: "Pernas", xPercent: 50, yPercent: 75 },
];
