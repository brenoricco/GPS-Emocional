"use client";

interface PropsSelo {
  frase: string;
  aoConcluir: () => void;
}

export function TelaSeloAncora({ frase, aoConcluir }: PropsSelo) {
  return (
    <section className="flex flex-col h-full">
      <header className="space-y-2 mb-6 text-center">
        <p className="text-xs uppercase tracking-wider text-brisa-600 font-medium">
          Seu selo de hoje
        </p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
        <div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-brisa-400 to-brisa-600 flex items-center justify-center text-3xl shadow-lg animate-respirar"
          aria-hidden="true"
        >
          🔒
        </div>
        <blockquote className="text-xl text-oceano-800 leading-relaxed font-light max-w-sm">
          <span className="block text-3xl text-brisa-300 leading-none mb-2">
            “
          </span>
          {frase}
          <span className="block text-3xl text-brisa-300 leading-none mt-2 text-right">
            ”
          </span>
        </blockquote>
        <p className="text-xs text-oceano-500 max-w-xs leading-relaxed">
          Carregue essa frase com você hoje. Quando a dúvida vier, lembre-se
          dela.
        </p>
      </div>

      <footer className="pt-6">
        <button
          type="button"
          onClick={aoConcluir}
          className="w-full min-h-[60px] px-8 rounded-full bg-brisa-500 text-white text-base font-medium shadow-md active:scale-95 transition-transform duration-150 hover:bg-brisa-600"
        >
          Concluir sessão
        </button>
      </footer>
    </section>
  );
}
