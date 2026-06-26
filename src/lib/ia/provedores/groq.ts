import type {
  MensagemIA,
  OpcoesCompletarIA,
  RespostaIA,
} from "@/lib/ia/tipos";

/**
 * Provider Groq Cloud (API compatível com OpenAI).
 * Usa fetch direto pra evitar dependência adicional.
 *
 * Variáveis de ambiente esperadas:
 *   - GROQ_API_KEY
 *   - IA_MODELO_PADRAO     (default: meta-llama/llama-4-scout-17b-16e-instruct)
 *   - IA_MODELO_ANALISE    (usado por chamadas que pedem análise profunda)
 */

const ENDPOINT_GROQ = "https://api.groq.com/openai/v1/chat/completions";

interface RespostaApiGroq {
  choices: {
    message: { role: string; content: string | null };
    finish_reason: string;
  }[];
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function completarComGroq(
  mensagens: MensagemIA[],
  opcoes: OpcoesCompletarIA = {},
): Promise<RespostaIA> {
  const chave = process.env.GROQ_API_KEY;
  if (!chave) {
    throw new Error(
      "GROQ_API_KEY ausente. Configure no .env pra usar a camada de IA.",
    );
  }

  const modelo =
    opcoes.modelo ??
    process.env.IA_MODELO_PADRAO ??
    "meta-llama/llama-4-scout-17b-16e-instruct";

  const corpoRequisicao: Record<string, unknown> = {
    model: modelo,
    messages: mensagens.map((m) => ({
      role: m.papel,
      content: m.conteudo,
    })),
    temperature: opcoes.temperatura ?? 0.6,
    max_tokens: opcoes.maxTokens ?? 1024,
  };

  if (opcoes.formatoResposta === "json") {
    corpoRequisicao.response_format = { type: "json_object" };
  }

  const inicio = Date.now();

  const resposta = await fetch(ENDPOINT_GROQ, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${chave}`,
    },
    body: JSON.stringify(corpoRequisicao),
  });

  const latenciaMs = Date.now() - inicio;

  if (!resposta.ok) {
    const corpoErro = await resposta.text().catch(() => "");
    throw new Error(
      `Groq retornou ${resposta.status}: ${corpoErro.slice(0, 300)}`,
    );
  }

  const dados = (await resposta.json()) as RespostaApiGroq;
  const conteudo = dados.choices[0]?.message?.content ?? "";

  return {
    conteudo,
    modelo: dados.model,
    tokensEntrada: dados.usage?.prompt_tokens ?? 0,
    tokensSaida: dados.usage?.completion_tokens ?? 0,
    latenciaMs,
  };
}
