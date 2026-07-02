/* eslint-disable no-console */

/**
 * Seed do GPS Emocional v2.
 *
 * MVP linear é totalmente anônimo. Nenhum conteúdo clínico persiste no banco:
 * ele vive em código (src/constantes/copy.ts) e roteiros (conteudo/roteiros/).
 *
 * Este seed existe apenas como scaffolding — quando adicionarmos criação de
 * conta pra persistir constância, criaremos aqui uma usuária de teste.
 */

async function main() {
  console.log("Seed vazio — MVP v2 é anônimo por design.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
