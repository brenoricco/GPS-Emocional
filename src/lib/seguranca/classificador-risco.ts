import type { NivelRisco } from "@prisma/client";

/**
 * Classificador de risco LOCAL e DETERMINÍSTICO.
 *
 * Sempre roda ANTES de qualquer chamada ao LLM. Detecta sinais de ideação
 * suicida, autolesão e violência. Saída direciona escalation (CVV 188,
 * plano de segurança, contato de emergência).
 *
 * Versão MVP: regex + termos curados em PT-BR. Pode ser substituído por
 * modelo leve treinado sem mudar a interface pública.
 *
 * IMPORTANTE: este classificador NÃO substitui avaliação clínica. Em caso
 * de dúvida, escala. Falsos positivos são preferíveis a falsos negativos.
 */

export interface ResultadoClassificacaoRisco {
  nivel: NivelRisco;
  termosDetectados: string[];
  scoreAproximado: number;
}

const TERMOS_CRITICO = [
  "me matar",
  "me suicidar",
  "tirar minha vida",
  "acabar com tudo",
  "acabar comigo",
  "nao quero mais viver",
  "não quero mais viver",
  "queria morrer",
  "quero morrer",
  "vou me matar",
  "vou me jogar",
  "tomar tudo de uma vez",
  "sumir de vez",
  "desaparecer pra sempre",
];

const TERMOS_ALTO = [
  "me machucar",
  "me cortar",
  "me ferir",
  "autolesão",
  "autolesao",
  "melhor nao existir",
  "melhor não existir",
  "todo mundo melhor sem mim",
  "peso pros outros",
  "peso para os outros",
  "nao aguento mais",
  "não aguento mais",
];

const TERMOS_MEDIO = [
  "vontade de sumir",
  "sem esperanca",
  "sem esperança",
  "sem saida",
  "sem saída",
  "vazio total",
  "tudo sem sentido",
  "exausto demais",
  "exausta demais",
];

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function encontrarTermos(textoNormalizado: string, termos: string[]): string[] {
  const encontrados: string[] = [];
  for (const termo of termos) {
    const termoNorm = normalizar(termo);
    if (textoNormalizado.includes(termoNorm)) {
      encontrados.push(termo);
    }
  }
  return encontrados;
}

export function classificarRisco(texto: string): ResultadoClassificacaoRisco {
  if (!texto || texto.trim().length === 0) {
    return { nivel: "BAIXO", termosDetectados: [], scoreAproximado: 0 };
  }

  const normalizado = normalizar(texto);

  const criticos = encontrarTermos(normalizado, TERMOS_CRITICO);
  const altos = encontrarTermos(normalizado, TERMOS_ALTO);
  const medios = encontrarTermos(normalizado, TERMOS_MEDIO);

  const todos = [...criticos, ...altos, ...medios];

  if (criticos.length > 0) {
    return {
      nivel: "CRITICO",
      termosDetectados: todos,
      scoreAproximado: Math.min(1, 0.85 + criticos.length * 0.05),
    };
  }

  if (altos.length > 0) {
    return {
      nivel: "ALTO",
      termosDetectados: todos,
      scoreAproximado: Math.min(0.85, 0.6 + altos.length * 0.08),
    };
  }

  if (medios.length > 0) {
    return {
      nivel: "MEDIO",
      termosDetectados: todos,
      scoreAproximado: Math.min(0.6, 0.3 + medios.length * 0.08),
    };
  }

  return { nivel: "BAIXO", termosDetectados: [], scoreAproximado: 0 };
}

/**
 * Mapeia uma resposta de triagem direta sobre ideação (0-4) pra nível de risco.
 * Usada em multi-escolha do onboarding (sem texto livre).
 */
export function classificarRespostaTriagem(
  valor: 0 | 1 | 2 | 3 | 4,
): NivelRisco {
  // 0 = nunca, 1 = raramente, 2 = às vezes, 3 = frequentemente, 4 = todos os dias
  if (valor >= 3) return "CRITICO";
  if (valor === 2) return "ALTO";
  if (valor === 1) return "MEDIO";
  return "BAIXO";
}
