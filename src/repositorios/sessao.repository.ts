import { db } from "@/lib/db";

export const sessaoRepository = {
  async buscarPorTemaSlug(temaSlug: string) {
    return db.sessao.findFirst({
      where: { tema: { slug: temaSlug }, ativo: true },
      include: { tema: true },
      orderBy: { ordem: "asc" },
    });
  },

  async marcarConcluida(sessaoId: string, usuarioId: string) {
    return db.sessaoConcluida.upsert({
      where: { sessaoId_usuarioId: { sessaoId, usuarioId } },
      create: { sessaoId, usuarioId },
      update: { concluidaEm: new Date() },
    });
  },

  async listarConcluidas(usuarioId: string) {
    return db.sessaoConcluida.findMany({
      where: { usuarioId },
      orderBy: { concluidaEm: "desc" },
      include: { sessao: { include: { tema: true } } },
    });
  },
};
