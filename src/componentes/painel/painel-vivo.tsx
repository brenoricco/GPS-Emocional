"use client";

import { useState } from "react";

import { ModoDificil } from "@/componentes/painel/modo-dificil";

interface PropsPainelVivo {
  nome: string;
  ehModoDificil: boolean;
  children: React.ReactNode;
}

/**
 * Wrapper que decide entre Modo Difícil e Painel Normal.
 * Cliente porque o usuário pode escolher "ver painel completo" mesmo em dia ruim.
 */
export function PainelVivo({ nome, ehModoDificil, children }: PropsPainelVivo) {
  const [forcarPainelCompleto, setForcarPainelCompleto] = useState(false);

  if (ehModoDificil && !forcarPainelCompleto) {
    return (
      <ModoDificil
        nome={nome}
        aoSairDoModo={() => setForcarPainelCompleto(true)}
      />
    );
  }

  return <>{children}</>;
}
