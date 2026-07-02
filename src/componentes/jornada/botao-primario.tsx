"use client";

import Link from "next/link";
import type { Route } from "next";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { vibrar } from "@/lib/haptics";
import { cn } from "@/lib/utils";

type BotaoBase = {
  variante?: "principal" | "encerramento";
  pulsar?: boolean;
};

type BotaoProps = BotaoBase &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type LinkProps<T extends string> = BotaoBase & {
  href: Route<T>;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

const CLASSES_BASE =
  "inline-flex items-center justify-center gap-2 rounded-cta w-full min-h-[56px] text-base font-semibold tracking-wide " +
  "bg-rosa-flor text-noite active:scale-[0.98] transition-transform shadow-lg shadow-rosa-flor-500/20 " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rosa-flor-400/40 " +
  "disabled:opacity-60 disabled:pointer-events-none";

/**
 * CTA principal — rosa-flor sobre fundo noite, arredondado total, min-h 56px.
 * Toca haptic sutil ao pressionar.
 */
export const BotaoPrimario = forwardRef<HTMLButtonElement, BotaoProps>(
  function BotaoPrimario({ className, variante = "principal", pulsar, onClick, children, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={rest.type ?? "button"}
        onClick={(e) => {
          vibrar("toque");
          onClick?.(e);
        }}
        className={cn(
          CLASSES_BASE,
          pulsar && "motion-safe:animate-pulsar-cta",
          variante === "encerramento" && "bg-rosa-flor",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

/** Variante Link (Next) do CTA principal — mesma aparência. */
export function BotaoPrimarioLink<T extends string>({
  href,
  onClick,
  children,
  className,
  pulsar,
  ariaLabel,
}: LinkProps<T>) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      onClick={() => {
        vibrar("toque");
        onClick?.();
      }}
      className={cn(
        CLASSES_BASE,
        pulsar && "motion-safe:animate-pulsar-cta",
        className,
      )}
    >
      {children}
    </Link>
  );
}
