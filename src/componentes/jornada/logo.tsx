import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  variante?: "completo" | "simbolo";
  tamanho?: number;
  className?: string;
  prioridade?: boolean;
};

/**
 * Logo do GPS Emocional.
 * - "completo": círculo com ilustração + texto (uso na Tela 1 e Tela 8).
 * - "simbolo": apenas a ilustração da mulher com bússola (uso em cabeçalhos).
 */
export function Logo({ variante = "completo", tamanho = 160, className, prioridade = false }: Props) {
  const src = variante === "completo" ? "/logo-gps-emocional.png" : "/logo-simbolo.png";
  return (
    <Image
      src={src}
      alt="GPS Emocional"
      width={tamanho}
      height={tamanho}
      priority={prioridade}
      className={cn("select-none pointer-events-none", className)}
    />
  );
}
