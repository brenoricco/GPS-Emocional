"use server";

import { createHash } from "node:crypto";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/autenticacao";
import { db } from "@/lib/db";
import { ia } from "@/lib/ia/cliente";
import { anonimizar } from "@/lib/ia/guardrails/anonimizador";
import { filtrarSaida } from "@/lib/ia/guardrails/filtro-saida";
import { montarMensagensResumoSemanal } from "@/lib/ia/prompts/resumo-semanal";
import {
  calcularPeriodoUltimaSemana,
  calcularTendencia,
} from "@/lib/painel/semana";
import { decifrar } from "@/lib/seguranca/cifrador";
import { interacaoIaRepository } from "@/repositorios/interacao-ia.repository";
import { sinteseSemanalRepository } from "@/repositorios/sintese-semanal.repository";

const MODELO_ANALISE =
  process.env.IA_MODELO_ANALISE ?? "qwen/qwen3-32b";

const DIAS_FRESCURA = 3;

export interface AnaliseSemanalIA {
  destaque_da_semana: string;
  padroes_observados: string[];
  pequena_vitoria: string;
  ponto_de_cuidado: string;
  pergunta_para_proxima_semana: string;
  risco_detectado?: boolean;
}

export interface ResultadoSintese {
  ok: boolean;
  mensagem?: string;
}

function ehFresca(geradaEm: Date): boolean {
  const ms = Date.now() - geradaEm.getTime();
  return ms < DIAS_FRESCURA * 24 * 60 * 60 * 1000;
}

export async function gerarOuObterSintese(): Promise<ResultadoSintese> {
  const sessao = await auth();
  if (!sessao?.user?.id) {
    return { ok: false, mensagem: "Sessão expirou. Entre novamente." };
  }
  const usuarioId = sessao.user.id;

  // Se já tem síntese fresca, não regera
  const ultima = await sinteseSemanalRepository.ultimaDoUsuario(usuarioId);
  if (ultima && ehFresca(ultima.geradaEm)) {
    return { ok: true };
  }

  const periodo = calcularPeriodoUltimaSemana();

  const [checkIns, diarios] = await Promise.all([
    db.checkIn.findMany({
      where: {
        usuarioId,
        criadoEm: { gte: periodo.inicio, lte: periodo.fim },
      },
      orderBy: { criadoEm: "asc" },
    }),
    db.entradaDiario.findMany({
      where: {
        usuarioId,
        criadoEm: { gte: periodo.inicio, lte: periodo.fim },
      },
      orderBy: { criadoEm: "asc" },
    }),
  ]);

  const totalCheckIns = checkIns.length;
  const totalDiarios = diarios.length;

  const humores = checkIns.map((c) => c.humor);
  const energias = checkIns.map((c) => c.energia);

  const mediaHumor =
    humores.length > 0 ? humores.reduce((a, b) => a + b, 0) / humores.length : null;
  const mediaEnergia =
    energias.length > 0
      ? energias.reduce((a, b) => a + b, 0) / energias.length
      : null;

  const tendenciaHumor =
    humores.length >= 2 ? calcularTendencia(humores) : "estavel";

  // Calcula streak
  const todosCheckIns = await db.checkIn.findMany({
    where: { usuarioId },
    orderBy: { criadoEm: "desc" },
    select: { criadoEm: true },
  });
  const inicioDia = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x.getTime();
  };
  const diasComCheckIn = new Set(todosCheckIns.map((c) => inicioDia(c.criadoEm)));
  let diasStreak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (diasComCheckIn.has(cursor.getTime())) {
    diasStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Amostras anonimizadas do diário (max 3, decifradas e truncadas)
  const amostras: string[] = [];
  const amostrasOrigem = diarios.slice(0, 3);
  for (const d of amostrasOrigem) {
    try {
      const claro = await decifrar(d.conteudoCifrado);
      const truncado = claro.length > 500 ? claro.slice(0, 500) + "..." : claro;
      const { textoAnonimizado } = anonimizar(truncado);
      amostras.push(textoAnonimizado);
    } catch {
      // ignora amostra que não decifrou
    }
  }

  // Chama IA pra análise (best-effort — sem IA ainda salva dados agregados)
  let analiseIaJson: AnaliseSemanalIA | null = null;
  let filtradaPorRisco = false;
  let respostaIa = null;

  try {
    const mensagens = montarMensagensResumoSemanal({
      mediaHumor,
      mediaEnergia,
      tendenciaHumor,
      totalCheckIns,
      totalDiarios,
      diasStreak,
      amostrasDiarioAnonimizadas: amostras,
    });

    respostaIa = await ia.completar(mensagens, {
      modelo: MODELO_ANALISE,
      temperatura: 0.5,
      maxTokens: 600,
      formatoResposta: "json",
    });

    const filtro = filtrarSaida(respostaIa.conteudo);
    let conteudo = respostaIa.conteudo;

    if (!filtro.aprovado) {
      filtradaPorRisco = true;
      conteudo = JSON.stringify({
        destaque_da_semana: filtro.textoSeguro,
        padroes_observados: [],
        pequena_vitoria: "",
        ponto_de_cuidado:
          "Considere conversar com um psicólogo nas próximas semanas.",
        pergunta_para_proxima_semana: "Como você está agora?",
      });
    }

    try {
      analiseIaJson = JSON.parse(conteudo) as AnaliseSemanalIA;
    } catch {
      analiseIaJson = null;
    }
  } catch (erro) {
    console.error("[acoes-semanal] Falha na IA:", erro);
    // sem IA — segue com dados agregados sem análise
  }

  await sinteseSemanalRepository.criar({
    usuarioId,
    periodoInicio: periodo.inicio,
    periodoFim: periodo.fim,
    totalCheckIns,
    totalDiarios,
    mediaHumor,
    mediaEnergia,
    tendenciaHumor,
    diasStreak,
    analiseIaJson: analiseIaJson as unknown as object,
  });

  // Log auditoria IA (se houve chamada)
  if (respostaIa && analiseIaJson) {
    const promptHash = createHash("sha256")
      .update("resumo-semanal-v1")
      .digest("hex");
    await interacaoIaRepository.registrar({
      usuarioId,
      modelo: respostaIa.modelo,
      promptHash,
      entradaAnonimizadaJson: {
        tamanhoAmostras: amostras.reduce((s, a) => s + a.length, 0),
        qtdAmostras: amostras.length,
        periodo: {
          inicio: periodo.inicio.toISOString(),
          fim: periodo.fim.toISOString(),
        },
      } as unknown as object,
      respostaJson: analiseIaJson as unknown as object,
      latenciaMs: respostaIa.latenciaMs,
      tokensEntrada: respostaIa.tokensEntrada,
      tokensSaida: respostaIa.tokensSaida,
      custoEstimadoCentavos: 0,
      filtradaPorRisco,
      tipoOperacao: "RESUMO_SEMANAL",
    });
  }

  revalidatePath("/semanal");
  revalidatePath("/painel");

  return { ok: true };
}
