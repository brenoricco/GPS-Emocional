"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { SeletorEnergia } from "@/componentes/check-in/seletor-energia";
import { SeletorHumor } from "@/componentes/check-in/seletor-humor";
import { registrarCheckIn } from "@/lib/acoes/acoes-check-in";

interface PropsFluxo {
  tipo: "MATINAL" | "NOTURNO";
  temaContextoId?: string;
  perguntaContextual?: string;
}

type Passo = "humor" | "energia" | "gatilhos" | "concluido";

export function FluxoCheckIn({
  tipo,
  temaContextoId,
  perguntaContextual,
}: PropsFluxo) {
  const router = useRouter();
  const [passo, setPasso] = useState<Passo>("humor");
  const [humor, setHumor] = useState(5);
  const [energia, setEnergia] = useState(5);
  const [gatilhosTexto, setGatilhosTexto] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [pendente, iniciarTransicao] = useTransition();

  const ehNoturno = tipo === "NOTURNO";

  function avancar() {
    setErro(null);
    if (passo === "humor") setPasso("energia");
    else if (passo === "energia") setPasso("gatilhos");
    else if (passo === "gatilhos") salvar();
  }

  function voltar() {
    setErro(null);
    if (passo === "energia") setPasso("humor");
    else if (passo === "gatilhos") setPasso("energia");
  }

  function salvar() {
    iniciarTransicao(async () => {
      const resultado = await registrarCheckIn({
        tipo,
        humor,
        energia,
        gatilhosTexto: gatilhosTexto.trim() || undefined,
        temaContextoId,
      });
      if (!resultado.ok) {
        setErro(resultado.mensagem ?? "Algo deu errado.");
        return;
      }
      setPasso("concluido");
    });
  }

  if (passo === "concluido") {
    return (
      <section className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-em-aparicao">
        <div
          className="w-20 h-20 rounded-full bg-brisa-200/70 flex items-center justify-center text-3xl"
          aria-hidden="true"
        >
          ✨
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-light text-oceano-800">
            {ehNoturno ? "Bom descanso." : "Anotado."}
          </h2>
          <p className="text-sm text-oceano-600 leading-relaxed max-w-xs">
            {ehNoturno
              ? "Você fechou o dia. Amanhã a gente continua."
              : "Seu check-in foi registrado. A trilha de hoje espera por você."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/painel")}
          className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors shadow-sm"
        >
          Voltar pro painel
        </button>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col">
      <div className="flex-1 animate-em-aparicao" key={passo}>
        {passo === "humor" && (
          <div className="space-y-6">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-oceano-400">
                {ehNoturno ? "Final do dia" : "Bom dia"}
              </p>
              <h2 className="text-2xl font-light text-oceano-800 leading-snug">
                {ehNoturno
                  ? "Como você está se sentindo agora?"
                  : "Como você está se sentindo hoje?"}
              </h2>
            </header>
            <SeletorHumor valor={humor} aoMudar={setHumor} />
          </div>
        )}

        {passo === "energia" && (
          <div className="space-y-6">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-oceano-400">
                Energia
              </p>
              <h2 className="text-2xl font-light text-oceano-800 leading-snug">
                E o quanto você tem de energia agora?
              </h2>
            </header>
            <SeletorEnergia valor={energia} aoMudar={setEnergia} />
          </div>
        )}

        {passo === "gatilhos" && (
          <div className="space-y-6">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-oceano-400">
                Opcional
              </p>
              <h2 className="text-2xl font-light text-oceano-800 leading-snug">
                {perguntaContextual ??
                  (ehNoturno
                    ? "Algo importante de hoje pra registrar?"
                    : "Tem algo te puxando pra baixo hoje?")}
              </h2>
              <p className="text-sm text-oceano-600 leading-relaxed">
                Pode deixar em branco. O que você escrever fica cifrado, só você
                lê.
              </p>
            </header>
            <textarea
              value={gatilhosTexto}
              onChange={(e) => setGatilhosTexto(e.target.value)}
              maxLength={2000}
              rows={5}
              placeholder="Escreva à vontade…"
              className="w-full p-4 rounded-2xl bg-white border border-oceano-200 text-oceano-900 placeholder:text-oceano-300 focus:border-brisa-400 focus:outline-none focus:ring-2 focus:ring-brisa-300/40 resize-none"
            />
            <p className="text-[11px] text-oceano-500 text-right">
              {gatilhosTexto.length} / 2000
            </p>
          </div>
        )}
      </div>

      {erro && (
        <p
          role="alert"
          className="mt-4 text-sm text-coral-600 bg-coral-400/10 px-4 py-3 rounded-xl"
        >
          {erro}
        </p>
      )}

      <footer className="pt-6 mt-6 border-t border-oceano-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={voltar}
          disabled={passo === "humor" || pendente}
          className="min-h-[48px] px-4 text-sm text-oceano-600 hover:text-oceano-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Voltar
        </button>
        <button
          type="button"
          onClick={avancar}
          disabled={pendente}
          className="min-h-[52px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          {pendente
            ? "Salvando..."
            : passo === "gatilhos"
              ? "Concluir"
              : "Próximo"}
        </button>
      </footer>
    </section>
  );
}
