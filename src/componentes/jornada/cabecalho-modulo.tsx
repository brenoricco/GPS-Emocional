import Link from "next/link";
import type { Route } from "next";

import type { ModuloSlug } from "@/tipos/modulo";
import { MODULOS_POR_SLUG } from "@/constantes/modulos";
import { cn } from "@/lib/utils";

export function CabecalhoModulo({ slug }: { slug: ModuloSlug }) {
  const modulo = MODULOS_POR_SLUG[slug];

  return (
    <header className="flex items-center justify-between gap-3 mb-4 pt-1">
      <Link
        href={"/quiz" as Route}
        aria-label="Voltar ao quiz"
        className="min-h-touch min-w-touch inline-flex items-center justify-center -ml-2 text-bruma-muted hover:text-bruma transition-colors"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </Link>

      <div className="flex-1 text-center min-w-0">
        <p className="text-[11px] uppercase tracking-[0.18em] text-bruma-muted">
          Módulo {modulo.numero}
        </p>
        <h1 className={cn("text-base font-medium truncate text-bruma")}>
          {modulo.titulo}
        </h1>
      </div>

      {/* espaçador para manter título centralizado */}
      <div className="min-h-touch min-w-touch" aria-hidden="true" />
    </header>
  );
}
