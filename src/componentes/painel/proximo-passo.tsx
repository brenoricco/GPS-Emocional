import Link from "next/link";

import type { ProximoPasso } from "@/lib/painel/dados-painel";

interface PropsProximoPasso {
  passo: ProximoPasso;
}

export function CardProximoPasso({ passo }: PropsProximoPasso) {
  return (
    <Link
      href={passo.href as "/check-in"}
      className="block p-5 rounded-3xl bg-gradient-to-br from-brisa-50 via-brisa-100/40 to-white border border-brisa-200 shadow-sm hover:from-brisa-100 active:scale-[0.98] transition-all duration-150"
    >
      <p className="text-xs uppercase tracking-wider text-brisa-600 font-medium mb-2">
        Próximo passo
      </p>
      <div className="flex items-start gap-4">
        <span className="text-3xl shrink-0" aria-hidden="true">
          {passo.emoji}
        </span>
        <div className="flex-1 space-y-1.5">
          <h2 className="text-base font-medium text-oceano-800 leading-snug">
            {passo.titulo}
          </h2>
          <p className="text-xs text-oceano-600 leading-relaxed">
            {passo.descricao}
          </p>
          <p className="text-sm font-medium text-brisa-700 pt-1 flex items-center gap-1">
            {passo.cta}
            <span aria-hidden="true">→</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
