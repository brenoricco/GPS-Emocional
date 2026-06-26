"use client";

import { useEffect } from "react";

/**
 * Registra o service worker em qualquer ambiente (dev e prod).
 * Em dev, ajuda a testar o comportamento PWA real durante construção.
 */
export function RegistradorServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const registrar = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch {
        // Falha silenciosa — PWA é progressive enhancement.
      }
    };

    if (document.readyState === "complete") {
      registrar();
    } else {
      window.addEventListener("load", registrar, { once: true });
    }
  }, []);

  return null;
}
