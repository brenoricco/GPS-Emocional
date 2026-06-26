/**
 * Lista canônica dos 10 temas do GPS Emocional pra uso em componentes
 * de UI (acolhimento, escolhas) sem hit no banco.
 *
 * IMPORTANTE: mantenha sincronizado com `prisma/seed.ts`.
 *
 * 7 temas com material clínico da Rejane (status DISPONIVEL).
 * 3 temas aguardando material (status EM_BREVE).
 */

export type StatusTemaUi = "DISPONIVEL" | "EM_BREVE";

export interface TemaDisponivel {
  slug: string;
  nome: string;
  subtituloModulo?: string;
  descricaoCurta: string;
  regiaoMapaSlug: string;
  corPrincipal: string;
  emoji: string;
  status: StatusTemaUi;
}

export const TEMAS_DISPONIVEIS: TemaDisponivel[] = [
  {
    slug: "ansiedade",
    nome: "Ansiedade",
    subtituloModulo: "O Peito Leve",
    descricaoCurta: "Pensamento acelerado, peito apertado.",
    regiaoMapaSlug: "tempestade-do-mar",
    corPrincipal: "oceano-500",
    emoji: "🌊",
    status: "DISPONIVEL",
  },
  {
    slug: "autoestima",
    nome: "Autoestima",
    subtituloModulo: "O Olhar para Si Mesma",
    descricaoCurta: "Voz crítica interna, sentir que não basta.",
    regiaoMapaSlug: "praia-ao-amanhecer",
    corPrincipal: "brisa-400",
    emoji: "🌅",
    status: "DISPONIVEL",
  },
  {
    slug: "timidez",
    nome: "Timidez",
    subtituloModulo: "O Olhar para Si Mesma",
    descricaoCurta: "Evitação social, autoconsciência excessiva.",
    regiaoMapaSlug: "enseada-escondida",
    corPrincipal: "brisa-300",
    emoji: "🐚",
    status: "DISPONIVEL",
  },
  {
    slug: "traicao",
    nome: "Traição",
    subtituloModulo: "O Coração Inteiro",
    descricaoCurta: "Confiança quebrada, autoimagem fraturada.",
    regiaoMapaSlug: "naufragio",
    corPrincipal: "oceano-700",
    emoji: "⚓",
    status: "DISPONIVEL",
  },
  {
    slug: "luto",
    nome: "Luto",
    subtituloModulo: "A Dor da Ausência",
    descricaoCurta: "Perda de pessoa, vínculo, fase.",
    regiaoMapaSlug: "mar-aberto-cinzento",
    corPrincipal: "areia-500",
    emoji: "🕊️",
    status: "DISPONIVEL",
  },
  {
    slug: "solidao",
    nome: "Solidão",
    subtituloModulo: "O Meu Próprio Lar",
    descricaoCurta: "Vazio, isolamento, ser a própria companhia.",
    regiaoMapaSlug: "refugio-interno",
    corPrincipal: "areia-500",
    emoji: "🏡",
    status: "DISPONIVEL",
  },
  {
    slug: "sentido-da-vida",
    nome: "Sentido da Vida",
    subtituloModulo: "O Sentido da Vida",
    descricaoCurta: "Vazio existencial, busca por propósito.",
    regiaoMapaSlug: "constelacao",
    corPrincipal: "oceano-600",
    emoji: "✨",
    status: "DISPONIVEL",
  },
  {
    slug: "relacionamento-toxico",
    nome: "Relacionamento Tóxico",
    descricaoCurta: "Vínculo que machuca mais do que cuida.",
    regiaoMapaSlug: "redemoinho",
    corPrincipal: "coral-500",
    emoji: "🌀",
    status: "EM_BREVE",
  },
  {
    slug: "procrastinacao",
    nome: "Procrastinação",
    descricaoCurta: "Tarefa cresce, energia some.",
    regiaoMapaSlug: "aguas-paradas",
    corPrincipal: "areia-400",
    emoji: "⏳",
    status: "EM_BREVE",
  },
  {
    slug: "trauma-infancia",
    nome: "Trauma de Infância",
    descricaoCurta: "Família disfuncional, passado que ainda governa.",
    regiaoMapaSlug: "profundezas",
    corPrincipal: "oceano-800",
    emoji: "🌑",
    status: "EM_BREVE",
  },
];
