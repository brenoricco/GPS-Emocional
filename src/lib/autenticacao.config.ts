import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Configuração edge-safe do Auth.js.
 *
 * Esta config NÃO importa Prisma nem Resend — é compatível com Edge Runtime
 * (usada pelo middleware). A configuração completa (com adapter e Resend) está
 * em `autenticacao.ts` e é usada pelos route handlers (Node.js).
 *
 * Padrão "split config" recomendado pelo Auth.js v5 pra evitar quebrar middleware
 * em produção.
 */

const ROTAS_PROTEGIDAS = [
  "/painel",
  "/check-in",
  "/diario",
  "/trilhas",
  "/semanal",
  "/emergencia",
  "/configuracoes",
];

const ROTAS_PUBLICAS_APOS_LOGIN = ["/entrar", "/registrar", "/verificar-email"];

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/entrar",
    verifyRequest: "/verificar-email",
    error: "/erro-autenticacao",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const caminho = request.nextUrl.pathname;
      const estaLogado = !!auth?.user;

      const ehRotaProtegida = ROTAS_PROTEGIDAS.some((rota) =>
        caminho.startsWith(rota),
      );
      const ehRotaSoDeslogado = ROTAS_PUBLICAS_APOS_LOGIN.some((rota) =>
        caminho.startsWith(rota),
      );

      if (ehRotaProtegida) {
        return estaLogado;
      }

      if (ehRotaSoDeslogado && estaLogado) {
        return Response.redirect(new URL("/painel", request.nextUrl));
      }

      return true;
    },
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
