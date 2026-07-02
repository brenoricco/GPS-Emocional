"use client";

import { CVV, CENTRAL_MULHER } from "@/constantes/emergencia";
import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

type Props = {
  /** Variante:
   *  - "flutuante": fixo no rodapé (Módulo 4 — depressão)
   *  - "bloco": card estático no fluxo (Módulo 3 — abusivo)
   *  - "linha": link discreto (rodapé de encerramento)
   */
  variante?: "flutuante" | "bloco" | "linha";
  /** Se true, inclui o 180 (Central da Mulher) além do CVV — Módulo 3 apenas. */
  incluirCentralMulher?: boolean;
  className?: string;
};

export function BotaoCvv({ variante = "bloco", incluirCentralMulher = false, className }: Props) {
  if (variante === "linha") {
    return (
      <a
        href={CVV.tel}
        onClick={() => vibrar("toque")}
        className={cn(
          "inline-flex items-center gap-2 min-h-touch text-sm text-emergencia-400 underline underline-offset-4",
          className,
        )}
      >
        <span aria-hidden="true">🖤</span>
        {CVV.labelBotao}
      </a>
    );
  }

  if (variante === "flutuante") {
    return (
      <div
        className={cn(
          "fixed bottom-0 inset-x-0 z-40 px-4 pt-2 rodape-safe",
          "bg-gradient-to-t from-noite via-noite/95 to-noite/0",
          className,
        )}
      >
        <a
          href={CVV.tel}
          onClick={() => vibrar("toque")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-cta min-h-[52px] px-5",
            "bg-emergencia hover:bg-emergencia-600 active:bg-emergencia-700",
            "text-bruma font-semibold text-base shadow-lg shadow-emergencia-700/40",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emergencia-400/40",
          )}
        >
          <span aria-hidden="true">📞</span>
          {CVV.labelBotao}
        </a>
      </div>
    );
  }

  return (
    <section
      aria-label="Apoio emocional"
      className={cn(
        "rounded-2xl border border-emergencia/30 bg-emergencia/10 p-4 space-y-3",
        className,
      )}
    >
      <p className="text-sm text-bruma leading-relaxed">
        <span aria-hidden="true">🖤</span> Você não precisa passar por isso sozinha.
        Se a dor parecer insuportável, ligue agora — o atendimento é gratuito,
        sigiloso e 24 horas.
      </p>
      <a
        href={CVV.tel}
        onClick={() => vibrar("toque")}
        className={cn(
          "flex items-center justify-center gap-2 rounded-cta min-h-[52px] px-4",
          "bg-emergencia hover:bg-emergencia-600 active:bg-emergencia-700",
          "text-bruma font-semibold text-base",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emergencia-400/40",
        )}
      >
        <span aria-hidden="true">📞</span>
        {CVV.labelBotao}
      </a>
      <p className="text-xs text-bruma-muted text-center">{CVV.descricao}</p>

      {incluirCentralMulher && (
        <>
          <div className="border-t border-emergencia/20" />
          <a
            href={CENTRAL_MULHER.tel}
            onClick={() => vibrar("toque")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-cta min-h-[48px] px-4",
              "bg-atencao/90 hover:bg-atencao-600 text-noite font-semibold text-sm",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-atencao-400/40",
            )}
          >
            <span aria-hidden="true">📞</span>
            {CENTRAL_MULHER.labelBotao}
          </a>
          <p className="text-xs text-bruma-muted text-center">
            {CENTRAL_MULHER.descricao}
          </p>
        </>
      )}
    </section>
  );
}
