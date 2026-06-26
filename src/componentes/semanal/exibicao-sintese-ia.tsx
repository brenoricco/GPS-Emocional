import type { AnaliseSemanalIA } from "@/lib/acoes/acoes-semanal";

interface PropsExibicao {
  analise: AnaliseSemanalIA;
}

export function ExibicaoSinteseIA({ analise }: PropsExibicao) {
  if (analise.risco_detectado) {
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
          {analise.destaque_da_semana}
        </p>
        {analise.ponto_de_cuidado && (
          <p className="text-sm text-oceano-700 leading-relaxed">
            {analise.ponto_de_cuidado}
          </p>
        )}
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
        <h3 className="text-sm font-medium text-oceano-700">
          Espelho da semana
        </h3>
      </header>

      <div className="rounded-2xl bg-brisa-50 border border-brisa-200/50 p-5">
        <p className="text-base text-oceano-800 leading-relaxed">
          {analise.destaque_da_semana}
        </p>
      </div>

      {analise.padroes_observados.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-oceano-400">
            Padrões que a gente notou
          </h4>
          <ul className="space-y-2">
            {analise.padroes_observados.map((p, i) => (
              <li
                key={i}
                className="rounded-2xl bg-white border border-oceano-100 p-4 text-sm text-oceano-700 leading-relaxed flex gap-3"
              >
                <span className="text-brisa-500 shrink-0" aria-hidden="true">
                  •
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {analise.pequena_vitoria && (
        <div className="rounded-2xl bg-brisa-50/60 border border-brisa-200/40 p-5">
          <p className="text-xs uppercase tracking-wider text-brisa-600 font-medium mb-2">
            Pequena vitória
          </p>
          <p className="text-sm text-oceano-800 leading-relaxed">
            {analise.pequena_vitoria}
          </p>
        </div>
      )}

      {analise.ponto_de_cuidado && (
        <div className="rounded-2xl bg-areia-50 border border-areia-200/60 p-5">
          <p className="text-xs uppercase tracking-wider text-areia-600 font-medium mb-2">
            Pra olhar com gentileza
          </p>
          <p className="text-sm text-oceano-800 leading-relaxed">
            {analise.ponto_de_cuidado}
          </p>
        </div>
      )}

      {analise.pergunta_para_proxima_semana && (
        <div className="rounded-2xl bg-oceano-50/60 border border-oceano-100 p-5">
          <p className="text-xs uppercase tracking-wider text-oceano-400 mb-2">
            Uma pergunta pra próxima semana
          </p>
          <p className="text-base text-oceano-800 leading-relaxed">
            {analise.pergunta_para_proxima_semana}
          </p>
        </div>
      )}

      <p className="text-[11px] text-oceano-500 text-center leading-relaxed pt-2">
        Síntese gerada por IA com base nos seus check-ins e diários da semana.
        Não substitui psicoterapia.
      </p>
    </section>
  );
}
