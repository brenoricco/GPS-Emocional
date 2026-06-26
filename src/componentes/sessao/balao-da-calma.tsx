"use client";

import { useEffect, useRef, useState } from "react";

interface PropsBalao {
  aoConcluir: () => void;
}

type Fase =
  | "preparar"
  | "inspirando"
  | "segurando"
  | "pode-soltar"
  | "expirando"
  | "concluido";

const CICLOS_NECESSARIOS = 3;
const SEG_INSPIRAR = 4;
const SEG_SEGURAR = 2;
const SEG_EXPIRAR = 4;

function vibrar(padrao: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(padrao);
    } catch {
      /* silencioso */
    }
  }
}

/**
 * Balão da Calma — mecânica Rejane (módulo "O Peito Leve" / Ansiedade).
 *
 * Toca e segura: inspira (4s). Vibração. Segura cheio (2s).
 * Solta o dedo: expira (4s).
 * 3 ciclos = libera próxima fase.
 *
 * Soltar o dedo durante inspiração antes dos 4s reseta o ciclo (cuidado e
 * acolhimento — não punição).
 */
export function BalaoDaCalma({ aoConcluir }: PropsBalao) {
  const [fase, setFase] = useState<Fase>("preparar");
  const [ciclos, setCiclos] = useState(0);
  const refTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (refTimer.current) clearTimeout(refTimer.current);
    };
  }, []);

  function limparTimer() {
    if (refTimer.current) {
      clearTimeout(refTimer.current);
      refTimer.current = null;
    }
  }

  function aoPressionar() {
    if (fase === "preparar" || fase === "expirando") {
      limparTimer();
      setFase("inspirando");
      refTimer.current = setTimeout(() => {
        vibrar(60);
        setFase("segurando");
        refTimer.current = setTimeout(() => {
          // 2s segurando completos — sinaliza pro usuário soltar o dedo.
          vibrar(40);
          setFase("pode-soltar");
        }, SEG_SEGURAR * 1000);
      }, SEG_INSPIRAR * 1000);
    }
  }

  function aoSoltar() {
    if (fase === "inspirando") {
      // Soltou antes do tempo — reseta com gentileza
      limparTimer();
      setFase("preparar");
      return;
    }
    if (fase === "segurando" || fase === "pode-soltar") {
      limparTimer();
      setFase("expirando");
      refTimer.current = setTimeout(() => {
        vibrar(30);
        const novoTotal = ciclos + 1;
        setCiclos(novoTotal);
        if (novoTotal >= CICLOS_NECESSARIOS) {
          setFase("concluido");
          vibrar([60, 40, 80]);
        } else {
          setFase("preparar");
        }
      }, SEG_EXPIRAR * 1000);
    }
  }

  // Tamanho do círculo conforme fase (transição com duração variável)
  const escalaCirculo =
    fase === "inspirando"
      ? "scale-150"
      : fase === "segurando" || fase === "pode-soltar"
        ? "scale-150"
        : fase === "expirando"
          ? "scale-75"
          : "scale-100";

  const duracaoTransicaoMs =
    fase === "inspirando"
      ? SEG_INSPIRAR * 1000
      : fase === "expirando"
        ? SEG_EXPIRAR * 1000
        : 400;

  const instrucao =
    fase === "preparar"
      ? "Toque e segure pra puxar o ar..."
      : fase === "inspirando"
        ? "Puxe o ar..."
        : fase === "segurando"
          ? "Segure..."
          : fase === "pode-soltar"
            ? "Solte o dedo pra expirar pela boca..."
            : fase === "expirando"
              ? "Solte o ar devagar..."
              : "Você fez.";

  return (
    <section className="flex flex-col h-full">
      <header className="space-y-2 mb-6 text-center">
        <p className="text-xs uppercase tracking-wider text-brisa-600 font-medium">
          O Balão da Calma
        </p>
        <p className="text-sm text-oceano-600">
          {fase === "concluido"
            ? `${CICLOS_NECESSARIOS} de ${CICLOS_NECESSARIOS} respirações`
            : `${ciclos} de ${CICLOS_NECESSARIOS} respirações`}
        </p>
      </header>

      <div
        className="flex-1 flex flex-col items-center justify-center gap-10 select-none touch-none"
        onPointerDown={aoPressionar}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onPointerLeave={(e) => {
          if (e.buttons === 0) return;
          aoSoltar();
        }}
        role="button"
        aria-label="Toque e segure para inspirar"
        style={{ cursor: fase === "concluido" ? "default" : "pointer" }}
      >
        <div className="relative w-56 h-56 flex items-center justify-center pointer-events-none">
          <div
            className={`absolute inset-0 rounded-full bg-brisa-200/40 transition-transform ease-in-out ${escalaCirculo}`}
            style={{ transitionDuration: `${duracaoTransicaoMs}ms` }}
          />
          <div
            className={`absolute inset-6 rounded-full bg-brisa-300/70 transition-transform ease-in-out ${escalaCirculo}`}
            style={{ transitionDuration: `${duracaoTransicaoMs}ms` }}
          />
          <div
            className={`absolute inset-12 rounded-full bg-brisa-500 transition-transform ease-in-out ${escalaCirculo}`}
            style={{ transitionDuration: `${duracaoTransicaoMs}ms` }}
          />
        </div>

        <p
          className="text-lg text-oceano-800 font-light text-center max-w-xs"
          aria-live="polite"
        >
          {instrucao}
        </p>
      </div>

      <footer className="pt-6">
        {fase === "concluido" ? (
          <button
            type="button"
            onClick={aoConcluir}
            className="w-full min-h-[60px] px-8 rounded-full bg-brisa-500 text-white text-base font-medium shadow-md active:scale-95 transition-transform duration-150 hover:bg-brisa-600"
          >
            Continuar
          </button>
        ) : (
          <p className="text-xs text-oceano-500 text-center">
            Se soltar antes do tempo, a gente recomeça. Sem cobrança.
          </p>
        )}
      </footer>
    </section>
  );
}
