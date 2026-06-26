/**
 * Filtro de saída do LLM.
 *
 * Garante que o conteúdo retornado pelo modelo respeita os limites clínicos
 * e éticos do GPS Emocional. Se detectar violação grave, substitui por
 * mensagem fallback acolhedora.
 *
 * Violações detectadas:
 *   - Diagnóstico ("você tem [transtorno]")
 *   - Recomendação de medicamento
 *   - Substituição de terapia
 *
 * Falsos positivos são preferíveis a falsos negativos.
 */

const PADRAO_DIAGNOSTICO =
  /\b(você (tem|sofre de|está com)|isso é)\s+(depressão|ansiedade generalizada|transtorno|toc|tdah|bipolar|esquizofrenia|borderline|narcisismo)\b/i;

const PADRAO_MEDICAMENTO =
  /\b(tome|tomar|usar|use|recomendo)\s+(fluoxetina|sertralina|escitalopram|paroxetina|venlafaxina|bupropiona|amitriptilina|clonazepam|alprazolam|diazepam|risperidona|olanzapina|lítio|antidepressivo|ansiolítico|benzodiazepínico)\b/i;

const PADRAO_SUBSTITUIR_TERAPIA =
  /\b(não precisa de (terapia|psicólogo|psiquiatra|médico)|terapia não é necessária|dispensa terapia)\b/i;

export interface ResultadoFiltro {
  aprovado: boolean;
  violacoes: string[];
  textoSeguro: string;
}

const FALLBACK_VIOLACAO = `Algo no que você compartilhou merece atenção mais cuidadosa do que eu consigo oferecer aqui. Considere conversar com um psicólogo de confiança. Se está em crise, o CVV — 188 atende 24 horas, gratuito e sigiloso.`;

export function filtrarSaida(texto: string): ResultadoFiltro {
  const violacoes: string[] = [];

  if (PADRAO_DIAGNOSTICO.test(texto)) violacoes.push("diagnostico");
  if (PADRAO_MEDICAMENTO.test(texto)) violacoes.push("medicamento");
  if (PADRAO_SUBSTITUIR_TERAPIA.test(texto)) violacoes.push("substituir-terapia");

  if (violacoes.length > 0) {
    return {
      aprovado: false,
      violacoes,
      textoSeguro: FALLBACK_VIOLACAO,
    };
  }

  return { aprovado: true, violacoes: [], textoSeguro: texto };
}
