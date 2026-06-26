"use client";

import { useEffect, useState } from "react";

type Periodo = "madrugada" | "manha" | "tarde" | "noite" | "padrao";

interface Saudacao {
  titulo: string;
  acolhimento: string;
}

const SAUDACOES: Record<Periodo, Saudacao> = {
  madrugada: {
    titulo: "A noite tá longa.",
    acolhimento: "A gente fica aqui com você.",
  },
  manha: {
    titulo: "Bom dia, devagar.",
    acolhimento: "Você não precisa dar conta de tudo agora.",
  },
  tarde: {
    titulo: "Boa tarde. Respira.",
    acolhimento: "O dia ainda pode ser gentil com você.",
  },
  noite: {
    titulo: "Boa noite.",
    acolhimento: "Você fez o suficiente hoje.",
  },
  padrao: {
    titulo: "Você está aqui.",
    acolhimento: "Isso já é coragem.",
  },
};

function obterPeriodo(): Periodo {
  const hora = new Date().getHours();
  if (hora >= 0 && hora < 5) return "madrugada";
  if (hora >= 5 && hora < 12) return "manha";
  if (hora >= 12 && hora < 18) return "tarde";
  return "noite";
}

export function SaudacaoDinamica() {
  // Renderiza com saudação "padrao" no SSR e atualiza no client (sem flash visível,
  // troca após hidratação).
  const [periodo, setPeriodo] = useState<Periodo>("padrao");

  useEffect(() => {
    setPeriodo(obterPeriodo());
  }, []);

  const sau = SAUDACOES[periodo];

  return (
    <h1 className="text-3xl md:text-4xl font-light leading-relaxed text-oceano-800">
      {sau.titulo}
      <br />
      <span className="text-oceano-600">{sau.acolhimento}</span>
    </h1>
  );
}
