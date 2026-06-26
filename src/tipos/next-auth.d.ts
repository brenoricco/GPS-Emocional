import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Estendendo o tipo padrão pra incluir `id` no usuário da sessão.
   * O `id` vem do `token.sub` no callback `session`.
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
