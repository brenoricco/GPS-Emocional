"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/autenticacao";
import { calcularGad7, type RespostaGad7 } from "@/lib/clinico/escalas/gad7";
import { db } from "@/lib/db";
import { cifrar } from "@/lib/seguranca/cifrador";
import { classificarRespostaTriagem } from "@/lib/seguranca/classificador-risco";

export interface DadosAcolhimento {
  // Passo 1 — consentimento já validado no client; chega como bools
  termosAceitos: boolean;
  consentimentoDadosSensiveis: boolean;
  // Passo 2-3
  temasRessoamSlugs: string[];
  temaPrincipalSlug: string;
  // Passo 4
  regioesCorporaisMarcadas: string[];
  // Passo 5
  respostasGad7: RespostaGad7[];
  // Passo 6
  respostaTriagemRisco: 0 | 1 | 2 | 3 | 4;
}

export interface ResultadoAcolhimento {
  ok: boolean;
  mensagem?: string;
  redirecionarPara?: string;
}

export async function concluirAcolhimento(
  dados: DadosAcolhimento,
): Promise<ResultadoAcolhimento> {
  const sessao = await auth();
  if (!sessao?.user?.id) {
    return { ok: false, mensagem: "Sessão expirou. Entre novamente." };
  }
  const usuarioId = sessao.user.id;

  // Validações mínimas (defesa em profundidade — client também valida)
  if (!dados.termosAceitos || !dados.consentimentoDadosSensiveis) {
    return {
      ok: false,
      mensagem: "É preciso aceitar os termos e o consentimento de dados sensíveis pra continuar.",
    };
  }
  if (dados.temasRessoamSlugs.length === 0 || !dados.temaPrincipalSlug) {
    return {
      ok: false,
      mensagem: "Escolha pelo menos um tema antes de avançar.",
    };
  }
  if (dados.respostasGad7.length !== 7) {
    return { ok: false, mensagem: "Responda todas as 7 perguntas da escala." };
  }

  const agora = new Date();

  // 1) Classifica risco imediato. Se CRÍTICO → grava evento e redireciona.
  const nivelRisco = classificarRespostaTriagem(dados.respostaTriagemRisco);
  const ehRiscoCritico = nivelRisco === "CRITICO";
  const ehRiscoAlto = nivelRisco === "ALTO";

  // 2) Calcula GAD-7
  const resultadoGad7 = calcularGad7(dados.respostasGad7);

  // 3) Resolve IDs dos temas pelos slugs
  const temas = await db.tema.findMany({
    where: { slug: { in: [...dados.temasRessoamSlugs, dados.temaPrincipalSlug] } },
    select: { id: true, slug: true },
  });
  const slugParaId = new Map(temas.map((t) => [t.slug, t.id]));
  const temaIdsRessoam = dados.temasRessoamSlugs
    .map((s) => slugParaId.get(s))
    .filter((id): id is string => Boolean(id));

  // 4) Cifra mapa corporal antes de salvar (LGPD Art. 11)
  const mapaCorporalCifrado = await cifrar(
    JSON.stringify({ regioes: dados.regioesCorporaisMarcadas }),
  );

  // 5) Persiste tudo numa transação
  await db.$transaction(async (tx) => {
    // Aceite no Usuario
    await tx.usuario.update({
      where: { id: usuarioId },
      data: {
        termosAceitos: true,
        termosAceitosEm: agora,
        consentimentoDadosSensiveis: true,
        consentimentoDadosSensiveisEm: agora,
      },
    });

    // Perfil + vínculo de temas
    const perfil = await tx.perfil.upsert({
      where: { usuarioId },
      create: {
        usuarioId,
        mapaCorporalCifrado,
      },
      update: { mapaCorporalCifrado },
    });
    await tx.perfilTema.deleteMany({ where: { perfilId: perfil.id } });
    if (temaIdsRessoam.length > 0) {
      await tx.perfilTema.createMany({
        data: temaIdsRessoam.map((temaId) => ({
          perfilId: perfil.id,
          temaId,
        })),
      });
    }

    // Inicia a trilha do tema principal
    const idTemaPrincipal = slugParaId.get(dados.temaPrincipalSlug);
    if (idTemaPrincipal) {
      await tx.trilhaUsuario.upsert({
        where: {
          usuarioId_temaId: { usuarioId, temaId: idTemaPrincipal },
        },
        create: { usuarioId, temaId: idTemaPrincipal },
        update: {},
      });
    }

    // GAD-7
    await tx.pontuacaoEscala.create({
      data: {
        usuarioId,
        escala: "GAD7",
        respostasJson: dados.respostasGad7 as unknown as object,
        pontuacao: resultadoGad7.pontuacao,
        faixaInterpretacao: resultadoGad7.faixa,
        aplicadaEm: agora,
      },
    });

    // Evento de segurança (sempre registra; nível BAIXO também — auditoria)
    if (nivelRisco !== "BAIXO") {
      await tx.eventoSeguranca.create({
        data: {
          usuarioId,
          origem: "EMERGENCIA",
          nivel: nivelRisco,
          palavrasChaveJson: {
            origem: "triagem-onboarding",
            valor: dados.respostaTriagemRisco,
          } as unknown as object,
          encaminhamentoFeito: ehRiscoCritico
            ? "CVV_188"
            : ehRiscoAlto
              ? "PLANO_SEGURANCA"
              : "NENHUM",
        },
      });
    }
  });

  revalidatePath("/painel");

  if (ehRiscoCritico) {
    redirect("/acolhimento/emergencia");
  }
  if (ehRiscoAlto) {
    redirect("/acolhimento/cuidado");
  }
  redirect("/painel");
}
