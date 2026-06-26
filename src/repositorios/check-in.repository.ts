import type { Prisma, TipoCheckIn } from "@prisma/client";

import { db } from "@/lib/db";

export const checkInRepository = {
  async registrar(dados: Prisma.CheckInUncheckedCreateInput) {
    return db.checkIn.create({ data: dados });
  },

  async ultimoDoTipoHoje(usuarioId: string, tipo: TipoCheckIn) {
    const inicioDoDia = new Date();
    inicioDoDia.setHours(0, 0, 0, 0);
    return db.checkIn.findFirst({
      where: {
        usuarioId,
        tipo,
        criadoEm: { gte: inicioDoDia },
      },
      orderBy: { criadoEm: "desc" },
    });
  },

  async ultimosDoUsuario(usuarioId: string, limite = 30) {
    return db.checkIn.findMany({
      where: { usuarioId },
      orderBy: { criadoEm: "desc" },
      take: limite,
    });
  },
};
