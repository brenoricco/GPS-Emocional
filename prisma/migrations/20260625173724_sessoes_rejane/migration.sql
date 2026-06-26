-- CreateTable
CREATE TABLE "sessoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "temaId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "textoAcolhimento" TEXT NOT NULL,
    "mecanicaInterativa" TEXT NOT NULL,
    "audioUrl" TEXT,
    "audioDuracaoSegundos" INTEGER,
    "roteiroAudioMarkdown" TEXT,
    "seloAncora" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 1,
    "requisitoPremium" BOOLEAN NOT NULL DEFAULT true,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "sessoes_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "temas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sessoes_concluidas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessaoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "concluidaEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reflexaoCifrada" TEXT,
    CONSTRAINT "sessoes_concluidas_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "sessoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sessoes_concluidas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_temas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "subtituloModulo" TEXT,
    "descricaoCurta" TEXT NOT NULL,
    "descricaoLonga" TEXT NOT NULL,
    "regiaoMapaSlug" TEXT NOT NULL,
    "corPrincipal" TEXT NOT NULL,
    "iconeSlug" TEXT NOT NULL,
    "ordemExibicao" INTEGER NOT NULL,
    "premium" BOOLEAN NOT NULL DEFAULT true,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'DISPONIVEL',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);
INSERT INTO "new_temas" ("ativo", "atualizadoEm", "corPrincipal", "criadoEm", "descricaoCurta", "descricaoLonga", "iconeSlug", "id", "nome", "ordemExibicao", "premium", "regiaoMapaSlug", "slug") SELECT "ativo", "atualizadoEm", "corPrincipal", "criadoEm", "descricaoCurta", "descricaoLonga", "iconeSlug", "id", "nome", "ordemExibicao", "premium", "regiaoMapaSlug", "slug" FROM "temas";
DROP TABLE "temas";
ALTER TABLE "new_temas" RENAME TO "temas";
CREATE UNIQUE INDEX "temas_slug_key" ON "temas"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "sessoes_temaId_slug_key" ON "sessoes"("temaId", "slug");

-- CreateIndex
CREATE INDEX "sessoes_concluidas_usuarioId_concluidaEm_idx" ON "sessoes_concluidas"("usuarioId", "concluidaEm");

-- CreateIndex
CREATE UNIQUE INDEX "sessoes_concluidas_sessaoId_usuarioId_key" ON "sessoes_concluidas"("sessaoId", "usuarioId");
