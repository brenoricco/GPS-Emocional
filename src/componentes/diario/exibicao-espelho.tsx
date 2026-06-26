import type { EspelhoCognitivo } from "@/lib/ia/tipos";

interface PropsExibicao {
  espelho: EspelhoCognitivo;
}

export function ExibicaoEspelho({ espelho }: PropsExibicao) {
  if (espelho.risco_detectado) {
    return (
      <section className="space-y-4 rounded-2xl bg-coral-400/10 border border-coral-400/30 p-5">
        <header className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            🫂
          </span>
          <h3 className="text-sm font-medium text-coral-700">
            Estamos com você
          </h3>
        </header>
        <p className="text-base text-oceano-800 leading-relaxed">
          {espelho.reflexao}
        </p>
        <a
          href="tel:188"
          className="w-full min-h-[56px] px-6 rounded-full bg-coral-500 text-white font-medium flex items-center justify-center gap-2"
        >
          <span aria-hidden="true">📞</span>
          Ligar pro CVV — 188
        </a>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <header className="flex items-center gap-2">
        <span className="text-xl" aria-hidden="true">
          🪞
        </span>
        <h3 className="text-sm font-medium text-oceano-700">Espelho</h3>
      </header>

      <div className="rounded-2xl bg-brisa-50 border border-brisa-200/50 p-5">
        <p className="text-base text-oceano-800 leading-relaxed">
          {espelho.reflexao}
        </p>
      </div>

      {espelho.distorcoes_cognitivas.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-oceano-400">
            Possíveis distorções cognitivas
          </h4>
          <ul className="space-y-3">
            {espelho.distorcoes_cognitivas.map((d, i) => (
              <li
                key={`${d.tipo}-${i}`}
                className="rounded-2xl bg-white border border-oceano-100 p-4 space-y-2"
              >
                <p className="text-xs uppercase tracking-wider text-brisa-600">
                  {d.tipo}
                </p>
                {d.exemplo && (
                  <blockquote className="text-xs text-oceano-600 italic border-l-2 border-oceano-200 pl-3">
                    “{d.exemplo}”
                  </blockquote>
                )}
                <p className="text-sm text-oceano-700 leading-relaxed">
                  {d.reformulacao}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {espelho.pergunta_reflexiva && (
        <div className="rounded-2xl bg-oceano-50/60 border border-oceano-100 p-5">
          <p className="text-xs uppercase tracking-wider text-oceano-400 mb-2">
            Uma pergunta
          </p>
          <p className="text-base text-oceano-800 leading-relaxed">
            {espelho.pergunta_reflexiva}
          </p>
        </div>
      )}

      {espelho.convite_acao && (
        <p className="text-sm text-oceano-700 leading-relaxed text-center">
          {espelho.convite_acao}
        </p>
      )}

      <p className="text-[11px] text-oceano-500 text-center leading-relaxed pt-2">
        Esse espelho é gerado por IA. Não substitui psicoterapia.
      </p>
    </section>
  );
}
