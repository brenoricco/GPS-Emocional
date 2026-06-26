/**
 * Helpers de intervalo de tempo pra recálculo semanal.
 *
 * "Semana" aqui é janela rolante de 7 dias (não semana de calendário) —
 * dá insight mais pessoal e funciona qualquer dia que o usuário abrir.
 */

export interface PeriodoSemanal {
  inicio: Date;
  fim: Date;
}

export function calcularPeriodoUltimaSemana(referencia: Date = new Date()): PeriodoSemanal {
  const fim = new Date(referencia);
  fim.setHours(23, 59, 59, 999);
  const inicio = new Date(fim);
  inicio.setDate(inicio.getDate() - 6);
  inicio.setHours(0, 0, 0, 0);
  return { inicio, fim };
}

export function calcularTendencia(
  valores: number[],
): "subindo" | "descendo" | "estavel" {
  if (valores.length < 2) return "estavel";
  const meio = Math.floor(valores.length / 2);
  const primeira = valores.slice(0, meio);
  const segunda = valores.slice(meio);

  const media = (xs: number[]) =>
    xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;

  const m1 = media(primeira);
  const m2 = media(segunda);
  const diff = m2 - m1;

  if (diff > 1) return "subindo";
  if (diff < -1) return "descendo";
  return "estavel";
}

export function formatarPeriodo(periodo: PeriodoSemanal): string {
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  });
  return `${fmt.format(periodo.inicio)} — ${fmt.format(periodo.fim)}`;
}
