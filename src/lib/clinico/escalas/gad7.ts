import type { FaixaInterpretacao } from "@prisma/client";

/**
 * GAD-7 — Generalized Anxiety Disorder 7-item scale (Spitzer et al., 2006).
 * Validação brasileira: Moreno et al. (2016).
 *
 * Aplicação no GPS Emocional: tom acolhedor mantendo as 7 perguntas validadas.
 * Não diagnóstica — orienta a personalização da trilha e o acompanhamento.
 *
 * Pontuação: cada item 0-3, total 0-21.
 * Faixas:
 *   0-4  → MINIMA
 *   5-9  → LEVE
 *  10-14 → MODERADA
 *  15-21 → GRAVE
 */

export interface OpcaoGad7 {
  rotulo: string;
  valor: 0 | 1 | 2 | 3;
}

export interface PerguntaGad7 {
  id: number;
  enunciado: string;
}

export const OPCOES_GAD7: OpcaoGad7[] = [
  { rotulo: "Nenhuma vez", valor: 0 },
  { rotulo: "Alguns dias", valor: 1 },
  { rotulo: "Mais da metade dos dias", valor: 2 },
  { rotulo: "Quase todos os dias", valor: 3 },
];

export const PERGUNTAS_GAD7: PerguntaGad7[] = [
  {
    id: 1,
    enunciado: "Sentiu-se nervoso(a), ansioso(a) ou no limite?",
  },
  {
    id: 2,
    enunciado: "Não conseguiu parar ou controlar as preocupações?",
  },
  {
    id: 3,
    enunciado: "Preocupou-se demais com diversas coisas?",
  },
  {
    id: 4,
    enunciado: "Teve dificuldade pra relaxar?",
  },
  {
    id: 5,
    enunciado: "Ficou tão inquieto(a) que era difícil ficar parado(a)?",
  },
  {
    id: 6,
    enunciado: "Ficou facilmente aborrecido(a) ou irritado(a)?",
  },
  {
    id: 7,
    enunciado: "Sentiu medo de que algo terrível pudesse acontecer?",
  },
];

export interface RespostaGad7 {
  questaoIndice: number;
  valor: 0 | 1 | 2 | 3;
}

export interface ResultadoGad7 {
  pontuacao: number;
  faixa: FaixaInterpretacao;
  rotuloFaixa: string;
}

export function calcularGad7(respostas: RespostaGad7[]): ResultadoGad7 {
  const pontuacao = respostas.reduce((soma, r) => soma + r.valor, 0);

  let faixa: FaixaInterpretacao;
  let rotuloFaixa: string;

  if (pontuacao <= 4) {
    faixa = "MINIMA";
    rotuloFaixa = "ansiedade mínima";
  } else if (pontuacao <= 9) {
    faixa = "LEVE";
    rotuloFaixa = "ansiedade leve";
  } else if (pontuacao <= 14) {
    faixa = "MODERADA";
    rotuloFaixa = "ansiedade moderada";
  } else {
    faixa = "GRAVE";
    rotuloFaixa = "ansiedade grave";
  }

  return { pontuacao, faixa, rotuloFaixa };
}
