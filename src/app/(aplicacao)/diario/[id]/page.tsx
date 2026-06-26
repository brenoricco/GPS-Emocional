import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ExibicaoEspelho } from "@/componentes/diario/exibicao-espelho";
import type { EspelhoCognitivo } from "@/lib/ia/tipos";
import { auth } from "@/lib/autenticacao";
import { decifrar } from "@/lib/seguranca/cifrador";
import { entradaDiarioRepository } from "@/repositorios/entrada-diario.repository";

interface PropsPagina {
  params: Promise<{ id: string }>;
}

const FORMATADOR_DATA = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export async function generateMetadata({ params }: PropsPagina) {
  const { id } = await params;
  return { title: `Entrada ${id.slice(0, 6)}` };
}

export default async function PaginaEntradaDiario({ params }: PropsPagina) {
  const { id } = await params;
  const sessao = await auth();
  if (!sessao?.user?.id) redirect("/entrar");

  const entrada = await entradaDiarioRepository.buscarPorId(
    id,
    sessao.user.id,
  );
  if (!entrada) notFound();

  let conteudoClaro = "";
  try {
    conteudoClaro = await decifrar(entrada.conteudoCifrado);
  } catch {
    conteudoClaro =
      "Não foi possível decifrar este conteúdo (chave indisponível).";
  }

  const espelho =
    (entrada.analiseIaJson as unknown as EspelhoCognitivo | null) ?? null;

  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/diario"
          className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800"
        >
          ← Diário
        </Link>
      </header>

      <section className="space-y-3 mb-6">
        <p className="text-xs uppercase tracking-wider text-oceano-400">
          {FORMATADOR_DATA.format(entrada.criadoEm)}
        </p>
        {entrada.promptUsado && (
          <p className="text-xs text-oceano-500 italic">
            Sugestão: “{entrada.promptUsado}”
          </p>
        )}
      </section>

      <section className="mb-8">
        <article className="rounded-2xl bg-white border border-oceano-100 p-5">
          <p className="text-base text-oceano-800 leading-relaxed whitespace-pre-wrap">
            {conteudoClaro}
          </p>
        </article>
        <p className="text-[11px] text-oceano-500 text-right mt-2">
          {entrada.tamanhoCaracteres} caracteres · cifrado em repouso
        </p>
      </section>

      {espelho ? (
        <ExibicaoEspelho espelho={espelho} />
      ) : (
        <section className="rounded-2xl bg-areia-50 border border-oceano-100 p-5 text-xs text-oceano-700 leading-relaxed">
          Esta entrada foi salva sem espelho cognitivo. Você pode pedir um na
          próxima entrada — toda escolha é sua.
        </section>
      )}
    </main>
  );
}
