import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

export const perfilRepository = {
  async buscarPorUsuarioId(usuarioId: string) {
    return db.perfil.findUnique({
      where: { usuarioId },
      include: { temasInteresse: { include: { tema: true } } },
    });
  },

  async criarOuAtualizar(
    usuarioId: string,
    dados: Omit<Prisma.PerfilUncheckedCreateInput, "usuarioId">,
  ) {
    return db.perfil.upsert({
      where: { usuarioId },
      create: { ...dados, usuarioId },
      update: dados,
    });
  },

  async vincularTemas(perfilId: string, temaIds: string[]) {
    await db.perfilTema.deleteMany({ where: { perfilId } });
    if (temaIds.length === 0) return;
    await db.perfilTema.createMany({
      data: temaIds.map((temaId) => ({ perfilId, temaId })),
    });
  },
};
