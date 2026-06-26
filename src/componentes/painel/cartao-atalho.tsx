import Link from "next/link";

interface PropsCartao {
  href: string;
  emoji: string;
  titulo: string;
  descricao: string;
}

export function CartaoAtalho({ href, emoji, titulo, descricao }: PropsCartao) {
  return (
    <Link
      href={href as "/mapa"}
      className="block p-4 rounded-2xl bg-white border border-oceano-100 hover:bg-oceano-50/40 active:scale-[0.98] transition-all duration-150"
    >
      <div className="flex items-center gap-4">
        <span
          className="w-11 h-11 rounded-xl bg-oceano-50 flex items-center justify-center text-xl shrink-0"
          aria-hidden="true"
        >
          {emoji}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-oceano-800 truncate">
            {titulo}
          </h3>
          <p className="text-xs text-oceano-600 truncate">{descricao}</p>
        </div>
        <span className="text-oceano-400 shrink-0" aria-hidden="true">
          ›
        </span>
      </div>
    </Link>
  );
}
