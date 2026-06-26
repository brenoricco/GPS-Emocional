import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Resend as ClienteResend } from "resend";

import { authConfig } from "./autenticacao.config";
import { db } from "./db";
import { gerarEmailLinkMagico } from "./email/template-link-magico";

const ehAmbienteProducao = process.env.NODE_ENV === "production";

/**
 * Configuração completa do Auth.js (Node runtime).
 *
 * - Estende a config edge-safe com Prisma adapter e provider Resend (magic link).
 * - Exporta `handlers` (rotas /api/auth/[...nextauth]),
 *   `signIn`/`signOut` (server actions) e `auth` (sessão server-side).
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    ...authConfig.providers,
    // Provider de DEV: só carregado fora de produção. Permite entrar com
    // qualquer e-mail criando usuário fake no banco. Útil pra desenvolver UI
    // sem precisar de Google OAuth ou Resend configurados.
    ...(ehAmbienteProducao
      ? []
      : [
          Credentials({
            id: "credenciais-teste",
            name: "Modo de desenvolvimento",
            credentials: {
              email: { label: "Email de teste", type: "text" },
            },
            async authorize(credenciais) {
              if (ehAmbienteProducao) return null;

              const emailEntrada = String(
                credenciais?.email ?? "teste@gpsemocional.dev",
              )
                .trim()
                .toLowerCase();

              const email =
                emailEntrada.includes("@")
                  ? emailEntrada
                  : "teste@gpsemocional.dev";

              const usuario = await db.usuario.upsert({
                where: { email },
                create: {
                  email,
                  name: "Usuário de Teste",
                  nomeExibicao: "Usuário de Teste",
                  emailVerified: new Date(),
                },
                update: {},
              });

              return {
                id: usuario.id,
                email: usuario.email,
                name: usuario.name,
                image: usuario.image,
              };
            },
          }),
        ]),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_REMETENTE,
      async sendVerificationRequest({ identifier, url, provider }) {
        if (!provider.apiKey) {
          throw new Error(
            "RESEND_API_KEY ausente. Configure no .env pra envio de magic link.",
          );
        }

        const cliente = new ClienteResend(provider.apiKey);
        const { html, texto } = gerarEmailLinkMagico({
          urlLink: url,
          email: identifier,
        });

        const { error } = await cliente.emails.send({
          from: provider.from ?? "GPS Emocional <onboarding@resend.dev>",
          to: identifier,
          subject: "Seu link para entrar no GPS Emocional",
          html,
          text: texto,
        });

        if (error) {
          throw new Error(
            `Falha ao enviar magic link via Resend: ${error.message}`,
          );
        }
      },
    }),
  ],
});
