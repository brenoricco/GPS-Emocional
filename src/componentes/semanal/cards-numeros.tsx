interface PropsCards {
  mediaHumor: number | null;
  mediaEnergia: number | null;
  tendenciaHumor: string;
  totalCheckIns: number;
  totalDiarios: number;
  diasStreak: number;
}

interface Card {
  label: string;
  valor: string;
  detalhe?: string;
}

function setaTendencia(tend: string): string {
  if (tend === "subindo") return "↗";
  if (tend === "descendo") return "↘";
  return "→";
}

export function CardsNumeros({
  mediaHumor,
  mediaEnergia,
  tendenciaHumor,
  totalCheckIns,
  totalDiarios,
  diasStreak,
}: PropsCards) {
  const cards: Card[] = [
    {
      label: "Humor médio",
      valor:
        mediaHumor !== null
          ? `${mediaHumor.toFixed(1)}`
          : "—",
      detalhe:
        mediaHumor !== null
          ? `${setaTendencia(tendenciaHumor)} ${tendenciaHumor}`
          : "sem dados",
    },
    {
      label: "Energia média",
      valor: mediaEnergia !== null ? `${mediaEnergia.toFixed(1)}` : "—",
      detalhe: mediaEnergia !== null ? "de 10" : "sem dados",
    },
    {
      label: "Check-ins",
      valor: String(totalCheckIns),
      detalhe: totalCheckIns === 1 ? "registro" : "registros",
    },
    {
      label: "Diários",
      valor: String(totalDiarios),
      detalhe: totalDiarios === 1 ? "entrada" : "entradas",
    },
    {
      label: "Constância",
      valor: String(diasStreak),
      detalhe: diasStreak === 1 ? "dia seguido" : "dias seguidos",
    },
  ];

  return (
    <ul className="grid grid-cols-2 gap-3">
      {cards.map((c) => (
        <li
          key={c.label}
          className="p-4 rounded-2xl bg-white border border-oceano-100"
        >
          <p className="text-[11px] uppercase tracking-wider text-oceano-400 mb-1">
            {c.label}
          </p>
          <p className="text-2xl font-light text-oceano-800">{c.valor}</p>
          {c.detalhe && (
            <p className="text-xs text-oceano-500 mt-1">{c.detalhe}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
