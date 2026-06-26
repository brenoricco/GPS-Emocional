"use server";

import { createHash } from "node:crypto";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/autenticacao";
import { ia } from "@/lib/ia/cliente";
import { anonimizar } from "@/lib/ia/guardrails/anonimizador";
import { filtrarSaida } from "@/lib/ia/guardrails/filtro-saida";
import { montarMensagensEspelho } from "@/lib/ia/prompts/espelho-cognitivo";
import type { EspelhoCognitivo } from "@/lib/ia/tipos";
import { cifrar, gerarHashConteudo } from "@/lib/seguranca/cifrador";
import { classificarRisco } from "@/lib/seguranca/classificador-risco";
import { db } from "@/lib/db";
import { entradaDiarioRepository } from "@/repositorios/entrada-diario.repository";
import { interacaoIaRepository } from "@/repositorios/interacao-ia.repository";

const MODELO_ANALISE =
  process.env.IA_MODELO_ANALISE ?? "qwen/qwen3-32b";

export interface DadosNovaEntrada {
  conteudo: string;
  promptUsado?: string;
  pedirEspelho: boolean;
}

export interface ResultadoNovaEntrada {
  ok: boolean;
  entradaId?: string;
  mensagem?: string;
}

export async function criarEntradaDiario(
  dados: DadosNovaEntrada,
): Promise<ResultadoNovaEntrada> {
  const sessao = await auth();
  if (!sessao?.user?.id) {
    return { ok: false, mensagem: "Sessão expirou. Entre novamente." };
  }
  const usuarioId = sessao.user.id;

  const conteudo = dados.conteudo.trim();
  if (conteudo.length < 4) {
    return { ok: false, mensagem: "Escreva pelo menos algumas palavras." };
  }
  if (conteudo.length > 8000) {
    return { ok: false, mensagem: "Texto muito longo. Máximo 8000 caracteres." };
  }

  // CAMADA 1 — Classificador de risco LOCAL determinístico.
  // Roda ANTES de qualquer chamada ao LLM.
  const resultadoRisco = classificarRisco(conteudo);
  const ehCritico = resultadoRisco.nivel === "CRITICO";
  const ehAlto = resultadoRisco.nivel === "ALTO";

  const conteudoCifrado = await cifrar(conteudo);
  const hashConteudo = gerarHashConteudo(conteudo);

  // Persistência inicial
  const entrada = await db.$transaction(async (tx) => {
    const nova = await tx.entradaDiario.create({
      data: {
        usuarioId,
        promptUsado: dados.promptUsado ?? null,
        conteudoCifrado,
        tamanhoCaracteres: conteudo.length,
        hashConteudo,
      },
    });

    if (resultadoRisco.nivel !== "BAIXO") {
      await tx.eventoSeguranca.create({
        data: {
          usuarioId,
          origem: "DIARIO",
          nivel: resultadoRisco.nivel,
          palavrasChaveJson: {
            termos: resultadoRisco.termosDetectados,
            score: resultadoRisco.scoreAproximado,
          } as unknown as object,
          encaminhamentoFeito:
            ehCritico
              ? "CVV_188"
              : ehAlto
                ? "PLANO_SEGURANCA"
                : "NENHUM",
        },
      });
    }

    return nova;
  });

  revalidatePath("/diario");

  // Se risco crítico: NÃO chama LLM. Escalation direta.
  if (ehCritico) {
    redirect("/acolhimento/emergencia");
  }

  // Se usuário não pediu espelho: retorna OK.
  if (!dados.pedirEspelho) {
    if (ehAlto) redirect("/acolhimento/cuidado");
    return { ok: true, entradaId: entrada.id };
  }

  // CAMADA 2 — LLM com guardrails.
  try {
    const espelho = await gerarEspelhoCognitivo(
      conteudo,
      entrada.id,
      usuarioId,
    );
    await entradaDiarioRepository.atualizarAnalise(
      entrada.id,
      espelho as unknown as object,
    );
  } catch (erro) {
    // Falha do LLM não pode bloquear o usuário — entrada já está salva.
    console.error("[acoes-diario] Falha na geração de espelho:", erro);
  }

  revalidatePath("/diario");
  revalidatePath(`/diario/${entrada.id}`);

  if (ehAlto) redirect("/acolhimento/cuidado");

  return { ok: true, entradaId: entrada.id };
}

async function gerarEspelhoCognitivo(
  conteudoOriginal: string,
  entradaId: string,
  usuarioId: string,
): Promise<EspelhoCognitivo> {
  // Anonimizar antes do envio
  const { textoAnonimizado, substituicoes } = anonimizar(conteudoOriginal);
  const mensagens = montarMensagensEspelho(textoAnonimizado);

  const resposta = await ia.completar(mensagens, {
    modelo: MODELO_ANALISE,
    temperatura: 0.55,
    maxTokens: 800,
    formatoResposta: "json",
  });

  // Log auditável (LGPD): registramos hash do prompt e entrada anonimizada
  const promptHash = createHash("sha256")
    .update(mensagens.map((m) => m.papel + ":" + m.conteudo).join("|"))
    .digest("hex");

  // Tentativa de parse + filtro de saída
  let conteudoFiltrado = resposta.conteudo;
  const filtro = filtrarSaida(resposta.conteudo);
  let filtradaPorRisco = false;

  if (!filtro.aprovado) {
    filtradaPorRisco = true;
    conteudoFiltrado = JSON.stringify({
      reflexao: filtro.textoSeguro,
      distorcoes_cognitivas: [],
      pergunta_reflexiva: "Como você está agora?",
      risco_detectado: true,
      recomendacao_cvv: true,
    } satisfies EspelhoCognitivo);
  }

  let espelho: EspelhoCognitivo;
  try {
    espelho = JSON.parse(conteudoFiltrado) as EspelhoCognitivo;
  } catch {
    espelho = {
      reflexao:
        "Algo no que você escreveu merece uma escuta atenta. Considere conversar com um psicólogo de confiança nas próximas semanas.",
      distorcoes_cognitivas: [],
      pergunta_reflexiva: "Como você está agora?",
    };
  }

  // Registro de auditoria (sem texto original — só metadados)
  await interacaoIaRepository.registrar({
    usuarioId,
    modelo: resposta.modelo,
    promptHash,
    entradaAnonimizadaJson: {
      tamanho: textoAnonimizado.length,
      substituicoes,
      entradaId,
    } as unknown as object,
    respostaJson: espelho as unknown as object,
    latenciaMs: resposta.latenciaMs,
    tokensEntrada: resposta.tokensEntrada,
    tokensSaida: resposta.tokensSaida,
    custoEstimadoCentavos: 0, // Groq free-tier
    filtradaPorRisco,
    tipoOperacao: "ESPELHO_COGNITIVO",
  });

  return espelho;
}
