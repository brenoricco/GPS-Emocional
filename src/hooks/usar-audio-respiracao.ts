"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type FaseAudio =
  | "vamos-comecar"
  | "inspire"
  | "segure"
  | "expire"
  | "pronto";

const ARQUIVOS: Record<FaseAudio, string> = {
  "vamos-comecar": "/audio/respiracao/vamos-comecar.mp3",
  inspire: "/audio/respiracao/inspire.mp3",
  segure: "/audio/respiracao/segure.mp3",
  expire: "/audio/respiracao/expire.mp3",
  pronto: "/audio/respiracao/pronto.mp3",
};

const CHAVE_MUDO = "gps:audio-respiracao:mudo";

/**
 * Áudio guiado da respiração 4-7-8.
 *
 * - Pre-carrega os 5 MP3 na montagem (cache leve, ~60KB total).
 * - Toggle de mudo persistido em localStorage.
 * - Pausa quando a aba some (visibilitychange).
 * - Tolerante a autoplay bloqueado: erros silenciosos (iOS silent switch,
 *   browser policy). O 1º play tem que vir de gesto do usuário (botão Começar).
 *
 * Nome em inglês ("use") é exigência do React/ESLint (rules-of-hooks). Arquivo
 * mantém kebab-case PT-BR ("usar-") pra preservar a convenção de pastas.
 */
export function useAudioRespiracao() {
  const [mudo, setMudo] = useState(false);
  const refMudo = useRef(false);
  const refCache = useRef<Map<FaseAudio, HTMLAudioElement>>(new Map());

  useEffect(() => {
    refMudo.current = mudo;
  }, [mudo]);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_MUDO);
      if (salvo === "true") setMudo(true);
    } catch {
      /* localStorage indisponível em modo privado */
    }
  }, []);

  useEffect(() => {
    const cache = refCache.current;
    for (const [fase, url] of Object.entries(ARQUIVOS) as [
      FaseAudio,
      string,
    ][]) {
      if (!cache.has(fase)) {
        const audio = new Audio(url);
        audio.preload = "auto";
        cache.set(fase, audio);
      }
    }

    const aoOcultar = () => {
      if (document.hidden) {
        for (const a of cache.values()) a.pause();
      }
    };
    document.addEventListener("visibilitychange", aoOcultar);

    return () => {
      document.removeEventListener("visibilitychange", aoOcultar);
      for (const a of cache.values()) {
        a.pause();
        a.currentTime = 0;
      }
    };
  }, []);

  const tocar = useCallback((fase: FaseAudio) => {
    if (refMudo.current) return;
    const audio = refCache.current.get(fase);
    if (!audio) return;
    try {
      audio.currentTime = 0;
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* autoplay bloqueado, silent switch, etc */
        });
      }
    } catch {
      /* silencioso */
    }
  }, []);

  const alternarMudo = useCallback(() => {
    setMudo((atual) => {
      const novo = !atual;
      try {
        localStorage.setItem(CHAVE_MUDO, novo ? "true" : "false");
      } catch {
        /* silencioso */
      }
      if (novo) {
        for (const a of refCache.current.values()) {
          a.pause();
          a.currentTime = 0;
        }
      }
      return novo;
    });
  }, []);

  return { mudo, tocar, alternarMudo };
}
