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
        "rounded-2xl border border-rosa-flor/40 bg-blush/40 px-5 py-5",
        "text-acolhimento text-noite text-justify hyphens-auto animate-aparecer",
        className,
      )}
    >
      {mensagem}
    </div>
  );
}
