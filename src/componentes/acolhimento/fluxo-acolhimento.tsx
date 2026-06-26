"use client";

import { useMemo, useState, useTransition } from "react";

import { IndicadorProgresso } from "@/componentes/acolhimento/indicador-progresso";
import { PassoConsentimento } from "@/componentes/acolhimento/passos/passo-consentimento";
import { PassoEscalaGad7 } from "@/componentes/acolhimento/passos/passo-escala-gad7";
import { PassoMapaCorporal } from "@/componentes/acolhimento/passos/passo-mapa-corporal";
import { PassoTemaPrincipal } from "@/componentes/acolhimento/passos/passo-tema-principal";
import { PassoTemasRessoam } from "@/componentes/acolhimento/passos/passo-temas-ressoam";
import { PassoTriagemRisco } from "@/componentes/acolhimento/passos/passo-triagem-risco";
import {
  concluirAcolhimento,
  type DadosAcolhimento,
} from "@/lib/acoes/acoes-acolhimento";
import { PERGUNTAS_GAD7, type RespostaGad7 } from "@/lib/clinico/escalas/gad7";

const MAX_TEMAS_RESSOAM = 3;
const TOTAL_PASSOS = 6;

type EstadoFluxo = {
  termosAceitos: boolean;
  consentimentoDadosSensiveis: boolean;
  temasRessoamSlugs: string[];
  temaPrincipalSlug: string;
  regioesCorporaisMarcadas: string[];
  respostasGad7: RespostaGad7[];
  respostaTriagemRisco: 0 | 1 | 2 | 3 | 4 | null;
};

const ESTADO_INICIAL: EstadoFluxo = {
  termosAceitos: false,
  consentimentoDadosSensiveis: false,
  temasRessoamSlugs: [],
  temaPrincipalSlug: "",
  regioesCorporaisMarcadas: [],
  respostasGad7: [],
  respostaTriagemRisco: null,
};

