"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { gerarOuObterSintese } from "@/lib/acoes/acoes-semanal";

interface PropsBotao {
  rotulo: string;
}

export function BotaoGerarSintese({ rotulo }: PropsBotao) {
  const router = useRouter();
  const [pendente, iniciarTransicao] = useTransition();

  function aoClicar() {
    iniciarTransicao(async () => {
      await gerarOuObterSintese();
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={aoClicar}
      disabled={pendente}
      className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium shadow-sm active:scale-95 transition-transform duration-150 hover:bg-brisa-600 disabled:opacity-60"
    >
      {pendente ? "Lendo sua semana..." : rotulo}
    </button>
  );
}
