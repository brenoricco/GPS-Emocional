"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { useTranscricaoVoz } from "@/hooks/usar-transcricao-voz";
import { vibrar } from "@/lib/haptics";
import {
  formatarDataDesabafo,
  listarDesabafos,
  removerDesabafo,
  salvarDesabafo,
  type Desabafo,
} from "@/lib/desabafos";
import { cn } from "@/lib/utils";

export function PaginaDesabafos() {
  const [desabafos, setDesabafos] = useState<Desabafo[]>([]);
  const [texto, setTexto] = useState("");
  const [salvo, setSalvo] = useState(false);
  const [expandido, setExpandido] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const anexarTrecho = useCallback((trecho: string) => {
    setTexto((atual) => {
      if (!atual) return trecho;
      const juntor = /[.!?…]$/.test(atual.trimEnd()) ? " " : atual.endsWith(" ") ? "" : " ";
      return `${atual.trimEnd()}${juntor}${trecho}`;
    });
  }, []);

  const voz = useTranscricaoVoz({ aoTrechoFinal: anexarTrecho });
  const gravando = voz.status === "gravando";

  // Rola textarea para o final quando texto muda durante gravação (padrão dictation)
  useEffect(() => {
    if (gravando && textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [texto, gravando]);

  useEffect(() => {
    setDesabafos(listarDesabafos());
  }, []);

  const grupos = useMemo(() => {
    const mapa = new Map<string, Desabafo[]>();
    for (const d of desabafos) {
      const arr = mapa.get(d.data) ?? [];
      arr.push(d);
      mapa.set(d.data, arr);
    }
    return Array.from(mapa.entries())
      .sort(([a], [b]) => (a < b ? 1 : -1))
      .map(([data, itens]) => ({ data, itens }));
  }, [desabafos]);

  function guardar() {
    if (gravando) voz.parar();
    const novo = salvarDesabafo(texto);
    if (!novo) return;
    vibrar("conclusao");
    setDesabafos((atuais) => [novo, ...atuais]);
    setTexto("");
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2200);
  }

  function apagar(id: string) {
    removerDesabafo(id);
    setDesabafos((atuais) => atuais.filter((d) => d.id !== id));
    if (expandido === id) setExpandido(null);
  }

  function alternarFala() {
    vibrar("toque");
    if (gravando) voz.parar();
    else void voz.iniciar();
  }

  return (
    <main className="jornada-container">
      <header className="flex items-center justify-between mb-3">
        <Link
          href="/"
          aria-label="Voltar"
          className="min-h-touch min-w-touch inline-flex items-center justify-center -ml-2 text-bruma-muted"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </Link>
        <div className="min-h-touch min-w-touch" aria-hidden="true" />
        <div className="min-h-touch min-w-touch" aria-hidden="true" />
      </header>

      <section className="text-center mb-5">
        <p className="text-[11px] uppercase tracking-[0.24em] text-lavanda mb-2">
          Diário Íntimo
        </p>
        <h1 className="text-2xl font-medium text-noite leading-snug">
          Seu espaço seguro de hoje
        </h1>
        <p className="text-sm text-noite/60 mt-2 text-justify hyphens-auto">
          O que você escrever aqui fica apenas neste aparelho. Ninguém mais vê.
        </p>
      </section>

      <section className="mb-6" aria-label="Escrever ou falar seu desabafo">
        <label htmlFor="campo-desabafo" className="sr-only">
          Desabafos do dia
        </label>

        {/* Campo de entrada — textarea com mic integrado ao canto (padrão WhatsApp/Voice Memos) */}
        <div
          className={cn(
            "relative rounded-3xl border bg-creme-claro/80 transition-all",
            gravando
              ? "border-emergencia/60 ring-4 ring-emergencia/15"
              : "border-mauve/40 focus-within:ring-4 focus-within:ring-mauve/40",
          )}
        >
          <textarea
            ref={textareaRef}
            id="campo-desabafo"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={
              gravando
                ? "Estou te escutando…"
                : voz.suportado
                  ? "Escreva ou toque no microfone para falar…"
                  : "Escreva o que estiver no peito hoje…"
            }
            rows={6}
            inputMode="text"
            enterKeyHint="enter"
            autoCorrect="on"
            autoCapitalize="sentences"
            className={cn(
              "w-full bg-transparent px-5 py-4 pr-16 rounded-3xl",
              "text-acolhimento text-noite placeholder:text-noite/45",
              "focus:outline-none resize-none scroll-mt-24",
            )}
          />

          {/* Botão microfone — integrado ao canto inferior direito */}
          {voz.suportado && (
            <button
              type="button"
              onClick={alternarFala}
              aria-pressed={gravando}
              aria-label={gravando ? "Parar de gravar" : "Falar em vez de escrever"}
              className={cn(
                "absolute bottom-2.5 right-2.5 w-11 h-11 rounded-full",
                "flex items-center justify-center transition-all",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emergencia/30",
                gravando
                  ? "bg-emergencia text-bruma shadow-lg shadow-emergencia/30 motion-safe:animate-pulsar-cta"
                  : "bg-mauve/15 text-mauve-700 border border-mauve/40 active:scale-95 hover:bg-mauve/25",
              )}
            >
              {gravando ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="3" width="6" height="12" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0" />
                  <path d="M12 18v3" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Painel de gravação — timer + waveform + preview parcial (padrão Voice Memos) */}
        {gravando && <PainelGravacao trechoParcial={voz.trechoParcial} />}

        {/* Erro de permissão bloqueada — card com passo-a-passo visual + retry */}
        {voz.erro === "permissao-bloqueada" && (
          <CardPermissaoBloqueada
            aoTentarNovamente={() => {
              voz.dispensarErro();
              voz.iniciar();
            }}
            aoDispensar={voz.dispensarErro}
          />
        )}

        {/* Demais erros — banner acolhedor, dismissível */}
        {voz.erro && voz.erro !== "permissao-bloqueada" && voz.mensagemErro && (
          <div
            role="alert"
            className="mt-3 rounded-2xl border border-atencao/40 bg-atencao/10 px-4 py-3 flex items-start gap-2 animate-aparecer"
          >
            <p className="text-sm text-noite flex-1 leading-snug">{voz.mensagemErro}</p>
            <button
              type="button"
              onClick={voz.dispensarErro}
              className="text-noite/60 min-h-touch min-w-touch inline-flex items-center justify-center -mr-1"
              aria-label="Fechar aviso"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        )}

        {/* CTA principal — sozinho, sem competição visual */}
        <button
          type="button"
          onClick={guardar}
          disabled={!texto.trim()}
          className={cn(
            "mt-3 w-full min-h-[52px] rounded-cta font-semibold transition-transform",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mauve/40",
            texto.trim()
              ? "bg-violeta text-bruma active:scale-[0.98]"
              : "bg-creme-escuro/60 text-noite/40 cursor-not-allowed",
          )}
        >
          Guardar meu desabafo
        </button>

        {/* Aviso curto de privacidade — só aparece quando o modo Falar existe */}
        {voz.suportado && !gravando && (
          <p className="text-[11px] text-noite/55 text-center mt-2 leading-snug">
            Sua voz é processada pelo seu navegador. O texto fica só neste aparelho.
          </p>
        )}

        {salvo && (
          <p role="status" className="mt-2 text-center text-xs text-violeta animate-aparecer">
            Guardado com carinho.
          </p>
        )}
      </section>

      {grupos.length > 0 && (
        <section aria-label="Desabafos anteriores" className="space-y-4 pb-4">
          <h2 className="text-sm uppercase tracking-[0.18em] text-noite/55">
            Dias anteriores
          </h2>
          {grupos.map(({ data, itens }) => (
            <div key={data} className="space-y-2">
              <p className="text-xs text-noite/60 first-letter:uppercase">
                {formatarDataDesabafo(data)}
              </p>
              <ul className="space-y-2">
                {itens.map((d) => {
                  const aberto = expandido === d.id;
                  return (
                    <li key={d.id}>
                      <button
                        type="button"
                        onClick={() => setExpandido(aberto ? null : d.id)}
                        aria-expanded={aberto}
                        className={cn(
                          "w-full text-left rounded-2xl border border-mauve/25 bg-creme-claro/70 px-4 py-3",
                          "transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mauve/30",
                          "active:bg-creme-medio/70",
                        )}
                      >
                        <p
                          className={cn(
                            "text-sm text-noite leading-relaxed text-justify hyphens-auto",
                            !aberto && "line-clamp-2",
                          )}
                        >
                          {d.texto}
                        </p>
                        {aberto && (
                          <div className="mt-3 flex items-center justify-end">
                            <button
                              type="button"
                              onClick={(ev) => {
                                ev.stopPropagation();
                                apagar(d.id);
                              }}
                              className="text-xs text-emergencia hover:underline min-h-touch min-w-touch inline-flex items-center px-2"
                            >
                              Apagar
                            </button>
                          </div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>
      )}

      {grupos.length === 0 && (
        <p className="text-center text-sm text-noite/60 pb-4">
          Nada por aqui ainda. Comece pelo que estiver no peito hoje.
        </p>
      )}
    </main>
  );
}

/**
 * Painel de gravação — indicador REC + timer + waveform simulada + preview parcial.
 * Segue padrão Voice Memos (iOS) / WhatsApp — familiar para qualquer usuária.
 */
function PainelGravacao({ trechoParcial }: { trechoParcial: string }) {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  const tempo = `${min}:${seg.toString().padStart(2, "0")}`;

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-3 rounded-2xl bg-emergencia/10 border border-emergencia/25 px-4 py-3 animate-aparecer"
    >
      <div className="flex items-center gap-3">
        {/* Bolinha REC pulsando */}
        <span
          aria-hidden="true"
          className="w-2.5 h-2.5 rounded-full bg-emergencia motion-safe:animate-pulse shrink-0"
        />
        {/* Waveform simulada — 4 barras animadas */}
        <span aria-hidden="true" className="flex items-end gap-[3px] h-5 flex-1">
          {[0.15, 0.3, 0.5, 0.7].map((delay, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-emergencia/70 motion-safe:animate-onda"
              style={{ animationDelay: `${delay}s`, height: `${40 + i * 10}%` }}
            />
          ))}
        </span>
        {/* Timer */}
        <span className="text-sm font-mono tabular-nums text-noite/80 shrink-0">
          {tempo}
        </span>
      </div>

      {/* Preview transiente do que está sendo dito agora */}
      {trechoParcial && (
        <p className="mt-2 text-sm text-noite/55 italic leading-snug">
          {trechoParcial}
        </p>
      )}

      <p className="mt-1 text-[11px] text-noite/50">
        Toque em <span className="inline-block w-2.5 h-2.5 rounded-sm bg-noite/60 align-middle mx-0.5" aria-hidden="true" /> para parar.
      </p>
    </div>
  );
}

/**
 * Card exibido quando o navegador bloqueou o microfone permanentemente.
 * Chrome/Safari NÃO permitem re-solicitar via JS — precisa da usuária ir nas
 * configurações do site. Este card mostra o passo-a-passo com clareza e oferece
 * botão de retry (que refunciona quando ela liberou manualmente).
 */
function CardPermissaoBloqueada({
  aoTentarNovamente,
  aoDispensar,
}: {
  aoTentarNovamente: () => void;
  aoDispensar: () => void;
}) {
  return (
    <div
      role="alert"
      className="mt-3 rounded-2xl border border-atencao/40 bg-atencao/10 px-4 py-4 animate-aparecer"
    >
      <div className="flex items-start gap-3">
        {/* Ícone cadeado */}
        <span
          aria-hidden="true"
          className="shrink-0 w-9 h-9 rounded-full bg-atencao/25 text-atencao-700 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-noite">
            O microfone está bloqueado
          </p>
          <p className="text-[13px] text-noite/70 mt-1 leading-snug">
            Para falar aqui, libere o microfone só uma vez neste site:
          </p>
        </div>

        <button
          type="button"
          onClick={aoDispensar}
          className="text-noite/50 min-h-touch min-w-touch inline-flex items-center justify-center -mr-1 -mt-1"
          aria-label="Fechar aviso"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Passos numerados */}
      <ol className="mt-3 space-y-2">
        {[
          <>
            Toque no <span aria-hidden="true">🔒</span> ao lado do endereço, no
            topo da tela
          </>,
          <>Toque em &ldquo;Permissões&rdquo;</>,
          <>Ative o Microfone e volte para cá</>,
        ].map((passo, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[13px] text-noite leading-snug">
            <span
              aria-hidden="true"
              className="shrink-0 w-5 h-5 rounded-full bg-atencao/30 text-atencao-700 text-[11px] font-bold flex items-center justify-center mt-0.5"
            >
              {i + 1}
            </span>
            <span className="flex-1">{passo}</span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={aoTentarNovamente}
        className={cn(
          "mt-4 w-full min-h-[48px] rounded-cta font-semibold",
          "bg-rosa-flor text-noite active:scale-[0.98] transition-transform",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rosa-flor-400/40",
        )}
      >
        Já liberei, tentar de novo
      </button>
    </div>
  );
}
