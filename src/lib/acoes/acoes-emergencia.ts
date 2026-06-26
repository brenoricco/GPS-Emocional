"use server";

import { auth } from "@/lib/autenticacao";
import { eventoSegurancaRepository } from "@/repositorios/evento-seguranca.repository";
import {
  buscarFerramentaPorId,
  type IdFerramenta,
} from "@/lib/seguranca/ferramentas-emergencia";

/**
 * Registra uso do botão de emergência.
 * Sempre cria EventoSeguranca (append-only, auditável).
 */
export async function registrarUsoEmergencia(
  ferramentaId: IdFerramenta,
): Promise<{ ok: boolean }> {
  const sessao = await auth();
  if (!sessao?.user?.id) {
    return { ok: false };
  }

  const ferramenta = buscarFerramentaPorId(ferramentaId);
  if (!ferramenta) return { ok: false };

  await eventoSegurancaRepository.registrar({
    usuarioId: sessao.user.id,
    origem: "EMERGENCIA",
    nivel: ferramenta.nivelRiscoAssociado,
    palavrasChaveJson: {
      origem: "botao-emergencia",
      ferramenta: ferramenta.id,
    } as unknown as object,
    encaminhamentoFeito:
      ferramenta.id === "crise" ? "CVV_188" : "NENHUM",
  });

  return { ok: true };
}
