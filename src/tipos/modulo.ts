export type ModuloSlug =
  | "leveza-e-paz"
  | "cura-do-coracao"
  | "rompendo-ciclos"
  | "resgatando-cores"
  | "resgate-do-valor";

export type CorSentimento =
  | "orquidea"
  | "laranja"
  | "vermelho-suave"
  | "azul-ceu"
  | "amarelo-sol";

export interface Modulo {
  slug: ModuloSlug;
  numero: 1 | 2 | 3 | 4 | 5;
  titulo: string;
  frase: string;
  corBotao: CorSentimento;
  /** Classe Tailwind para fundo do botão do quiz. */
  classeFundo: string;
  /** Classe Tailwind para texto do botão do quiz (contraste WCAG AA sobre corBotao). */
  classeTexto: string;
  /** Descrição breve do exercício — usada como preview no cabeçalho. */
  descricaoExercicio: string;
}
