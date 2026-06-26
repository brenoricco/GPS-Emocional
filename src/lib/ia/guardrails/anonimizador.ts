/**
 * Anonimização leve antes de enviar texto pra provedores externos.
 *
 * Pra LGPD Art. 11 (dados sensíveis de saúde) + transferência internacional
 * Groq (EUA), removemos PII antes da chamada. Substituições padrão:
 *
 *   - Emails           → [EMAIL]
 *   - Telefones BR     → [TELEFONE]
 *   - CPFs             → [CPF]
 *   - CEPs             → [CEP]
 *   - URLs             → [LINK]
 *   - Nomes próprios curtos (2-3 maiúsculas em sequência) → [NOME]
 *
 * Esta versão é heurística — pra V2 podemos plugar uma lib NER ou modelo
 * leve. A interface não muda.
 */

interface ResultadoAnonimizacao {
  textoAnonimizado: string;
  substituicoes: { tipo: string; quantidade: number }[];
}

const REGEX_EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const REGEX_TELEFONE_BR =
  /\b(?:\+?55\s?)?\(?\d{2}\)?\s?9?\d{4}-?\d{4}\b/g;
const REGEX_CPF = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;
const REGEX_CEP = /\b\d{5}-?\d{3}\b/g;
const REGEX_URL = /https?:\/\/\S+/gi;
// Sequência de palavras capitalizadas (2-3) — heurística simples pra nomes
const REGEX_NOMES = /\b([A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)(\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+){1,2}\b/g;

export function anonimizar(textoOriginal: string): ResultadoAnonimizacao {
  const substituicoes: ResultadoAnonimizacao["substituicoes"] = [];
  let texto = textoOriginal;

  const aplicar = (regex: RegExp, marcador: string, tipo: string) => {
    const matches = texto.match(regex);
    if (matches && matches.length > 0) {
      substituicoes.push({ tipo, quantidade: matches.length });
      texto = texto.replace(regex, marcador);
    }
  };

  aplicar(REGEX_EMAIL, "[EMAIL]", "email");
  aplicar(REGEX_TELEFONE_BR, "[TELEFONE]", "telefone");
  aplicar(REGEX_CPF, "[CPF]", "cpf");
  aplicar(REGEX_CEP, "[CEP]", "cep");
  aplicar(REGEX_URL, "[LINK]", "url");
  aplicar(REGEX_NOMES, "[NOME]", "nome");

  return { textoAnonimizado: texto, substituicoes };
}
