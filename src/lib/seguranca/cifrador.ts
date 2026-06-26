import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  scrypt,
} from "node:crypto";
import { promisify } from "node:util";

/**
 * Cifragem em camada de aplicação para dados sensíveis (LGPD Art. 11).
 *
 * Usada pra: conteúdo de diário, gatilhos, plano de segurança, anotações,
 * nome do psicólogo do usuário, mapa corporal.
 *
 * Algoritmo: AES-256-GCM (autenticado, resistente a manipulação).
 * Chave: derivada da env var CHAVE_CRIPTOGRAFIA_CONTEUDO.
 *   - Se a env for base64 de 32 bytes: usa direto.
 *   - Caso contrário: deriva via scrypt (mais lento mas tolerante).
 *
 * Formato armazenado: base64( IV(12) | TAG(16) | CIFRADO )
 *
 * ATENÇÃO: trocar a chave em produção inviabiliza decifrar dados existentes.
 * Rotação de chave requer estratégia de re-cifragem (não implementada aqui).
 */

const ALGORITMO = "aes-256-gcm";
const TAMANHO_IV = 12;
const TAMANHO_TAG = 16;
const TAMANHO_CHAVE = 32;
const SAL_DERIVACAO = "gps-emocional:v1";

const scryptAsync = promisify(scrypt);

let chaveCacheada: Buffer | null = null;

async function obterChave(): Promise<Buffer> {
  if (chaveCacheada) return chaveCacheada;

  const chaveBase = process.env.CHAVE_CRIPTOGRAFIA_CONTEUDO;
  if (!chaveBase) {
    throw new Error(
      "CHAVE_CRIPTOGRAFIA_CONTEUDO ausente no ambiente. " +
        "Sem ela, dados sensíveis não podem ser cifrados/decifrados.",
    );
  }

  const buf = Buffer.from(chaveBase, "base64");
  if (buf.length === TAMANHO_CHAVE) {
    chaveCacheada = buf;
    return chaveCacheada;
  }

  // Fallback: deriva via scrypt
  chaveCacheada = (await scryptAsync(
    chaveBase,
    SAL_DERIVACAO,
    TAMANHO_CHAVE,
  )) as Buffer;
  return chaveCacheada;
}

/**
 * Cifra um texto claro. Retorna string base64 segura pra gravar no banco.
 * String vazia entra, string vazia sai (sem desperdiçar bytes).
 */
export async function cifrar(textoClaro: string): Promise<string> {
  if (!textoClaro) return "";

  const chave = await obterChave();
  const iv = randomBytes(TAMANHO_IV);
  const cipher = createCipheriv(ALGORITMO, chave, iv);

  const cifradoBuffer = Buffer.concat([
    cipher.update(textoClaro, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, cifradoBuffer]).toString("base64");
}

/**
 * Decifra um texto previamente cifrado. Lança se o conteúdo foi adulterado
 * (GCM detecta manipulação via tag de autenticação).
 */
export async function decifrar(textoCifrado: string): Promise<string> {
  if (!textoCifrado) return "";

  const chave = await obterChave();
  const buf = Buffer.from(textoCifrado, "base64");

  if (buf.length < TAMANHO_IV + TAMANHO_TAG) {
    throw new Error("Conteúdo cifrado inválido ou corrompido.");
  }

  const iv = buf.subarray(0, TAMANHO_IV);
  const tag = buf.subarray(TAMANHO_IV, TAMANHO_IV + TAMANHO_TAG);
  const cifrado = buf.subarray(TAMANHO_IV + TAMANHO_TAG);

  const decipher = createDecipheriv(ALGORITMO, chave, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([
    decipher.update(cifrado),
    decipher.final(),
  ]).toString("utf8");
}

/**
 * Hash SHA-256 do texto claro. Determinístico — útil pra dedupe/diff
 * de entradas de diário sem precisar decifrar.
 *
 * NÃO usar pra senha (use bcrypt/argon2 quando necessário).
 */
export function gerarHashConteudo(textoClaro: string): string {
  return createHash("sha256").update(textoClaro, "utf8").digest("hex");
}
