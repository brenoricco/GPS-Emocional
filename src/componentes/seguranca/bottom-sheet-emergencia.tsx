"use client";

import { useEffect, useRef, useState } from "react";

import { AncoragemSentidos } from "@/componentes/seguranca/ancoragem-sentidos";
import { RespiracaoGuiada } from "@/componentes/seguranca/respiracao-guiada";
import { TecnicaStop } from "@/componentes/seguranca/tecnica-stop";
import { registrarUsoEmergencia } from "@/lib/acoes/acoes-emergencia";
import {
  FERRAMENTAS_EMERGENCIA,
  type IdFerramenta,
} from "@/lib/seguranca/ferramentas-emergencia";

interface PropsSheet {
  aberto: boolean;
  aoFechar: () => void;
}

type TelaInterna = "menu" | IdFerramenta;

export function BottomSheetEmergencia({ aberto, aoFechar }: PropsSheet) {
  const [tela, setTela] = useState<TelaInterna>("menu");
  const refSheet = useRef<HTMLDivElement>(null);

  // Lock do scroll do body + ESC fecha
  useEffect(() => {
    if (!aberto) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const aoApertarTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    document.addEventListener("keydown", aoApertarTecla);

    // foca o primeiro elemento interativo após abrir
    setTimeout(() => {
      const primeiro = refSheet.current?.querySelector<HTMLElement>(
        "button, a, [tabindex]:not([tabindex='-1'])",
      );
      primeiro?.focus();
    }, 100);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", aoApertarTecla);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto]);

  // Quando fecha, volta pro menu pra próxima abertura
  useEffect(() => {
    if (!aberto) {
      const t = setTimeout(() => setTela("menu"), 300);
      return () => clearTimeout(t);
    }
  }, [aberto]);

  function fechar() {
    aoFechar();
  }

  async function escolherFerramenta(id: IdFerramenta) {
    // dispara registro server-side em background — falha silenciosa
    registrarUsoEmergencia(id).catch(() => undefined);

    if (id === "crise") {
      // CVV imediato — não atrasa
      window.location.assign("tel:188");
      return;
    }
    setTela(id);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-oceano-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          aberto ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={fechar}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={refSheet}
        role="dialog"
        aria-modal="true"
        aria-label="Emergência emocional"
        className={`fixed inset-x-0 bottom-0 z-50 bg-fundo-claro rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          aberto ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          maxHeight: "92svh",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        {/* Alça visual */}
        <div className="pt-3 pb-2 flex justify-center" aria-hidden="true">
          <div className="w-12 h-1.5 rounded-full bg-oceano-200" />
        </div>

        <div className="px-5 pb-5 overflow-y-auto" style={{ maxHeight: "calc(92svh - 28px)" }}>
          {tela === "menu" && (
            <div className="space-y-5">
              <header className="text-center space-y-2 pt-2">
                <h2 className="text-xl font-light text-oceano-800">
                  Como você está agora?
                </h2>
                <p className="text-xs text-oceano-600">
                  Escolha o que mais ressoa. Estamos aqui.
                </p>
              </header>

              <ul className="space-y-2.5">
                {FERRAMENTAS_EMERGENCIA.map((ferramenta) => {
                  const ehCrise = ferramenta.id === "crise";
                  return (
                    <li key={ferramenta.id}>
                      <button
                        type="button"
                        onClick={() => escolherFerramenta(ferramenta.id)}
                        className={`w-full min-h-[72px] p-4 rounded-2xl text-left transition-colors flex items-start gap-3 ${
                          ehCrise
                            ? "bg-coral-500 text-white hover:bg-coral-600"
                            : "bg-white border border-oceano-200 hover:bg-oceano-50/40 text-oceano-800"
                        }`}
                      >
                        <span className="text-2xl shrink-0" aria-hidden="true">
                          {ferramenta.emoji}
                        </span>
                        <span className="flex-1 space-y-1">
                          <span
                            className={`block font-medium text-sm ${
                              ehCrise ? "text-white" : "text-oceano-800"
                            }`}
                          >
                            {ferramenta.rotuloLongo}
                          </span>
                          <span
                            className={`block text-xs leading-snug ${
                              ehCrise ? "text-white/90" : "text-oceano-600"
                            }`}
                          >
                            {ferramenta.descricao}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={fechar}
                className="w-full min-h-[48px] mt-2 px-4 text-sm text-oceano-600 hover:text-oceano-800 transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}

          {tela === "respiracao-4-7-8" && (
            <div className="min-h-[60svh] flex flex-col py-4">
              <RespiracaoGuiada aoFinalizar={() => setTela("menu")} />
            </div>
          )}
          {tela === "tecnica-stop" && (
            <div className="min-h-[60svh] flex flex-col py-4">
              <TecnicaStop aoFinalizar={() => setTela("menu")} />
            </div>
          )}
          {tela === "ancoragem-5-4-3-2-1" && (
            <div className="min-h-[60svh] flex flex-col py-4">
              <AncoragemSentidos aoFinalizar={() => setTela("menu")} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
