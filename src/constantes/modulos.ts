import type { Modulo, ModuloSlug } from "@/tipos/modulo";

/**
 * Os 5 módulos da jornada. Mapeamento do quiz (Tela 2) para o módulo destinado.
 * Ordem dos botões do quiz segue esta lista.
 */
export const MODULOS: readonly Modulo[] = [
  {
    slug: "leveza-e-paz",
    numero: 1,
    titulo: "Leveza e Paz",
    frase:
      "Estou muito irritada, cansada, ansiosa, indecisa, com medo de tudo, quero ficar sozinha.",
    corBotao: "orquidea",
    classeFundo: "bg-lavanda-claro hover:bg-lavanda-claro/90 active:bg-lavanda-claro/80",
    classeTexto: "text-noite",
    descricaoExercicio: "Balão da Calma — respiração guiada por toque",
  },
  {
    slug: "cura-do-coracao",
    numero: 2,
    titulo: "A Cura do Coração",
    frase:
      "Me sinto impotente, carente, um objeto descartável e tenho medo de ficar sozinha. Não sei dizer não e me preocupo muito com a opinião dos outros.",
    corBotao: "laranja",
    classeFundo: "bg-laranja-claro hover:bg-laranja-claro/90 active:bg-laranja-claro/80",
    classeTexto: "text-noite",
    descricaoExercicio: "Reconstruir os pilares do seu valor",
  },
  {
    slug: "rompendo-ciclos",
    numero: 3,
    titulo: "Rompendo Ciclos e Resgatando Minha Força",
    frase:
      "No relacionamento me sinto ameaçada, impotente, incapaz e sem esperança. Não posso falar, tenho medo da reação dele.",
    corBotao: "vermelho-suave",
    classeFundo: "bg-verde-claro hover:bg-verde-claro/90 active:bg-verde-claro/80",
    classeTexto: "text-noite",
    descricaoExercicio: "Cortar os fios das frases que te machucam",
  },
  {
    slug: "resgatando-cores",
    numero: 4,
    titulo: "Resgatando as Minhas Cores",
    frase:
      "Sinto um vazio profundo, tenho crises de choro, quero ficar sozinha, não tenho vontade de viver.",
    corBotao: "azul-ceu",
    classeFundo: "bg-azul-claro hover:bg-azul-claro/90 active:bg-azul-claro/80",
    classeTexto: "text-noite",
    descricaoExercicio: "Acender uma pequena luz — um micro-passo por vez",
  },
  {
    slug: "resgate-do-valor",
    numero: 5,
    titulo: "Resgate do Meu Valor",
    frase:
      "Sinto que não sou capaz, não mereço coisas boas, me sinto um fracasso.",
    corBotao: "amarelo-sol",
    classeFundo: "bg-amarelo-claro hover:bg-amarelo-claro/90 active:bg-amarelo-claro/80",
    classeTexto: "text-noite",
    descricaoExercicio: "Resgatar seus 3 pilares — Capacidade, Merecimento, Recomeço",
  },
] as const;

export const MODULOS_POR_SLUG = Object.fromEntries(
  MODULOS.map((m) => [m.slug, m]),
) as Record<ModuloSlug, Modulo>;

/** Módulos que exigem escalation reforçado (M4 = ideação suicida potencial). */
export const MODULOS_ALTO_RISCO: readonly ModuloSlug[] = [
  "resgatando-cores", // depressão
  "rompendo-ciclos", // relacionamento abusivo (também 180)
] as const;

export function ehModuloAltoRisco(slug: ModuloSlug): boolean {
  return MODULOS_ALTO_RISCO.includes(slug);
}
