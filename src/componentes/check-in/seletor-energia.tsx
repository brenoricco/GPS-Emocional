"use client";

interface PropsSeletor {
  valor: number;
  aoMudar: (valor: number) => void;
}

export function SeletorEnergia({ valor, aoMudar }: PropsSeletor) {
  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div
          className="mx-auto w-full max-w-[200px] h-3 rounded-full bg-oceano-100 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="h-full bg-gradient-to-r from-brisa-300 to-brisa-500 transition-[width] duration-300"
            style={{ width: `${(valor / 10) * 100}%` }}
          />
        </div>
        <p className="text-sm text-oceano-600">{valor} de 10</p>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        aria-label="Sua energia agora, de 1 a 10"
        className="w-full h-12 accent-brisa-500 cursor-pointer touch-pan-x"
      />
      <div className="flex justify-between text-[11px] text-oceano-500 px-1">
        <span>Esgotado</span>
        <span>Energizado</span>
      </div>
    </div>
  );
}
