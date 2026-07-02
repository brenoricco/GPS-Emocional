"use client";

import { useEffect } from "react";

/**
 * Registra o service worker APENAS em produção.
 *
 * Em dev, o Fast Refresh do Next entrega chunks com hashes voláteis a cada
 * recompile. Um SW cache-first serviria chunks obsoletos apontando para
 * módulos que já não existem, causando "Cannot read properties of undefined
 * (reading 'call')" no webpack factory. Se um SW já foi registrado em dev
 * antes desta correção, desregistramos aqui.
 */
export function RegistradorServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // Limpa qualquer SW/cache remanescente de sessões anteriores em dev
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister()))
        .catch(() => {});
      if (typeof caches !== "undefined") {
        caches
          .keys()
          .then((chaves) => chaves.forEach((c) => caches.delete(c)))
          .catch(() => {});
      }
      return;
    }

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
