"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

      <section className="mb-6" aria-label="Escrever desabafo do dia">
        <label htmlFor="campo-desabafo" className="sr-only">
          Desabafos do dia
        </label>
        <textarea
          id="campo-desabafo"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Desabafos do dia"
          rows={6}
          inputMode="text"
          enterKeyHint="enter"
          autoCorrect="on"
          autoCapitalize="sentences"
          className={cn(
            "w-full rounded-3xl border border-mauve/40 bg-creme-claro/80 px-5 py-4",
            "text-acolhimento text-noite placeholder:text-noite/45",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mauve/40",
            "resize-none scroll-mt-24",
          )}
        />
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
