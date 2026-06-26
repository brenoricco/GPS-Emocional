-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nomeExibicao" TEXT,
    "imagemUrl" TEXT,
    "emailVerificadoEm" DATETIME,
    "termosAceitos" BOOLEAN NOT NULL DEFAULT false,
    "termosAceitosEm" DATETIME,
    "consentimentoDadosSensiveis" BOOLEAN NOT NULL DEFAULT false,
    "consentimentoDadosSensiveisEm" DATETIME,
    "dataExclusaoSolicitada" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "perfis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "dataNascimento" DATETIME,
    "generoIdentificado" TEXT,
    "emTerapiaAtual" BOOLEAN NOT NULL DEFAULT false,
    "nomePsicologoCifrado" TEXT,
    "mapaCorporalCifrado" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "perfis_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "perfis_temas" (
    "perfilId" TEXT NOT NULL,
    "temaId" TEXT NOT NULL,

    PRIMARY KEY ("perfilId", "temaId"),
    CONSTRAINT "perfis_temas_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "perfis" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "perfis_temas_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "temas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assinaturas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "plano" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "iniciouEm" DATETIME NOT NULL,
    "periodoAtualFim" DATETIME,
    "pagoEm" DATETIME,
    "canceladaEm" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "assinaturas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "eventos_stripe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assinaturaId" TEXT,
    "tipo" TEXT NOT NULL,
    "payloadJson" JSONB NOT NULL,
    "processadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "eventos_stripe_assinaturaId_fkey" FOREIGN KEY ("assinaturaId") REFERENCES "assinaturas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "temas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricaoCurta" TEXT NOT NULL,
    "descricaoLonga" TEXT NOT NULL,
    "regiaoMapaSlug" TEXT NOT NULL,
    "corPrincipal" TEXT NOT NULL,
    "iconeSlug" TEXT NOT NULL,
    "ordemExibicao" INTEGER NOT NULL,
    "premium" BOOLEAN NOT NULL DEFAULT true,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "exercicios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "temaId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "corpoMdx" TEXT NOT NULL,
    "duracaoMinutos" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,
    "requisitoPremium" BOOLEAN NOT NULL DEFAULT true,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "exercicios_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "temas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "humor" INTEGER NOT NULL,
    "energia" INTEGER NOT NULL,
    "gatilhosCifrado" TEXT,
    "sentidoNoCorpo" JSONB,
    "temaContextoId" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "check_ins_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "entradas_diario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "promptUsado" TEXT,
    "conteudoCifrado" TEXT NOT NULL,
    "tamanhoCaracteres" INTEGER NOT NULL,
    "hashConteudo" TEXT NOT NULL,
    "analiseIaJson" JSONB,
    "analisadoEm" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "entradas_diario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "trilhas_usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "temaId" TEXT NOT NULL,
    "iniciadaEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "concluidaEm" DATETIME,
    "etapaAtual" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "trilhas_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "trilhas_usuario_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "temas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "exercicios_concluidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trilhaUsuarioId" TEXT NOT NULL,
    "exercicioId" TEXT NOT NULL,
    "concluidoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anotacaoCifrada" TEXT,
    "reflexaoJson" JSONB,
    CONSTRAINT "exercicios_concluidos_trilhaUsuarioId_fkey" FOREIGN KEY ("trilhaUsuarioId") REFERENCES "trilhas_usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "exercicios_concluidos_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "exercicios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pontuacoes_escalas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "escala" TEXT NOT NULL,
    "respostasJson" JSONB NOT NULL,
    "pontuacao" INTEGER NOT NULL,
    "faixaInterpretacao" TEXT NOT NULL,
    "aplicadaEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pontuacoes_escalas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "eventos_seguranca" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "palavrasChaveJson" JSONB NOT NULL,
    "encaminhamentoFeito" TEXT NOT NULL,
    "resolvidoEm" DATETIME,
    "observacoesCifradas" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "eventos_seguranca_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "planos_seguranca" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "sinaisAlertaCifrado" TEXT NOT NULL,
    "estrategiasCifrado" TEXT NOT NULL,
    "redeApoioCifrado" TEXT NOT NULL,
    "contatosEmergenciaCifrado" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "planos_seguranca_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "interacoes_ia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "promptHash" TEXT NOT NULL,
    "entradaAnonimizadaJson" JSONB NOT NULL,
    "respostaJson" JSONB NOT NULL,
    "latenciaMs" INTEGER NOT NULL,
    "tokensEntrada" INTEGER NOT NULL,
    "tokensSaida" INTEGER NOT NULL,
    "custoEstimadoCentavos" INTEGER NOT NULL DEFAULT 0,
    "filtradaPorRisco" BOOLEAN NOT NULL DEFAULT false,
    "tipoOperacao" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "interacoes_ia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "perfis_usuarioId_key" ON "perfis"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "assinaturas_usuarioId_key" ON "assinaturas"("usuarioId");

-- CreateIndex
CREATE INDEX "assinaturas_stripeCustomerId_idx" ON "assinaturas"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "assinaturas_stripeSubscriptionId_idx" ON "assinaturas"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "eventos_stripe_tipo_idx" ON "eventos_stripe"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "temas_slug_key" ON "temas"("slug");

-- CreateIndex
CREATE INDEX "exercicios_temaId_ordem_idx" ON "exercicios"("temaId", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "exercicios_temaId_slug_key" ON "exercicios"("temaId", "slug");

-- CreateIndex
CREATE INDEX "check_ins_usuarioId_criadoEm_idx" ON "check_ins"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "entradas_diario_usuarioId_criadoEm_idx" ON "entradas_diario"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "entradas_diario_hashConteudo_idx" ON "entradas_diario"("hashConteudo");

-- CreateIndex
CREATE UNIQUE INDEX "trilhas_usuario_usuarioId_temaId_key" ON "trilhas_usuario"("usuarioId", "temaId");

-- CreateIndex
CREATE UNIQUE INDEX "exercicios_concluidos_trilhaUsuarioId_exercicioId_key" ON "exercicios_concluidos"("trilhaUsuarioId", "exercicioId");

-- CreateIndex
CREATE INDEX "pontuacoes_escalas_usuarioId_escala_aplicadaEm_idx" ON "pontuacoes_escalas"("usuarioId", "escala", "aplicadaEm");

-- CreateIndex
CREATE INDEX "eventos_seguranca_usuarioId_criadoEm_idx" ON "eventos_seguranca"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "eventos_seguranca_nivel_criadoEm_idx" ON "eventos_seguranca"("nivel", "criadoEm");

-- CreateIndex
CREATE INDEX "planos_seguranca_usuarioId_criadoEm_idx" ON "planos_seguranca"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "interacoes_ia_usuarioId_criadoEm_idx" ON "interacoes_ia"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "interacoes_ia_tipoOperacao_criadoEm_idx" ON "interacoes_ia"("tipoOperacao", "criadoEm");
