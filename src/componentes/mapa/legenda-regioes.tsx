import { TEMAS_DISPONIVEIS } from "@/lib/clinico/temas-disponiveis";
import { REGIOES_MAPA } from "@/lib/clinico/regioes-mapa";

interface PropsLegenda {
  temaAtualSlug?: string;
  temasSelecionadosSlugs?: string[];
}

export function LegendaRegioes({
  temaAtualSlug,
  temasSelecionadosSlugs = [],
}: PropsLegenda) {
  return (
    <ul className="grid grid-cols-1 gap-2">
      {REGIOES_MAPA.map((regiao) => {
        const tema = TEMAS_DISPONIVEIS.find((t) => t.slug === regiao.temaSlug);
        if (!tema) return null;
        const ehAtual = tema.slug === temaAtualSlug;
        const ehSelecionado = temasSelecionadosSlugs.includes(tema.slug);
        const ehEmBreve = tema.status === "EM_BREVE";
        return (
          <li
            key={regiao.slug}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
              ehEmBreve
                ? "bg-white/40 border-oceano-100 opacity-70"
                : ehAtual
                  ? "bg-brisa-50 border-brisa-400 ring-2 ring-brisa-300/40"
                  : ehSelecionado
                    ? "bg-white border-oceano-300"
                    : "bg-white/60 border-oceano-100"
            }`}
          >
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
              style={{
                backgroundColor: regiao.cor + "33",
                border: `1px solid ${regiao.corContorno}66`,
              }}
              aria-hidden="true"
            >
              {regiao.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-oceano-800 truncate">
                {regiao.nome}
              </p>
              <p className="text-xs text-oceano-600 truncate">
                {tema.subtituloModulo ?? tema.nome}
              </p>
            </div>
            {ehAtual && !ehEmBreve && (
              <span className="shrink-0 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-brisa-500 text-white font-medium">
                Você está aqui
              </span>
            )}
            {ehEmBreve && (
              <span className="shrink-0 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-areia-200 text-areia-700 font-medium">
                Em breve
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
