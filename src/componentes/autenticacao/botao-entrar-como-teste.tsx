import { entrarComoTeste } from "@/lib/acoes/acoes-autenticacao";

/**
 * Botão de login de desenvolvimento.
 * Renderização condicional fica no chamador — este componente assume que só
 * é renderizado fora de produção.
 */
export function BotaoEntrarComoTeste() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-coral-400/50 bg-coral-400/5 p-4 space-y-3">
      <p className="text-xs uppercase tracking-wider text-coral-600 font-medium flex items-center gap-2">
        <span aria-hidden="true">🛠️</span>
        Modo de desenvolvimento
      </p>
      <form action={entrarComoTeste} className="space-y-3">
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="off"
          defaultValue="teste@gpsemocional.dev"
          className="w-full min-h-[44px] px-3 rounded-lg bg-white border border-coral-300/40 text-oceano-800 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-400/30"
        />
        <button
          type="submit"
          className="w-full min-h-[48px] px-4 rounded-full bg-coral-500 text-white font-medium hover:bg-coral-600 transition-colors text-sm"
        >
          Entrar como teste
        </button>
      </form>
      <p className="text-[11px] text-coral-700/80 leading-relaxed">
        Só visível em desenvolvimento. Cria usuário fake no banco local pra você
        testar a UI sem configurar Google/Resend.
      </p>
    </div>
  );
}
