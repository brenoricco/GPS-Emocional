import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

/**
 * Append-only. Toda chamada ao LLM gera uma linha auditável aqui.
 */
export const interacaoIaRepository = {
  async registrar(dados: Prisma.InteracaoIAUncheckedCreateInput) {
    return db.interacaoIA.create({ data: dados });
  },

  async historicoPorUsuario(usuarioId: string, limite = 50) {
    return db.interacaoIA.findMany({
      where: { usuarioId },
      orderBy: { criadoEm: "desc" },
      take: limite,
    });
  },
};
