import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

export const pontuacaoEscalaRepository = {
  async registrar(dados: Prisma.PontuacaoEscalaUncheckedCreateInput) {
    return db.pontuacaoEscala.create({ data: dados });
  },

  async historicoPorUsuario(
    usuarioId: string,
    escala?: Prisma.PontuacaoEscalaWhereInput["escala"],
  ) {
    return db.pontuacaoEscala.findMany({
      where: { usuarioId, ...(escala ? { escala } : {}) },
      orderBy: { aplicadaEm: "desc" },
    });
  },
};
