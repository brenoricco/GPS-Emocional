import Link from "next/link";
import { redirect } from "next/navigation";

import { LegendaRegioes } from "@/componentes/mapa/legenda-regioes";
import { MapaEmocional } from "@/componentes/mapa/mapa-emocional";
import { auth } from "@/lib/autenticacao";
import { buscarRegiaoPorTemaSlug } from "@/lib/clinico/regioes-mapa";
import { db } from "@/lib/db";
import { perfilRepository } from "@/repositorios/perfil.repository";

export const metadata = {
  title: "Seu mapa",
};

export default async function PaginaMapa() {
  const sessao = await auth();
  if (!sessao?.user?.id) redirect("/entrar");

  const perfil = await perfilRepository.buscarPorUsuarioId(sessao.user.id);
  if (!perfil) redirect("/acolhimento");

  // Tema principal = trilha mais recente (primeira iniciada no acolhimento)
  const trilhaPrincipal = await db.trilhaUsuario.findFirst({
    where: { usuarioId: sessao.user.id },
    include: { tema: true },
    orderBy: { iniciadaEm: "asc" },
  });

  const temaPrincipal = trilhaPrincipal?.tema;
  const regiaoAtual = temaPrincipal
    ? buscarRegiaoPorTemaSlug(temaPrincipal.slug)
    : undefined;

  const temasSelecionadosSlugs = perfil.temasInteresse.map((pt) => pt.tema.slug);

  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/painel"
          className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800"
          aria-label="Voltar pro painel"
        >
          ← Painel
        </Link>
        <span className="text-sm tracking-wide text-oceano-600">Seu mapa</span>
      </header>

      <section className="space-y-3 mb-6">
        <p className="text-xs uppercase tracking-wider text-oceano-400">
          Você está em
        </p>
        <h1 className="text-2xl font-light text-oceano-800 leading-snug">
          {regiaoAtual?.nome ?? "Mar Aberto"}.
        </h1>
        {temaPrincipal && (
          <p className="text-sm text-oceano-600 leading-relaxed">
            {temaPrincipal.descricaoCurta}
          </p>
        )}
      </section>

      <section className="mb-8">
        <MapaEmocional regiaoAtualSlug={regiaoAtual?.slug} />
      </section>

      {temaPrincipal && (
        <Link
          href={`/trilhas/${temaPrincipal.slug}` as `/trilhas/${string}`}
          className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors shadow-sm flex items-center justify-center mb-8"
        >
          Iniciar trilha: {temaPrincipal.nome}
        </Link>
      )}

      <section className="space-y-3 mb-8">
        <h2 className="text-sm font-medium text-oceano-700">
          Regiões do seu mapa
        </h2>
        <LegendaRegioes
          temaAtualSlug={temaPrincipal?.slug}
          temasSelecionadosSlugs={temasSelecionadosSlugs}
        />
      </section>

      <footer className="pt-4 border-t border-oceano-100">
        <p className="text-xs text-oceano-500 text-center leading-relaxed">
          Em crise, ligue para o{" "}
          <a
            href="tel:188"
            className="text-coral-600 underline underline-offset-4"
          >
            CVV — 188
          </a>{" "}
          (24h, gratuito).
        </p>
      </footer>
    </main>
  );
}
