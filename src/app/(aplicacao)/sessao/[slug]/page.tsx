import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { FluxoSessao } from "@/componentes/sessao/fluxo-sessao";
import { auth } from "@/lib/autenticacao";
import { db } from "@/lib/db";
import { perfilRepository } from "@/repositorios/perfil.repository";
import { sessaoRepository } from "@/repositorios/sessao.repository";

interface PropsPagina {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropsPagina) {
  const { slug } = await params;
  const tema = await db.tema.findUnique({ where: { slug } });
  return { title: tema ? `${tema.nome} · Sessão` : "Sessão" };
}

export default async function PaginaSessao({ params }: PropsPagina) {
  const { slug } = await params;
  const sessao = await auth();
  if (!sessao?.user?.id) redirect("/entrar");

  const perfil = await perfilRepository.buscarPorUsuarioId(sessao.user.id);
  if (!perfil) redirect("/acolhimento");

  const tema = await db.tema.findUnique({ where: { slug } });
  if (!tema) notFound();

  // Tema EM_BREVE: mostra tela de espera, não sessão
  if (tema.status === "EM_BREVE") {
    return (
      <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
        <header className="flex items-center justify-between mb-6">
          <Link
            href="/mapa"
            className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800"
          >
            ← Mapa
          </Link>
        </header>

        <section className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div
            className="w-20 h-20 rounded-full bg-areia-100 flex items-center justify-center text-3xl"
            aria-hidden="true"
          >
            🚧
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-areia-600 font-medium">
              Em construção
            </p>
            <h1 className="text-2xl font-light text-oceano-800 leading-snug">
              {tema.nome}
            </h1>
            <p className="text-sm text-oceano-600 leading-relaxed max-w-xs">
              {tema.descricaoLonga}
            </p>
          </div>
          <Link
            href="/mapa"
            className="inline-flex items-center justify-center min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 active:scale-95 transition-all shadow-sm"
          >
            Voltar pro mapa
          </Link>
        </section>
      </main>
    );
  }

  const sessaoClinica = await sessaoRepository.buscarPorTemaSlug(slug);
  if (!sessaoClinica) notFound();

  return (
    <FluxoSessao
      sessao={{
        id: sessaoClinica.id,
        titulo: sessaoClinica.titulo,
        textoAcolhimento: sessaoClinica.textoAcolhimento,
        mecanicaInterativa: sessaoClinica.mecanicaInterativa,
        audioUrl: sessaoClinica.audioUrl,
        audioDuracaoSegundos: sessaoClinica.audioDuracaoSegundos,
        roteiroAudioMarkdown: sessaoClinica.roteiroAudioMarkdown,
        seloAncora: sessaoClinica.seloAncora,
      }}
    />
  );
}
