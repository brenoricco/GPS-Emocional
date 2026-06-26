import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

/**
 * Append-only por design. Não exponha `update` ou `delete` neste repositório
 * exceto pra marcar `resolvidoEm` — eventos de segurança são auditáveis.
 */
export const eventoSegurancaRepository = {
  async registrar(dados: Prisma.EventoSegurancaUncheckedCreateInput) {
    return db.eventoSeguranca.create({ data: dados });
  },

  async marcarResolvido(id: string, observacoesCifradas?: string) {
    return db.eventoSeguranca.update({
      where: { id },
      data: {
        resolvidoEm: new Date(),
        ...(observacoesCifradas ? { observacoesCifradas } : {}),
      },
    });
  },

  async historicoPorUsuario(usuarioId: string) {
    return db.eventoSeguranca.findMany({
      where: { usuarioId },
      orderBy: { criadoEm: "desc" },
    });
  },
};
