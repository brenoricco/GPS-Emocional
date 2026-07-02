import { cn } from "@/lib/utils";

/**
 * Frase-âncora do dia — o "selo" final de cada módulo (padrão Rejane).
 * Renderiza com destaque, ícone de âncora e tipografia especial.
 */
export function AncoraDoDia({ frase, className }: { frase: string; className?: string }) {
  return (
    <section
      aria-label="Sua âncora de hoje"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-lavanda/30 bg-lavanda/5",
        "px-5 py-6 text-center backdrop-blur-sm",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 ceu-com-estrelas opacity-40 pointer-events-none"
      />
      <div className="relative">
        <p className="text-[11px] uppercase tracking-[0.24em] text-lavanda mb-3 flex items-center justify-center gap-1.5">
          <span aria-hidden="true">⚓</span>
          <span>Sua Âncora de Hoje</span>
        </p>
        <p className="text-ancora font-medium text-bruma italic">
          &ldquo;{frase}&rdquo;
        </p>
      </div>
    </section>
  );
}
