/**
 * Tipos compartilhados pela camada de IA (provider-agnostic).
 * Trocar de Groq pra Together/OpenAI/Claude no futuro mexe apenas no
 * arquivo de provedor; estes tipos permanecem.
 */

export type TipoOperacaoIA =
  | "ESPELHO_COGNITIVO"
  | "RESUMO_SEMANAL"
  | "PADRAO_DETECTADO"
  | "SUGESTAO_EXERCICIO";

export interface MensagemIA {
  papel: "system" | "user" | "assistant";
  conteudo: string;
}

export interface OpcoesCompletarIA {
  modelo?: string;
  temperatura?: number;
  maxTokens?: number;
  formatoResposta?: "texto" | "json";
}

export interface RespostaIA {
  conteudo: string;
  modelo: string;
  tokensEntrada: number;
  tokensSaida: number;
  latenciaMs: number;
}

export interface DistorcaoCognitiva {
  tipo: string;
  exemplo: string;
  reformulacao: string;
}

export interface EspelhoCognitivo {
  reflexao: string;
  distorcoes_cognitivas: DistorcaoCognitiva[];
  pergunta_reflexiva: string;
  convite_acao?: string;
  risco_detectado?: boolean;
  recomendacao_cvv?: boolean;
}
