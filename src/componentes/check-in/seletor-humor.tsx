"use client";

interface PropsSeletor {
  valor: number;
  aoMudar: (valor: number) => void;
}

const NIVEIS = [
  { valor: 1, emoji: "😞", rotulo: "Muito ruim" },
  { valor: 2, emoji: "😟", rotulo: "Ruim" },
  { valor: 3, emoji: "😕", rotulo: "" },
  { valor: 4, emoji: "😐", rotulo: "" },
  { valor: 5, emoji: "🙂", rotulo: "" },
  { valor: 6, emoji: "🙂", rotulo: "" },
  { valor: 7, emoji: "😊", rotulo: "" },
  { valor: 8, emoji: "😊", rotulo: "" },
  { valor: 9, emoji: "😄", rotulo: "Muito bom" },
  { valor: 10, emoji: "🤩", rotulo: "Ótimo" },
];

export function SeletorHumor({ valor, aoMudar }: PropsSeletor) {
  const nivelAtual = NIVEIS.find((n) => n.valor === valor) ?? NIVEIS[4]!;
  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <span className="text-6xl block" aria-hidden="true">
          {nivelAtual.emoji}
        </span>
        <p className="text-sm text-oceano-600">
          {valor} de 10
          {nivelAtual.rotulo ? ` · ${nivelAtual.rotulo}` : ""}
        </p>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        aria-label="Seu humor agora, de 1 a 10"
        className="w-full h-12 accent-brisa-500 cursor-pointer touch-pan-x"
      />
      <div className="flex justify-between text-[11px] text-oceano-500 px-1">
        <span>Muito ruim</span>
        <span>Ótimo</span>
      </div>
    </div>
  );
}
