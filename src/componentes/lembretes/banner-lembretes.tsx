"use client";

import { useEffect, useState } from "react";

import { ModalConfigurarLembretes } from "@/componentes/lembretes/modal-configurar";
import {
  carregarPreferencia,
  dispararLembreteSeApropriado,
  suportaNotificacao,
} from "@/lib/lembretes/gerenciador";

const CHAVE_DISPENSADO = "gps-emocional:banner-lembrete-dispensado";

export function BannerLembretes() {
  const [modalAberto, setModalAberto] = useState(false);
  const [estado, setEstado] = useState<
    "carregando" | "ativo" | "ocultar" | "convidar"
  >("carregando");

  useEffect(() => {
    if (!suportaNotificacao()) {
      setEstado("ocultar");
      return;
    }

    // Dispara o lembrete diário caso seja hora
    dispararLembreteSeApropriado();

    const pref = carregarPreferencia();
    if (pref.ativo) {
      setEstado("ativo");
      return;
    }

    const dispensadoEm = localStorage.getItem(CHAVE_DISPENSADO);
    if (dispensadoEm) {
      const dias =
        (Date.now() - Number(dispensadoEm)) / (1000 * 60 * 60 * 24);
      if (dias < 14) {
        setEstado("ocultar");
        return;
      }
    }

    setEstado("convidar");
  }, []);

  function dispensar() {
    setEstado("ocultar");
    localStorage.setItem(CHAVE_DISPENSADO, String(Date.now()));
  }

  if (estado === "carregando" || estado === "ocultar") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setModalAberto(true)}
        className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3 transition-colors ${
          estado === "ativo"
            ? "bg-brisa-50/60 border-brisa-200 hover:bg-brisa-50"
            : "bg-white border-oceano-200 hover:bg-oceano-50/40"
        }`}
      >
        <span
          className="w-10 h-10 rounded-xl bg-brisa-100 flex items-center justify-center text-xl shrink-0"
          aria-hidden="true"
        >
          {estado === "ativo" ? "🔔" : "💭"}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-oceano-800">
            {estado === "ativo"
              ? "Lembretes ativos"
              : "Quer um lembrete gentil?"}
          </p>
          <p className="text-xs text-oceano-600 leading-relaxed">
            {estado === "ativo"
              ? "Toque pra ajustar o horário"
              : "Sem cobrança. Pra você não esquecer de você."}
          </p>
        </div>
        {estado === "convidar" && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              dispensar();
            }}
            className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center text-oceano-400 hover:text-oceano-600 text-xl"
            role="button"
            aria-label="Dispensar"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                dispensar();
              }
            }}
          >
            ×
          </span>
        )}
      </button>

      <ModalConfigurarLembretes
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
      />
    </>
  );
}
