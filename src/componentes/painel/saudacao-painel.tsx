"use client";

import { useEffect, useState } from "react";

type Periodo = "madrugada" | "manha" | "tarde" | "noite" | "padrao";

interface Saudacao {
  cumprimento: string;
  pergunta: string;
}

const SAUDACOES: Record<Periodo, Saudacao> = {
  madrugada: {
    cumprimento: "Tá tarde",
    pergunta: "Vamos respirar juntos?",
  },
  manha: {
    cumprimento: "Bom dia",
    pergunta: "Como você quer começar?",
  },
  tarde: {
    cumprimento: "Boa tarde",
    pergunta: "Como está sendo o dia?",
  },
  noite: {
    cumprimento: "Boa noite",
    pergunta: "Como foi o dia?",
  },
  padrao: {
    cumprimento: "Olá",
    pergunta: "Como você está?",
  },
};

function obterPeriodo(): Periodo {
  const hora = new Date().getHours();
  if (hora >= 0 && hora < 5) return "madrugada";
  if (hora >= 5 && hora < 12) return "manha";
  if (hora >= 12 && hora < 18) return "tarde";
  return "noite";
}

interface PropsSaudacao {
  nome: string;
}

export function SaudacaoPainel({ nome }: PropsSaudacao) {
  const [periodo, setPeriodo] = useState<Periodo>("padrao");

  useEffect(() => {
    setPeriodo(obterPeriodo());
  }, []);

  const sau = SAUDACOES[periodo];

  return (
    <div className="space-y-2">
      <p className="text-sm text-oceano-500">
        {sau.cumprimento}, <strong className="text-oceano-700 font-medium">{nome}</strong>.
      </p>
      <h1 className="text-2xl font-light text-oceano-800 leading-snug">
        {sau.pergunta}
      </h1>
    </div>
  );
}
