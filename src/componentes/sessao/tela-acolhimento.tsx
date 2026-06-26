"use client";

interface PropsTela {
  titulo: string;
  texto: string;
  aoAvancar: () => void;
}

export function TelaAcolhimento({ titulo, texto, aoAvancar }: PropsTela) {
  return (
    <section className="flex flex-col h-full">
      <header className="space-y-2 mb-8">
        <p className="text-xs uppercase tracking-wider text-brisa-600 font-medium">
          Acolhimento
        </p>
        <h1 className="text-2xl font-light text-oceano-800 leading-snug">
          {titulo}
        </h1>
      </header>

      <div className="flex-1 flex items-center">
        <p className="text-base text-oceano-700 leading-relaxed">{texto}</p>
      </div>

      <footer className="pt-6">
        <button
          type="button"
          onClick={aoAvancar}
          className="w-full min-h-[60px] px-8 rounded-full bg-brisa-500 text-white text-base font-medium shadow-md active:scale-95 transition-transform duration-150 hover:bg-brisa-600 flex items-center justify-center"
        >
          Estou pronta
        </button>
      </footer>
    </section>
  );
}
