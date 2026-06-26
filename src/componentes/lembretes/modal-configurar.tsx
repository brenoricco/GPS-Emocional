"use client";

import { useEffect, useState } from "react";

import {
  carregarPreferencia,
  pedirPermissao,
  salvarPreferencia,
  suportaNotificacao,
  type PreferenciaLembrete,
} from "@/lib/lembretes/gerenciador";

interface PropsModal {
  aberto: boolean;
  aoFechar: () => void;
}

const HORAS_SUGERIDAS = [
  { valor: 8, rotulo: "Manhã (8h)" },
  { valor: 12, rotulo: "Meio-dia (12h)" },
  { valor: 18, rotulo: "Tarde (18h)" },
  { valor: 21, rotulo: "Noite (21h)" },
];

export function ModalConfigurarLembretes({ aberto, aoFechar }: PropsModal) {
  const [pref, setPref] = useState<PreferenciaLembrete>(carregarPreferencia);
  const [permissao, setPermissao] = useState<NotificationPermission | null>(
    null,
  );
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!aberto) return;
    setPref(carregarPreferencia());
    if (suportaNotificacao()) {
      setPermissao(Notification.permission);
    }
    const fechar = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
    };
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", fechar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", fechar);
    };
  }, [aberto, aoFechar]);

  async function ativar(hora: number) {
    setErro(null);
    if (!suportaNotificacao()) {
      setErro(
        "Seu navegador não suporta notificações. Tente outro ou ative em outro aparelho.",
      );
      return;
    }
    const resultado = await pedirPermissao();
    setPermissao(resultado);
    if (resultado !== "granted") {
      setErro(
        "Você não autorizou notificações. Pode tentar de novo nas configurações do navegador.",
      );
      return;
    }
    const nova: PreferenciaLembrete = {
      ativo: true,
      horaLocal: hora,
      ultimoDisparoIso: null,
    };
    salvarPreferencia(nova);
    setPref(nova);
    try {
      new Notification("Pronto.", {
        body: "Vou te lembrar perto desse horário, sem cobrança.",
        icon: "/icone-192.png",
      });
    } catch {
      /* silencioso */
    }
    setTimeout(aoFechar, 800);
  }

  function desativar() {
    const nova: PreferenciaLembrete = {
      ativo: false,
      horaLocal: pref.horaLocal,
      ultimoDisparoIso: null,
    };
    salvarPreferencia(nova);
    setPref(nova);
  }

  if (!aberto) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-oceano-900/60 backdrop-blur-sm animate-em-aparicao"
        onClick={aoFechar}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Configurar lembretes"
        className="fixed inset-x-0 bottom-0 z-50 bg-fundo-claro rounded-t-3xl shadow-2xl translate-y-0 transition-transform duration-300"
        style={{
          maxHeight: "92svh",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="pt-3 pb-2 flex justify-center" aria-hidden="true">
          <div className="w-12 h-1.5 rounded-full bg-oceano-200" />
        </div>
        <div className="px-5 pb-5 space-y-5">
          <header className="text-center space-y-2 pt-2">
            <h2 className="text-xl font-light text-oceano-800">
              {pref.ativo ? "Seus lembretes" : "Quer um lembrete gentil?"}
            </h2>
            <p className="text-xs text-oceano-600 leading-relaxed">
              {pref.ativo
                ? `Hoje você recebe uma mensagem perto das ${pref.horaLocal}h. Pode mudar quando quiser.`
                : "Sem cobrança, sem culpa. Só um cumprimento quando você abrir o app no horário."}
            </p>
          </header>

          {permissao === "denied" && (
            <div className="rounded-2xl bg-coral-400/10 border border-coral-400/30 p-4 text-xs text-coral-700 leading-relaxed">
              Você bloqueou notificações pra este site. Pra reativar, libere nas
              configurações do navegador.
            </div>
          )}

          <div className="space-y-2.5">
            {HORAS_SUGERIDAS.map((h) => {
              const ativo = pref.ativo && pref.horaLocal === h.valor;
              return (
                <button
                  key={h.valor}
                  type="button"
                  onClick={() => ativar(h.valor)}
                  className={`w-full min-h-[60px] p-4 rounded-2xl text-left transition-colors flex items-center gap-3 ${
                    ativo
                      ? "bg-brisa-50 border-2 border-brisa-400"
                      : "bg-white border border-oceano-200 hover:bg-oceano-50/40"
                  }`}
                >
                  <span className="text-xl shrink-0" aria-hidden="true">
                    🕰️
                  </span>
                  <span className="flex-1 text-sm font-medium text-oceano-800">
                    {h.rotulo}
                  </span>
                  {ativo && (
                    <span
                      className="text-brisa-600 text-lg"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {erro && (
            <p
              role="alert"
              className="text-xs text-coral-600 bg-coral-400/10 px-3 py-2 rounded-xl"
            >
              {erro}
            </p>
          )}

          <div className="flex flex-col gap-2 pt-2">
            {pref.ativo && (
              <button
                type="button"
                onClick={desativar}
                className="w-full min-h-[44px] text-sm text-oceano-600 hover:text-oceano-800 underline underline-offset-4"
              >
                Desativar lembretes
              </button>
            )}
            <button
              type="button"
              onClick={aoFechar}
              className="w-full min-h-[44px] text-sm text-oceano-500"
            >
              Fechar
            </button>
          </div>

          <p className="text-[11px] text-oceano-500 text-center leading-relaxed">
            Lembretes ficam no seu aparelho. Nada sai daqui.
          </p>
        </div>
      </div>
    </>
  );
}
