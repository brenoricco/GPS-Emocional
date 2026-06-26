"use client";

import type { TipoMecanicaInterativa } from "@prisma/client";

interface PropsPlaceholder {
  tipo: TipoMecanicaInterativa;
  aoConcluir: () => void;
}

const DESCRICOES: Record<TipoMecanicaInterativa, { nome: string; descricao: string; emoji: string }> = {
  BALAO_DA_CALMA: {
    nome: "O Balão da Calma",
    descricao: "Em construção.",
    emoji: "🌬️",
  },
  ESPELHO_DA_VERDADE: {
    nome: "O Espelho da Verdade",
    descricao:
      "Passe o dedo pra limpar o espelho e revelar palavras douradas escondidas atrás das palavras pesadas.",
    emoji: "🪞",
  },
  CORTAR_FIOS: {
    nome: "Cortando os Fios do Passado",
    descricao:
      "Deslize o dedo sobre os fios cinzas pra romper os laços com o que te machuca e liberar a sua energia.",
    emoji: "✂️",
  },
  RESGATE_MEMORIAS: {
    nome: "O Resgate das Memórias",
    descricao:
      "Arraste cada luz de amor (Carinho, Gratidão, Aprendizado, Amor) pra dentro do seu coração.",
    emoji: "💛",
  },
  ACENDER_LUZ_INTERNA: {
    nome: "Acendendo a Luz Interna",
    descricao:
      "Arraste a chama do seu amor-próprio até o centro do seu peito pra aquecer o coração.",
    emoji: "🕯️",
  },
  CONECTAR_ESTRELAS: {
    nome: "Conectando as Estrelas",
    descricao:
      "Deslize o dedo ligando uma estrela à outra (Paz, Amor, Liberdade, Conexão, Criação) pra desenhar a constelação do seu propósito.",
    emoji: "✨",
  },
};

/**
 * Renderizado pras 5 mecânicas que ainda não têm implementação interativa.
 * Mostra descrição da experiência + permite avançar pro áudio.
 */
export function PlaceholderMecanica({ tipo, aoConcluir }: PropsPlaceholder) {
  const cfg = DESCRICOES[tipo];

  return (
    <section className="flex flex-col h-full">
      <header className="space-y-2 mb-6 text-center">
        <p className="text-xs uppercase tracking-wider text-brisa-600 font-medium">
          Exercício gestual
        </p>
        <h2 className="text-2xl font-light text-oceano-800 leading-snug">
          {cfg.nome}
        </h2>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
        <div
          className="w-28 h-28 rounded-full bg-brisa-100 flex items-center justify-center text-5xl animate-respirar"
          aria-hidden="true"
        >
          {cfg.emoji}
        </div>
        <p className="text-base text-oceano-700 leading-relaxed max-w-xs">
          {cfg.descricao}
        </p>
        <div className="rounded-2xl bg-areia-50 border border-oceano-100 p-4 text-xs text-oceano-600 leading-relaxed max-w-xs">
          A experiência interativa está sendo construída com cuidado. Por
          enquanto, você pode seguir pra meditação guiada abaixo.
        </div>
      </div>

      <footer className="pt-6">
        <button
          type="button"
          onClick={aoConcluir}
          className="w-full min-h-[60px] px-8 rounded-full bg-brisa-500 text-white text-base font-medium shadow-md active:scale-95 transition-transform duration-150 hover:bg-brisa-600"
        >
          Seguir pra meditação
        </button>
      </footer>
    </section>
  );
}
