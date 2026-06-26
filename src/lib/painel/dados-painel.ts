import { db } from "@/lib/db";

export interface PontoHumorSemana {
  data: Date;
  humor: number | null;
  energia: number | null;
}

export interface ProximoPasso {
  prioridade: "critica" | "alta" | "media" | "baixa";
  emoji: string;
  titulo: string;
  descricao: string;
  href: string;
  cta: string;
}

export interface DadosPainel {
  ehModoDificil: boolean;
  diasStreak: number;
  semana: PontoHumorSemana[]; // do mais antigo (índice 0) ao mais recente (6 = hoje)
  proximoPasso: ProximoPasso;
  ultimoCheckIn: { humor: number; energia: number; criadoEm: Date } | null;
  fezCheckInHoje: boolean;
  diasSemDiario: number | null;
}

function inicioDoDia(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function mesmoDia(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function diasEntre(maisRecente: Date, maisAntiga: Date): number {
  const msPorDia = 1000 * 60 * 60 * 24;
  return Math.floor(
    (inicioDoDia(maisRecente).getTime() -
      inicioDoDia(maisAntiga).getTime()) /
      msPorDia,
  );
}

export async function calcularDadosPainel(
  usuarioId: string,
  temaPrincipalSlug: string | null,
): Promise<DadosPainel> {
  const hoje = new Date();
  const seteDiasAtras = new Date(hoje);
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 6);
  seteDiasAtras.setHours(0, 0, 0, 0);

  const [checkInsRecentes, ultimoCheckInQualquer, ultimoDiario] =
    await Promise.all([
      db.checkIn.findMany({
        where: { usuarioId, criadoEm: { gte: seteDiasAtras } },
        orderBy: { criadoEm: "asc" },
      }),
      db.checkIn.findFirst({
        where: { usuarioId },
        orderBy: { criadoEm: "desc" },
      }),
      db.entradaDiario.findFirst({
        where: { usuarioId },
        orderBy: { criadoEm: "desc" },
        select: { criadoEm: true },
      }),
    ]);

  // Monta o array de 7 dias (do mais antigo ao mais recente).
  const semana: PontoHumorSemana[] = [];
  for (let i = 0; i < 7; i++) {
    const data = new Date(seteDiasAtras);
    data.setDate(data.getDate() + i);
    const checkInDoDia = checkInsRecentes.find((c) =>
      mesmoDia(c.criadoEm, data),
    );
    semana.push({
      data,
      humor: checkInDoDia?.humor ?? null,
      energia: checkInDoDia?.energia ?? null,
    });
  }

  // Streak: a partir de hoje, contando pra trás, quantos dias consecutivos
  // tiveram pelo menos 1 check-in.
  const todosCheckIns = await db.checkIn.findMany({
    where: { usuarioId },
    orderBy: { criadoEm: "desc" },
    select: { criadoEm: true },
  });
  const diasComCheckIn = new Set(
    todosCheckIns.map((c) => inicioDoDia(c.criadoEm).getTime()),
  );

  let diasStreak = 0;
  const cursor = inicioDoDia(hoje);
  while (diasComCheckIn.has(cursor.getTime())) {
    diasStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Já fez check-in hoje?
  const fezCheckInHoje = ultimoCheckInQualquer
    ? mesmoDia(ultimoCheckInQualquer.criadoEm, hoje)
    : false;

  // Modo difícil: último check-in foi hoje E humor ≤ 3.
  const ehModoDificil =
    ultimoCheckInQualquer !== null &&
    mesmoDia(ultimoCheckInQualquer.criadoEm, hoje) &&
    ultimoCheckInQualquer.humor <= 3;

  // Dias sem diário
  const diasSemDiario = ultimoDiario
    ? diasEntre(hoje, ultimoDiario.criadoEm)
    : null;

  // Decide o próximo passo prioritário
  const proximoPasso = decidirProximoPasso({
    fezCheckInHoje,
    diasSemDiario,
    temaPrincipalSlug,
  });

  return {
    ehModoDificil,
    diasStreak,
    semana,
    proximoPasso,
    ultimoCheckIn: ultimoCheckInQualquer
      ? {
          humor: ultimoCheckInQualquer.humor,
          energia: ultimoCheckInQualquer.energia,
          criadoEm: ultimoCheckInQualquer.criadoEm,
        }
      : null,
    fezCheckInHoje,
    diasSemDiario,
  };
}

interface ContextoProximoPasso {
  fezCheckInHoje: boolean;
  diasSemDiario: number | null;
  temaPrincipalSlug: string | null;
}

function decidirProximoPasso({
  fezCheckInHoje,
  diasSemDiario,
  temaPrincipalSlug,
}: ContextoProximoPasso): ProximoPasso {
  if (!fezCheckInHoje) {
    return {
      prioridade: "alta",
      emoji: "🌤️",
      titulo: "Como você está hoje?",
      descricao: "Um check-in de um minuto pra ancorar o dia.",
      href: "/check-in",
      cta: "Fazer check-in",
    };
  }

  if (diasSemDiario === null || diasSemDiario >= 3) {
    return {
      prioridade: "media",
      emoji: "📓",
      titulo: "Que tal escrever algo hoje?",
      descricao:
        diasSemDiario === null
          ? "Seu diário ainda está em branco. Pode ser uma frase."
          : `Faz ${diasSemDiario} dias desde sua última entrada.`,
      href: "/diario/novo",
      cta: "Abrir o diário",
    };
  }

  if (temaPrincipalSlug) {
    return {
      prioridade: "media",
      emoji: "🧭",
      titulo: "Continuar a trilha",
      descricao: "Um pequeno passo de cada vez. Sem pressa.",
      href: `/trilhas/${temaPrincipalSlug}`,
      cta: "Continuar",
    };
  }

  return {
    prioridade: "baixa",
    emoji: "🗺️",
    titulo: "Visitar seu mapa",
    descricao: "Veja onde você está agora.",
    href: "/mapa",
    cta: "Abrir mapa",
  };
}
