import type { NivelRisco } from "@prisma/client";

/**
 * Catálogo de ferramentas de emergência emocional acessadas pelo botão FAB.
 *
 * Cada ferramenta é uma intervenção breve, validada clinicamente, pra estados
 * agudos. Acessíveis sem login (em produção, exigem sessão pra registrar uso).
 */

export type IdFerramenta =
  | "crise"
  | "respiracao-4-7-8"
  | "tecnica-stop"
  | "ancoragem-5-4-3-2-1";

export interface FerramentaEmergencia {
  id: IdFerramenta;
  rotuloCurto: string;
  rotuloLongo: string;
  descricao: string;
  emoji: string;
  duracaoMinutos: number;
  nivelRiscoAssociado: NivelRisco;
}

export const FERRAMENTAS_EMERGENCIA: FerramentaEmergencia[] = [
  {
    id: "crise",
    rotuloCurto: "Estou em crise",
    rotuloLongo: "Estou em crise ou pensando em me machucar",
    descricao:
      "Direciona pro CVV 188 imediatamente — atendimento humano, gratuito, 24h.",
    emoji: "🆘",
    duracaoMinutos: 0,
    nivelRiscoAssociado: "CRITICO",
  },
  {
    id: "respiracao-4-7-8",
    rotuloCurto: "Pânico ou ansiedade aguda",
    rotuloLongo: "Pânico ou ansiedade aguda",
    descricao:
      "Respiração 4-7-8 guiada por 2 minutos. Reduz ativação simpática.",
    emoji: "🌬️",
    duracaoMinutos: 3,
    nivelRiscoAssociado: "MEDIO",
  },
  {
    id: "tecnica-stop",
    rotuloCurto: "Gatilho emocional forte",
    rotuloLongo: "Gatilho emocional forte (raiva, traição)",
    descricao: "Pausa em 4 passos: S-T-O-P. Cria espaço entre estímulo e reação.",
    emoji: "✋",
    duracaoMinutos: 3,
    nivelRiscoAssociado: "MEDIO",
  },
  {
    id: "ancoragem-5-4-3-2-1",
    rotuloCurto: "Só preciso pausar um momento",
    rotuloLongo: "Só preciso pausar um momento",
    descricao:
      "Ancoragem dos cinco sentidos. Volta pro presente em menos de 4 minutos.",
    emoji: "🌿",
    duracaoMinutos: 4,
    nivelRiscoAssociado: "BAIXO",
  },
];

export function buscarFerramentaPorId(
  id: IdFerramenta,
): FerramentaEmergencia | undefined {
  return FERRAMENTAS_EMERGENCIA.find((f) => f.id === id);
}
