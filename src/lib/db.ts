import { PrismaClient } from "@prisma/client";

/**
 * Singleton do Prisma Client.
 *
 * Em dev, o hot-reload do Next.js cria múltiplas instâncias sem cache global —
 * o que esgota o pool de conexões do banco. Guardamos em globalThis pra reusar.
 *
 * Em produção, cada processo cria uma instância única (sem cache global).
 */
const globalParaPrisma = globalThis as unknown as {
  db?: PrismaClient;
};

export const db =
  globalParaPrisma.db ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.db = db;
}
