"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/lib/autenticacao";

export interface ResultadoEntrarComEmail {
  ok: boolean;
  mensagem?: string;
}

/**
 * Inicia fluxo de magic link: envia email com link de entrada.
 * Validação mínima — Auth.js cuida do resto.
 */
export async function entrarComEmail(
  _estadoAnterior: ResultadoEntrarComEmail | null,
  formData: FormData,
): Promise<ResultadoEntrarComEmail> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const aceitouTermos = formData.get("aceiteTermos") === "on";

  if (!email || !email.includes("@")) {
    return { ok: false, mensagem: "Informe um e-mail válido." };
  }

  if (!aceitouTermos) {
    return {
      ok: false,
      mensagem: "Para continuar, é preciso aceitar os termos e a política de privacidade.",
    };
  }

  try {
    await signIn("resend", {
      email,
      redirectTo: "/painel",
    });
    return { ok: true };
  } catch (erro) {
    if (erro instanceof AuthError) {
      return {
        ok: false,
        mensagem:
          "Não conseguimos enviar seu link agora. Tente de novo em instantes.",
      };
    }
    // Auth.js v5 lança um redirect intencional — relançamos pra Next processar.
    throw erro;
  }
}

export async function entrarComGoogle(): Promise<void> {
  await signIn("google", { redirectTo: "/painel" });
}

/**
 * Login de desenvolvimento — só funciona quando NODE_ENV !== "production".
 * Cria/reutiliza um usuário fake pra testar UI sem precisar de Google/Resend.
 */
export async function entrarComoTeste(formData: FormData): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Modo de teste indisponível em produção.");
  }
  const email = String(formData.get("email") ?? "teste@gpsemocional.dev")
    .trim()
    .toLowerCase();
  await signIn("credenciais-teste", { email, redirectTo: "/painel" });
}

export async function sair(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
