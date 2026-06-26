-- CreateTable
CREATE TABLE "sinteses_semanais" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "periodoInicio" DATETIME NOT NULL,
    "periodoFim" DATETIME NOT NULL,
    "totalCheckIns" INTEGER NOT NULL DEFAULT 0,
    "totalDiarios" INTEGER NOT NULL DEFAULT 0,
    "mediaHumor" REAL,
    "mediaEnergia" REAL,
    "tendenciaHumor" TEXT,
    "diasStreak" INTEGER NOT NULL DEFAULT 0,
    "analiseIaJson" JSONB,
    "geradaEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sinteses_semanais_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "sinteses_semanais_usuarioId_periodoInicio_idx" ON "sinteses_semanais"("usuarioId", "periodoInicio");
