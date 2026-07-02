/**
 * Números de emergência — SEMPRE 188 para saúde mental.
 * Os docs originais da Rejane mencionaram "181" (erro grave — PRF).
 * Aqui é a fonte de verdade: nunca renderize telefone hardcoded fora deste arquivo.
 */

export const CVV = {
  numero: "188",
  labelTelefone: "188",
  labelBotao: "Ligar para o CVV — 188",
  descricao:
    "Centro de Valorização da Vida — apoio emocional gratuito, 24 horas, com total sigilo.",
  tel: "tel:188",
} as const;

/** Central de Atendimento à Mulher — usar SOMENTE no Módulo 3 (relacionamento abusivo). */
export const CENTRAL_MULHER = {
  numero: "180",
  labelTelefone: "180",
  labelBotao: "Ligar para o 180 — Central da Mulher",
  descricao:
    "Central de Atendimento à Mulher — denúncia de violência doméstica, 24 horas, gratuito.",
  tel: "tel:180",
} as const;
