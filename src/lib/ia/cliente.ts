import { completarComGroq } from "@/lib/ia/provedores/groq";
import type {
  MensagemIA,
  OpcoesCompletarIA,
  RespostaIA,
} from "@/lib/ia/tipos";

/**
 * Interface única da camada de IA do GPS Emocional.
 *
 * Toda chamada a LLM passa por aqui. Trocar de Groq pra outro provedor
 * mexe apenas neste arquivo + provedores/*. Os consumidores não mudam.
 */
export const ia = {
  async completar(
    mensagens: MensagemIA[],
    opcoes: OpcoesCompletarIA = {},
  ): Promise<RespostaIA> {
    // Hoje só Groq. Quando habilitar fallback Together/OpenRouter,
    // este é o lugar de roteamento (try/catch encadeado).
    return completarComGroq(mensagens, opcoes);
  },
};
