"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { criarEntradaDiario } from "@/lib/acoes/acoes-diario";

const PROMPTS_SUGERIDOS = [
  "O que está mais pesado pra mim agora é…",
  "Hoje, no corpo, senti…",
  "Algo que me surpreendeu foi…",
  "Estou com vergonha de pensar que…",
  "Se eu pudesse dizer a verdade pra alguém, diria…",
];

export function FormularioEntrada() {
  const router = useRouter();
  const [conteudo, setConteudo] = useState("");
  const [promptSelecionado, setPromptSelecionado] = useState<string | null>(
    null,
  );
  const [pedirEspelho, setPedirEspelho] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [pendente, iniciarTransicao] = useTransition();

  function aoSelecionarPrompt(p: string) {
    setPromptSelecionado(p);
    if (conteudo.trim().length === 0) {
      setConteudo(p + " ");
    }
  }

  function aoSubmeter() {
    setErro(null);
    if (conteudo.trim().length < 4) {
      setErro("Escreva pelo menos algumas palavras.");
      return;
    }
    iniciarTransicao(async () => {
      try {
        const resultado = await criarEntradaDiario({
          conteudo,
          promptUsado: promptSelecionado ?? undefined,
          pedirEspelho,
        });
        if (!resultado.ok) {
          setErro(resultado.mensagem ?? "Algo deu errado.");
          return;
        }
        if (resultado.entradaId) {
          router.push(`/diario/${resultado.entradaId}`);
        } else {
          router.push("/diario");
        }
      } catch (e) {
        // redirect intencional do server (escalation) — propaga
        throw e;
      }
    });
  }

  return (
    <div className="space-y-5">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-wider text-oceano-400">
          Sugestões pra começar (opcional)
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory">
          {PROMPTS_SUGERIDOS.map((p) => {
            const ativo = promptSelecionado === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => aoSelecionarPrompt(p)}
                className={`shrink-0 snap-start min-h-[44px] px-4 py-2 rounded-full text-xs whitespace-nowrap transition-colors ${
                  ativo
                    ? "bg-brisa-500 text-white"
                    : "bg-white border border-oceano-200 text-oceano-700 hover:bg-oceano-50/40"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-2">
        <label
          htmlFor="conteudo"
          className="text-xs uppercase tracking-wider text-oceano-400 block"
        >
          Seu texto
        </label>
        <textarea
          id="conteudo"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          maxLength={8000}
          rows={12}
          placeholder="Escreva como quiser. Sem certo ou errado."
          className="w-full p-4 rounded-2xl bg-white border border-oceano-200 text-oceano-900 placeholder:text-oceano-300 focus:border-brisa-400 focus:outline-none focus:ring-2 focus:ring-brisa-300/40 resize-none text-base leading-relaxed"
          style={{ scrollMarginTop: "20vh" }}
        />
        <p className="text-[11px] text-oceano-500 text-right">
          {conteudo.length} / 8000 · cifrado antes de salvar
        </p>
      </section>

      <section className="rounded-2xl bg-white border border-oceano-200 p-4">
        <label className="flex items-start gap-3 cursor-pointer select-none min-h-[44px] py-1">
          <input
            type="checkbox"
            checked={pedirEspelho}
            onChange={(e) => setPedirEspelho(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-oceano-300 text-brisa-500 focus:ring-brisa-300/40"
          />
          <span className="space-y-1">
            <span className="block text-sm font-medium text-oceano-800">
              Pedir um espelho cognitivo
            </span>
            <span className="block text-xs text-oceano-600 leading-relaxed">
              Uma IA acolhedora reflete o que você escreveu, identifica
              distorções cognitivas e devolve uma pergunta pra você pensar.
              Texto é anonimizado antes do envio.
            </span>
          </span>
        </label>
      </section>

      {erro && (
        <p
          role="alert"
          className="text-sm text-coral-600 bg-coral-400/10 px-4 py-3 rounded-xl"
        >
          {erro}
        </p>
      )}

      <button
        type="button"
        onClick={aoSubmeter}
        disabled={pendente || conteudo.trim().length < 4}
        className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
      >
        {pendente
          ? pedirEspelho
            ? "Lendo seu texto..."
            : "Salvando..."
          : "Salvar entrada"}
      </button>
    </div>
  );
}
