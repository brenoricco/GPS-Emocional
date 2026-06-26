import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

export const sinteseSemanalRepository = {
  async ultimaDoUsuario(usuarioId: string) {
    return db.sinteseSemanal.findFirst({
      where: { usuarioId },
      orderBy: { geradaEm: "desc" },
    });
  },

  async criar(dados: Prisma.SinteseSemanalUncheckedCreateInput) {
    return db.sinteseSemanal.create({ data: dados });
  },

  async historico(usuarioId: string, limite = 10) {
    return db.sinteseSemanal.findMany({
      where: { usuarioId },
      orderBy: { geradaEm: "desc" },
      take: limite,
    });
  },
};