export function FluxoAcolhimento() {
  const [passo, setPasso] = useState(0);
  const [estado, setEstado] = useState<EstadoFluxo>(ESTADO_INICIAL);
  const [erro, setErro] = useState<string | null>(null);
  const [pendente, iniciarTransicao] = useTransition();

  const podeAvancar = useMemo(() => {
    switch (passo) {
      case 0:
        return estado.termosAceitos && estado.consentimentoDadosSensiveis;
      case 1:
        return estado.temasRessoamSlugs.length > 0;
      case 2:
        return Boolean(estado.temaPrincipalSlug);
      case 3:
        return estado.regioesCorporaisMarcadas.length > 0;
      case 4:
        return estado.respostasGad7.length === PERGUNTAS_GAD7.length;
      case 5:
        return estado.respostaTriagemRisco !== null;
      default:
        return false;
    }
  }, [passo, estado]);

  function alternarTemaRessoam(slug: string) {
    setEstado((s) => {
      if (s.temasRessoamSlugs.includes(slug)) {
        const novos = s.temasRessoamSlugs.filter((x) => x !== slug);
        return {
          ...s,
          temasRessoamSlugs: novos,
          temaPrincipalSlug:
            s.temaPrincipalSlug === slug ? "" : s.temaPrincipalSlug,
        };
      }
      if (s.temasRessoamSlugs.length >= MAX_TEMAS_RESSOAM) return s;
      return { ...s, temasRessoamSlugs: [...s.temasRessoamSlugs, slug] };
    });
  }

  function alternarRegiaoCorporal(id: string) {
    setEstado((s) => ({
      ...s,
      regioesCorporaisMarcadas: s.regioesCorporaisMarcadas.includes(id)
        ? s.regioesCorporaisMarcadas.filter((x) => x !== id)
        : [...s.regioesCorporaisMarcadas, id],
    }));
  }

  function responderGad7(questaoIndice: number, valor: 0 | 1 | 2 | 3) {
    setEstado((s) => {
      const outros = s.respostasGad7.filter(
        (r) => r.questaoIndice !== questaoIndice,
      );
      return {
        ...s,
        respostasGad7: [...outros, { questaoIndice, valor }].sort(
          (a, b) => a.questaoIndice - b.questaoIndice,
        ),
      };
    });
  }

  function aoConcluir() {
    if (estado.respostaTriagemRisco === null) return;

    const dados: DadosAcolhimento = {
      termosAceitos: estado.termosAceitos,
      consentimentoDadosSensiveis: estado.consentimentoDadosSensiveis,
      temasRessoamSlugs: estado.temasRessoamSlugs,
      temaPrincipalSlug: estado.temaPrincipalSlug,
      regioesCorporaisMarcadas: estado.regioesCorporaisMarcadas,
      respostasGad7: estado.respostasGad7,
      respostaTriagemRisco: estado.respostaTriagemRisco,
    };

    iniciarTransicao(async () => {
      try {
        const resultado = await concluirAcolhimento(dados);
        if (!resultado.ok && resultado.mensagem) {
          setErro(resultado.mensagem);
        }
      } catch (e) {
        // Auth.js/Next redirect lança intencionalmente — não tratamos aqui
        throw e;
      }
    });
  }

  function avancar() {
    setErro(null);
    if (passo === TOTAL_PASSOS - 1) {
      aoConcluir();
      return;
    }
    setPasso((p) => Math.min(p + 1, TOTAL_PASSOS - 1));
  }

  function voltar() {
    setErro(null);
    setPasso((p) => Math.max(p - 1, 0));
  }

  return (
    <div className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <header className="space-y-4 mb-8">
        <IndicadorProgresso totalPassos={TOTAL_PASSOS} passoAtual={passo} />
      </header>

      <section
        className="flex-1 animate-em-aparicao"
        key={passo}
        aria-live="polite"
      >
        {passo === 0 && (
          <PassoConsentimento
            termosAceitos={estado.termosAceitos}
            consentimentoDadosSensiveis={estado.consentimentoDadosSensiveis}
            aoMudarTermos={(v) =>
              setEstado((s) => ({ ...s, termosAceitos: v }))
            }
            aoMudarConsentimento={(v) =>
              setEstado((s) => ({ ...s, consentimentoDadosSensiveis: v }))
            }
          />
        )}
        {passo === 1 && (
          <PassoTemasRessoam
            selecionados={estado.temasRessoamSlugs}
            aoAlternar={alternarTemaRessoam}
            maximo={MAX_TEMAS_RESSOAM}
          />
        )}
        {passo === 2 && (
          <PassoTemaPrincipal
            slugsCandidatos={estado.temasRessoamSlugs}
            slugSelecionado={estado.temaPrincipalSlug}
            aoSelecionar={(slug) =>
              setEstado((s) => ({ ...s, temaPrincipalSlug: slug }))
            }
          />
        )}
        {passo === 3 && (
          <PassoMapaCorporal
            regioesMarcadas={estado.regioesCorporaisMarcadas}
            aoAlternar={alternarRegiaoCorporal}
          />
        )}
        {passo === 4 && (
          <PassoEscalaGad7
            respostas={estado.respostasGad7}
            aoResponder={responderGad7}
          />
        )}
        {passo === 5 && (
          <PassoTriagemRisco
            resposta={estado.respostaTriagemRisco}
            aoResponder={(v) =>
              setEstado((s) => ({ ...s, respostaTriagemRisco: v }))
            }
          />
        )}
      </section>

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
          disabled={passo === 0 || pendente}
          className="min-h-[48px] px-4 text-sm text-oceano-600 hover:text-oceano-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Voltar
        </button>
        <button
          type="button"
          onClick={avancar}
          disabled={!podeAvancar || pendente}
          className="min-h-[52px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          {pendente
            ? "Salvando..."
            : passo === TOTAL_PASSOS - 1
              ? "Concluir"
              : "Próximo"}
        </button>
      </footer>
    </div>
  );
}
