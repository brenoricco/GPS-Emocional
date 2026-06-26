/**
 * Regiões do Mapa Emocional do GPS Emocional.
 *
 * Coordenadas em viewBox 360x520 (proporção mobile portrait).
 * Cores em HEX pra renderizar SVG sem dependência de runtime Tailwind.
 *
 * 10 regiões — 6 com conteúdo Rejane disponível, 3 "em breve",
 * 1 nova (Constelação) pra Sentido da Vida, 1 nova (Refúgio) pra Solidão.
 */

export interface RegiaoMapa {
  slug: string;
  nome: string;
  temaSlug: string;
  cor: string;
  corContorno: string;
  pinX: number;
  pinY: number;
  raio: number;
  emoji: string;
  rotuloDy?: number;
}

export const VIEW_BOX_MAPA = { largura: 360, altura: 540 };

export const REGIOES_MAPA: RegiaoMapa[] = [
  {
    slug: "constelacao",
    temaSlug: "sentido-da-vida",
    nome: "Constelação",
    cor: "#224B5A",
    corContorno: "#1A2B35",
    pinX: 180,
    pinY: 55,
    raio: 38,
    emoji: "✨",
    rotuloDy: 52,
  },
  {
    slug: "praia-ao-amanhecer",
    temaSlug: "autoestima",
    nome: "Praia ao Amanhecer",
    cor: "#76BCAB",
    corContorno: "#4FA08C",
    pinX: 290,
    pinY: 130,
    raio: 42,
    emoji: "🌅",
    rotuloDy: 56,
  },
  {
    slug: "tempestade-do-mar",
    temaSlug: "ansiedade",
    nome: "Tempestade do Mar",
    cor: "#1B6C79",
    corContorno: "#224B5A",
    pinX: 75,
    pinY: 140,
    raio: 46,
    emoji: "🌊",
    rotuloDy: 60,
  },
  {
    slug: "enseada-escondida",
    temaSlug: "timidez",
    nome: "Enseada Escondida",
    cor: "#A6D6C8",
    corContorno: "#76BCAB",
    pinX: 65,
    pinY: 250,
    raio: 38,
    emoji: "🐚",
    rotuloDy: 52,
  },
  {
    slug: "aguas-paradas",
    temaSlug: "procrastinacao",
    nome: "Águas Paradas",
    cor: "#BBBBBB",
    corContorno: "#ACB3B3",
    pinX: 180,
    pinY: 245,
    raio: 40,
    emoji: "⏳",
    rotuloDy: 54,
  },
  {
    slug: "redemoinho",
    temaSlug: "relacionamento-toxico",
    nome: "Redemoinho",
    cor: "#E07D6A",
    corContorno: "#C56350",
    pinX: 295,
    pinY: 250,
    raio: 40,
    emoji: "🌀",
    rotuloDy: 54,
  },
  {
    slug: "refugio-interno",
    temaSlug: "solidao",
    nome: "Refúgio Interno",
    cor: "#ACB3B3",
    corContorno: "#8E9494",
    pinX: 130,
    pinY: 355,
    raio: 42,
    emoji: "🏡",
    rotuloDy: 56,
  },
  {
    slug: "mar-aberto-cinzento",
    temaSlug: "luto",
    nome: "Mar Aberto",
    cor: "#8E9494",
    corContorno: "#6F7575",
    pinX: 245,
    pinY: 355,
    raio: 44,
    emoji: "🕊️",
    rotuloDy: 58,
  },
  {
    slug: "naufragio",
    temaSlug: "traicao",
    nome: "Naufrágio",
    cor: "#195A66",
    corContorno: "#224B5A",
    pinX: 95,
    pinY: 460,
    raio: 46,
    emoji: "⚓",
    rotuloDy: 60,
  },
  {
    slug: "profundezas",
    temaSlug: "trauma-infancia",
    nome: "Profundezas",
    cor: "#1A2B35",
    corContorno: "#000000",
    pinX: 260,
    pinY: 470,
    raio: 44,
    emoji: "🌑",
    rotuloDy: 58,
  },
];

export function buscarRegiaoPorTemaSlug(
  temaSlug: string,
): RegiaoMapa | undefined {
  return REGIOES_MAPA.find((r) => r.temaSlug === temaSlug);
}

export function buscarRegiaoPorSlug(slug: string): RegiaoMapa | undefined {
  return REGIOES_MAPA.find((r) => r.slug === slug);
}
