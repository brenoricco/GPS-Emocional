import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PASTA_SAIDA = join(__dirname, "..", "public", "audio", "respiracao");

const VOZ = "pt-BR-FranciscaNeural";

const FRASES = [
  { nome: "vamos-comecar", texto: "Vamos começar." },
  { nome: "inspire", texto: "Inspire pelo nariz." },
  { nome: "segure", texto: "Segure." },
  { nome: "expire", texto: "Expire pela boca." },
  { nome: "pronto", texto: "Pronto. Você fez isso." },
];

async function gerar() {
  await mkdir(PASTA_SAIDA, { recursive: true });

  const tts = new MsEdgeTTS();
  await tts.setMetadata(
    VOZ,
    OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3,
  );

  for (const { nome, texto } of FRASES) {
    const { audioStream } = await tts.toStream(texto);
    const chunks = [];
    for await (const chunk of audioStream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    const caminho = join(PASTA_SAIDA, `${nome}.mp3`);
    await writeFile(caminho, buffer);
    console.log(`  ${nome}.mp3 -> ${(buffer.length / 1024).toFixed(1)} KB`);
  }

  tts.close();
  console.log(`\nPronto. ${FRASES.length} áudios em ${PASTA_SAIDA}`);
}

gerar().catch((erro) => {
  console.error("Falhou:", erro);
  process.exit(1);
});
