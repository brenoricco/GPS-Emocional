/**
 * Persistência dos "Meus Desabafos" (diário privado da usuária).
 * Armazenamento 100% local (localStorage) — MVP anônimo, dado sensível fica no dispositivo.
 * Sem sincronização com backend por enquanto (LGPD Art. 11 — reduzir superfície).
 */

export type Desabafo = {
  id: string;
  /** ISO date do dia (YYYY-MM-DD) — usado como chave de agrupamento. */
  data: string;
  texto: string;
  criadoEm: number;
};

const CHAVE = "gps.desabafos.v1";

function seguro(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function listarDesabafos(): Desabafo[] {
  const store = seguro();
  if (!store) return [];
  const bruto = store.getItem(CHAVE);
  if (!bruto) return [];
  try {
    const arr = JSON.parse(bruto);
    if (!Array.isArray(arr)) return [];
    return arr as Desabafo[];
  } catch {
    return [];
  }
}

export function salvarDesabafo(texto: string): Desabafo | null {
  const store = seguro();
  const limpo = texto.trim();
  if (!store || !limpo) return null;
  const agora = new Date();
  const data = agora.toISOString().slice(0, 10);
  const novo: Desabafo = {
    id: `${agora.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    data,
    texto: limpo,
    criadoEm: agora.getTime(),
  };
  const atuais = listarDesabafos();
  const proximo = [novo, ...atuais];
  store.setItem(CHAVE, JSON.stringify(proximo));
  return novo;
}

export function removerDesabafo(id: string): void {
  const store = seguro();
  if (!store) return;
  const filtrados = listarDesabafos().filter((d) => d.id !== id);
  store.setItem(CHAVE, JSON.stringify(filtrados));
}

/** Formata a data ISO YYYY-MM-DD em rótulo humano em pt-BR. */
export function formatarDataDesabafo(iso: string): string {
  const [ano, mes, dia] = iso.split("-").map(Number);
  if (!ano || !mes || !dia) return iso;
  const d = new Date(ano, mes - 1, dia);
  return d.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}
