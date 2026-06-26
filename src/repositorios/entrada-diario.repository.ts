import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

export const entradaDiarioRepository = {
  async registrar(dados: Prisma.EntradaDiarioUncheckedCreateInput) {
    return db.entradaDiario.create({ data: dados });
  },

  async atualizarAnalise(
    id: string,
    analiseIaJson: object,
  ) {
    return db.entradaDiario.update({
      where: { id },
      data: {
        analiseIaJson: analiseIaJson as unknown as Prisma.InputJsonValue,
        analisadoEm: new Date(),
      },
    });
  },

  async listarDoUsuario(usuarioId: string, limite = 30) {
    return db.entradaDiario.findMany({
      where: { usuarioId },
      orderBy: { criadoEm: "desc" },
      take: limite,
    });
  },

  async buscarPorId(id: string, usuarioId: string) {
    return db.entradaDiario.findFirst({
      where: { id, usuarioId },
    });
  },
};
