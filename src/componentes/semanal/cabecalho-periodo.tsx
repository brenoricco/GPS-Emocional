import { formatarPeriodo, type PeriodoSemanal } from "@/lib/painel/semana";

interface PropsCabecalho {
  periodo: PeriodoSemanal;
}

export function CabecalhoPeriodo({ periodo }: PropsCabecalho) {
  return (
    <section className="space-y-2">
      <p className="text-xs uppercase tracking-wider text-brisa-600 font-medium">
        Sua semana
      </p>
      <h1 className="text-2xl font-light text-oceano-800 leading-snug">
        Olha o que a gente descobriu.
      </h1>
      <p className="text-xs text-oceano-500">{formatarPeriodo(periodo)}</p>
    </section>
  );
}
