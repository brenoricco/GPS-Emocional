interface PropsStreak {
  dias: number;
}

function frasePorStreak(dias: number): string {
  if (dias === 0) return "Hoje é um bom dia pra começar.";
  if (dias === 1) return "Primeiro dia cuidando de você.";
  if (dias === 2) return "2 dias seguidos. Sem cobrança, só presença.";
  if (dias < 7) return `${dias} dias cuidando de você.`;
  if (dias < 14) return `${dias} dias. Você tá fazendo bonito.`;
  if (dias < 30) return `${dias} dias. Isso é constância, não obrigação.`;
  return `${dias} dias. Você se escolheu repetidamente.`;
}

export function StreakAfetivo({ dias }: PropsStreak) {
  if (dias === 0) {
    return (
      <p className="text-sm text-oceano-600 leading-relaxed">
        {frasePorStreak(dias)}
      </p>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brisa-100 text-brisa-600 text-sm font-medium"
        aria-hidden="true"
      >
        ✦
      </span>
      <p className="text-sm text-oceano-700 leading-relaxed flex-1">
        {frasePorStreak(dias)}
      </p>
    </div>
  );
}
