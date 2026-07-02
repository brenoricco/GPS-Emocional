import { cn } from "@/lib/utils";

/**
 * Bloco de mensagem exibido após conclusão do exercício.
 * Aparecimento suave, tom celebrativo, mas contido — nunca eufórico
 * (respeitar quem está em episódio depressivo).
 */
export function MensagemPosExercicio({
  mensagem,
  className,
}: {
  mensagem: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-2xl border border-rosa-flor/30 bg-rosa-flor/5 px-5 py-5",
        "text-acolhimento text-bruma animate-aparecer",
        className,
      )}
    >
      {mensagem}
    </div>
  );
}
