import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/autenticacao";
import { decifrar } from "@/lib/seguranca/cifrador";
import { entradaDiarioRepository } from "@/repositorios/entrada-diario.repository";
import { perfilRepository } from "@/repositorios/perfil.repository";

export const metadata = {
  title: "Diário",
};

const FORMATADOR_DATA = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const FORMATADOR_HORA = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

export default async function PaginaDiario() {
  const sessao = await auth();
  if (!sessao?.user?.id) redirect("/entrar");

  const perfil = await perfilRepository.buscarPorUsuarioId(sessao.user.id);
  if (!perfil) redirect("/acolhimento");

  const entradas = await entradaDiarioRepository.listarDoUsuario(
    sessao.user.id,
    30,
  );

  // Decifra previews server-side (não vaza pro cliente texto cifrado).
  const previews = await Promise.all(
    entradas.map(async (e) => {
      try {
        const conteudo = await decifrar(e.conteudoCifrado);
        const preview =
          conteudo.length > 100 ? conteudo.slice(0, 100) + "…" : conteudo;
        return { id: e.id, criadoEm: e.criadoEm, preview, analisado: Boolean(e.analiseIaJson) };
      } catch {
        return {
          id: e.id,
          criadoEm: e.criadoEm,
          preview: "(não foi possível decifrar — verifique a chave)",
          analisado: false,
        };
      }
    }),
  );

  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(6rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/painel"
          className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800"
        >
          ← Painel
        </Link>
      </header>

      <section className="space-y-3 mb-6">
        <p className="text-xs uppercase tracking-wider text-oceano-400">
          Diário
        </p>
        <h1 className="text-2xl font-light text-oceano-800 leading-snug">
          Seus registros.
        </h1>
        <p className="text-sm text-oceano-600 leading-relaxed">
          Tudo cifrado antes de salvar. Só você consegue ler.
        </p>
      </section>

      {previews.length === 0 ? (
        <section className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-12">
          <div className="text-5xl" aria-hidden="true">📓</div>
          <div className="space-y-2">
            <p className="text-base text-oceano-700 font-medium">
              Você ainda não escreveu nada por aqui.
            </p>
            <p className="text-sm text-oceano-600 max-w-xs leading-relaxed">
              Comece quando quiser. Pode ser uma frase, um susto, uma
              alegria — não tem certo.
            </p>
          </div>
        </section>
      ) : (
        <ul className="space-y-3 mb-6">
          {previews.map((p) => (
            <li key={p.id}>
              <Link
                href={`/diario/${p.id}` as `/diario/${string}`}
                className="block p-4 rounded-2xl bg-white border border-oceano-100 hover:bg-oceano-50/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-oceano-500">
                    {FORMATADOR_DATA.format(p.criadoEm)} ·{" "}
                    {FORMATADOR_HORA.format(p.criadoEm)}
                  </span>
                  {p.analisado && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brisa-100 text-brisa-700 font-medium">
                      🪞 Com espelho
                    </span>
                  )}
                </div>
                <p className="text-sm text-oceano-800 leading-relaxed line-clamp-3">
                  {p.preview}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* CTA fixo no rodapé, fora do safe-area do FAB de emergência */}
      <div
        className="fixed inset-x-0 z-20 px-5 pointer-events-none"
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="max-w-md mx-auto pointer-events-auto">
          <Link
            href="/diario/novo"
            className="w-full min-h-[56px] pr-20 pl-6 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors shadow-lg flex items-center justify-center"
          >
            ✍️ Nova entrada
          </Link>
        </div>
      </div>
    </main>
  );
}
