import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Junta classes do Tailwind resolvendo conflitos.
 * Padrão `cn` esperado por shadcn/ui — mantém nome em inglês por compatibilidade.
 */
export function cn(...entradas: ClassValue[]): string {
  return twMerge(clsx(entradas));
}
