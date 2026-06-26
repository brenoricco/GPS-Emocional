import type { PontoHumorSemana } from "@/lib/painel/dados-painel";

interface PropsMicrografo {
  semana: PontoHumorSemana[];
}

const FORMATADOR_DIA = new Intl.DateTimeFormat("pt-BR", { weekday: "narrow" });

function corPorHumor(humor: number | null): string {
  if (humor === null) return "bg-oceano-100 border border-oceano-200";
  if (humor <= 3) return "bg-coral-500";
  if (humor <= 5) return "bg-areia-400";
  if (humor <= 7) return "bg-brisa-300";
  return "bg-brisa-500";
}

function tamanhoPorEnergia(energia: number | null): string {
  if (energia === null) return "w-6 h-6";
  if (energia <= 3) return "w-5 h-5";
  if (energia <= 6) return "w-7 h-7";
  return "w-9 h-9";
}

export function MicrografoHumor({ semana }: PropsMicrografo) {
  const hoje = new Date();
  const temAlgumRegistro = semana.some((p) => p.humor !== null);

  return (
    <section className="space-y-3" aria-label="Sua semana em humor e energia">
      <h2 className="text-xs uppercase tracking-wider text-oceano-400">
        Sua semana
      </h2>
      {temAlgumRegistro ? (
        <ul className="flex items-end justify-between h-12 gap-1">
          {semana.map((ponto) => {
            const ehHoje =
              ponto.data.toDateString() === hoje.toDateString();
            return (
              <li
                key={ponto.data.toISOString()}
                className="flex-1 flex flex-col items-center gap-1.5"
              >
                <span
                  className={`rounded-full ${corPorHumor(ponto.humor)} ${tamanhoPorEnergia(ponto.energia)} transition-all`}
                  aria-label={
                    ponto.humor !== null
                      ? `Humor ${ponto.humor} de 10`
                      : "Sem registro"
                  }
                />
                <span
                  className={`text-[10px] uppercase ${
                    ehHoje
                      ? "text-oceano-700 font-semibold"
                      : "text-oceano-400"
                  }`}
                >
                  {FORMATADOR_DIA.format(ponto.data)}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-xs text-oceano-500 leading-relaxed">
          Quando você fizer check-ins, eles aparecem aqui — um pequeno mapa
          da sua semana.
        </p>
      )}
    </section>
  );
}
