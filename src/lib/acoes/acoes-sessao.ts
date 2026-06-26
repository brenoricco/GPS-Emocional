"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/autenticacao";
import { sessaoRepository } from "@/repositorios/sessao.repository";

export async function concluirSessao(
  sessaoId: string,
): Promise<{ ok: boolean }> {
  const sessao = await auth();
  if (!sessao?.user?.id) return { ok: false };

  await sessaoRepository.marcarConcluida(sessaoId, sessao.user.id);
  revalidatePath("/painel");
  return { ok: true };
}
