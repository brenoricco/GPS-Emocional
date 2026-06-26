"use client";

import { useActionState, useId } from "react";

import {
  entrarComEmail,
  type ResultadoEntrarComEmail,
} from "@/lib/acoes/acoes-autenticacao";

export function FormularioLinkMagico() {
  const idEmail = useId();
  const idTermos = useId();

  const [estado, acaoFormulario, pendente] = useActionState<
    ResultadoEntrarComEmail | null,
    FormData
  >(entrarComEmail, null);

  return (
    <form action={acaoFormulario} className="space-y-4" noValidate>
      <div className="space-y-2">
        <label
          htmlFor={idEmail}
          className="block text-sm font-medium text-oceano-700"
        >
          Seu e-mail
        </label>
        <input
          id={idEmail}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="send"
          required
          placeholder="voce@exemplo.com"
          className="w-full min-h-[52px] px-4 rounded-xl bg-white border border-oceano-200 text-oceano-900 placeholder:text-oceano-300 focus:border-brisa-400 focus:outline-none focus:ring-2 focus:ring-brisa-300/40 transition-colors"
        />
      </div>

      <label
        htmlFor={idTermos}
        className="flex items-start gap-3 cursor-pointer select-none min-h-[44px] py-1"
      >
        <input
          id={idTermos}
          name="aceiteTermos"
          type="checkbox"
          className="mt-1 w-5 h-5 rounded border-oceano-300 text-brisa-500 focus:ring-brisa-300/40"
        />
        <span className="text-xs leading-relaxed text-oceano-600">
          Li e aceito os{" "}
          <a
            href="/termos"
            className="underline underline-offset-2 hover:text-oceano-800"
          >
            Termos de Uso
          </a>{" "}
          e a{" "}
          <a
            href="/privacidade"
            className="underline underline-offset-2 hover:text-oceano-800"
          >
            Política de Privacidade
          </a>
          , incluindo o tratamento de dados sensíveis de saúde (LGPD Art. 11).
        </span>
      </label>

      {estado?.mensagem && (
        <p
          role="alert"
          className="text-sm text-coral-600 bg-coral-400/10 px-4 py-3 rounded-xl"
        >
          {estado.mensagem}
        </p>
      )}

      <button
        type="submit"
        disabled={pendente}
        className="w-full min-h-[56px] px-6 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        {pendente ? "Enviando link..." : "Receber link por e-mail"}
      </button>
    </form>
  );
}
