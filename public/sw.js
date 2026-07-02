/* GPS Emocional — Service Worker
 *
 * Estratégia mínima e segura:
 *   - network-first pra HTML (navegação): garante conteúdo fresco; usa cache
 *     só se rede falhar.
 *   - cache-first pra assets estáticos: rápido e tolerante a quedas.
 *   - NÃO cacheia chamadas a /api/* nem ao Auth.js — segurança e privacidade.
 *
 * Em dev (Next.js HMR), o SW só registra na primeira carga. Recarregue
 * forçado (Ctrl+Shift+R) se mudar estratégias.
 */

const VERSAO = "v6-jornada";
const NOME_CACHE = `gps-emocional-${VERSAO}`;
const URLS_PRE_CACHE = [
  "/",
  "/quiz",
  "/encerramento",
  "/manifest.webmanifest",
  "/icone-192.png",
  "/icone-512.png",
  "/logo-simbolo.png",
  "/logo-gps-emocional.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(NOME_CACHE)
      .then((cache) => cache.addAll(URLS_PRE_CACHE))
      .catch(() => {
        /* pré-cache best-effort */
      }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(
        chaves
          .filter((chave) => chave !== NOME_CACHE)
          .map((chave) => caches.delete(chave)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Nunca tocar em rotas sensíveis
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/data/") ||
    url.pathname.includes("/auth")
  ) {
    return;
  }

  // Navegação HTML: network-first com fallback ao shell em cache
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((resp) => {
          const clone = resp.clone();
          caches.open(NOME_CACHE).then((c) => c.put(req, clone));
          return resp;
        })
        .catch(async () => {
          const cacheado = await caches.match(req);
          if (cacheado) return cacheado;
          const fallback = await caches.match("/");
          return fallback ?? Response.error();
        }),
    );
    return;
  }

  // Assets estáticos: cache-first com revalidação opportunistic
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cacheado) => {
        if (cacheado) {
          fetch(req)
            .then((resp) => {
              if (resp.ok) {
                caches.open(NOME_CACHE).then((c) => c.put(req, resp.clone()));
              }
            })
            .catch(() => {});
          return cacheado;
        }
        return fetch(req).then((resp) => {
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(NOME_CACHE).then((c) => c.put(req, clone));
          }
          return resp;
        });
      }),
    );
  }
});
