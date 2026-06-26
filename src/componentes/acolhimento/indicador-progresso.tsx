interface PropsIndicador {
  totalPassos: number;
  passoAtual: number;
}

export function IndicadorProgresso({ totalPassos, passoAtual }: PropsIndicador) {
  const porcentagem = Math.round(((passoAtual + 1) / totalPassos) * 100);
  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={passoAtual + 1}
      aria-valuemin={1}
      aria-valuemax={totalPassos}
      aria-label={`Passo ${passoAtual + 1} de ${totalPassos}`}
    >
      <div className="h-1 bg-oceano-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brisa-400 transition-all duration-500 ease-out"
          style={{ width: `${porcentagem}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] uppercase tracking-wider text-oceano-400 text-center">
        Passo {passoAtual + 1} de {totalPassos}
      </p>
    </div>
  );
}
