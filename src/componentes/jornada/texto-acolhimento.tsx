import { cn } from "@/lib/utils";

/**
 * Texto de acolhimento — o "olá" clínico do início de cada módulo.
 * Tipografia mais alta (17-18px), line-height 1.65, itálico.
 * Substitui automaticamente "..." por um espaço respirado (⏸) que dá pausa visual.
 */
export function TextoAcolhimento({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  // Substitui "..." por três pontos com espaços largos entre eles.
  const partes = children.split("...");

  return (
    <div
      className={cn(
        "text-acolhimento text-bruma/95 animate-aparecer",
        className,
      )}
    >
      {partes.map((parte, i) => (
        <span key={i}>
          {parte}
          {i < partes.length - 1 && (
            <span aria-hidden="true" className="text-lavanda tracking-[0.5em]">
              {" . . . "}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
