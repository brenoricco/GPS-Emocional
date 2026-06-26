"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/autenticacao";
import { db } from "@/lib/db";
import { cifrar } from "@/lib/seguranca/cifrador";
import { classificarRisco } from "@/lib/seguranca/classificador-risco";
import { checkInRepository } from "@/repositorios/check-in.repository";

export interface DadosCheckIn {
  tipo: "MATINAL" | "NOTURNO";
  humor: number;
  energia: number;
  gatilhosTexto?: string;
  temaContextoId?: string;
}

export interface ResultadoCheckIn {
  ok: boolean;
  mensagem?: string;
}

export async function registrarCheckIn(
  dados: DadosCheckIn,
): Promise<ResultadoCheckIn> {
  const sessao = await auth();
  if (!sessao?.user?.id) {
    return { ok: false, mensagem: "Sessão expirou. Entre novamente." };
  }
  const usuarioId = sessao.user.id;

  if (dados.humor < 1 || dados.humor > 10) {
    return { ok: false, mensagem: "Humor fora da escala." };
  }
  if (dados.energia < 1 || dados.energia > 10) {
    return { ok: false, mensagem: "Energia fora da escala." };
  }

  const textoGatilhos = dados.gatilhosTexto?.trim() ?? "";
  const temTexto = textoGatilhos.length > 0;

  // Detecta risco ANTES de salvar (camada local determinística)
  const resultadoRisco = temTexto
    ? classificarRisco(textoGatilhos)
    : { nivel: "BAIXO" as const, termosDetectados: [], scoreAproximado: 0 };

  // Cifra antes de gravar (LGPD Art. 11)
  const gatilhosCifrado = temTexto ? await cifrar(textoGatilhos) : null;

  await db.$transaction(async (tx) => {
    await tx.checkIn.create({
      data: {
        usuarioId,
        tipo: dados.tipo,
        humor: dados.humor,
        energia: dados.energia,
        gatilhosCifrado,
        temaContextoId: dados.temaContextoId ?? null,
      },
    });

    if (temTexto && resultadoRisco.nivel !== "BAIXO") {
      await tx.eventoSeguranca.create({
        data: {
          usuarioId,
          origem: "CHECKIN",
          nivel: resultadoRisco.nivel,
          palavrasChaveJson: {
            termos: resultadoRisco.termosDetectados,
            score: resultadoRisco.scoreAproximado,
          } as unknown as object,
          encaminhamentoFeito:
            resultadoRisco.nivel === "CRITICO"
              ? "CVV_188"
              : resultadoRisco.nivel === "ALTO"
                ? "PLANO_SEGURANCA"
                : "NENHUM",
        },
      });
    }
  });

  revalidatePath("/painel");
  revalidatePath("/check-in");

  if (resultadoRisco.nivel === "CRITICO") {
    redirect("/acolhimento/emergencia");
  }
  if (resultadoRisco.nivel === "ALTO") {
    redirect("/acolhimento/cuidado");
  }

  return { ok: true };
}

export async function jaFezCheckInHoje(
  tipo: "MATINAL" | "NOTURNO",
): Promise<boolean> {
  const sessao = await auth();
  if (!sessao?.user?.id) return false;
  const ultimo = await checkInRepository.ultimoDoTipoHoje(
    sessao.user.id,
    tipo,
  );
  return ultimo !== null;
}
