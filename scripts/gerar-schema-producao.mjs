/**
 * Gera prisma/schema.production.prisma a partir de prisma/schema.prisma
 * trocando o provider de sqlite pra postgresql.
 *
 * Roda automaticamente no build de produção (Railway).
 * Localmente: `pnpm db:sincronizar-prod` antes de commitar mudanças
 * relevantes no schema.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const raizProjeto = resolve(__dirname, "..");

const origem = resolve(raizProjeto, "prisma", "schema.prisma");
const destino = resolve(raizProjeto, "prisma", "schema.production.prisma");

let conteudo = readFileSync(origem, "utf-8");

const linhasFinais = conteudo.replace(
  /provider\s*=\s*"sqlite"/,
  'provider = "postgresql"',
);

if (linhasFinais === conteudo) {
  console.warn(
    "⚠ Provider 'sqlite' não encontrado em schema.prisma. Schema de produção gerado mesmo assim.",
  );
}

const cabecalho = `// =============================================================================
// ARQUIVO GERADO AUTOMATICAMENTE — não edite manualmente.
// Origem: prisma/schema.prisma (provider sqlite)
// Aqui: provider postgresql pra deploy em Railway.
// Pra atualizar: edite schema.prisma e rode \`pnpm db:sincronizar-prod\`.
// =============================================================================

`;

writeFileSync(destino, cabecalho + linhasFinais, "utf-8");

console.log(`✓ Schema de produção gerado em prisma/schema.production.prisma`);
