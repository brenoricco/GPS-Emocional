import NextAuth from "next-auth";

import { authConfig } from "@/lib/autenticacao.config";

/**
 * Middleware Edge-safe do Auth.js.
 * O callback `authorized` em authConfig decide quais rotas são protegidas.
 */
export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  // Roda em todas as rotas exceto APIs do Auth.js, arquivos estáticos e mídias.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
