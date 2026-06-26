import Link from "next/link";
import { redirect } from "next/navigation";

import { FluxoCheckIn } from "@/componentes/check-in/fluxo-check-in";
import { auth } from "@/lib/autenticacao";
import { db } from "@/lib/db";
import { perfilRepository } from "@/repositorios/perfil.repository";
import { checkInRepository } from "@/repositorios/check-in.repository";

export const metadata = {
  title: "Check-in",
};

interface PropsPagina {
  searchParams: Promise<{ tipo?: string }>;
}

export default async function PaginaCheckIn({ searchParams }: PropsPagina) {
  const { tipo: tipoParam } = await searchParams;
  const sessao = await auth();
  if (!sessao?.user?.id) redirect("/entrar");

  const perfil = await perfilRepository.buscarPorUsuarioId(sessao.user.id);
  if (!perfil) redirect("/acolhimento");

  const tipo: "MATINAL" | "NOTURNO" =
    tipoParam === "noturno" ? "NOTURNO" : "MATINAL";

  // Já fez hoje? Mostra resumo + atalho pra o oposto.
  const jaFeito = await checkInRepository.ultimoDoTipoHoje(
    sessao.user.id,
    tipo,
  );

  const trilhaPrincipal = await db.trilhaUsuario.findFirst({
    where: { usuarioId: sessao.user.id },
    include: { tema: true },
    orderBy: { iniciadaEm: "asc" },
  });

  if (jaFeito) {
    const ehNoturno = tipo === "NOTURNO";
    return (
      <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
        <header className="flex items-center justify-between mb-6">
          <Link
            href="/painel"
            className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800"
          >
            ← Painel
          </Link>
        </header>
        <section className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-20 h-20 rounded-full bg-brisa-200/70 flex items-center justify-center text-3xl" aria-hidden="true">
            ✅
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl font-light text-oceano-800">
              Check-in de hoje feito.
            </h1>
            <p className="text-sm text-oceano-600 leading-relaxed max-w-xs">
              Humor {jaFeito.humor}/10 · Energia {jaFeito.energia}/10
            </p>
          </div>
          {!ehNoturno && (
            <Link
              href="/check-in?tipo=noturno"
              className="w-full min-h-[56px] px-8 rounded-full bg-brisa-500 text-white font-medium hover:bg-brisa-600 transition-colors shadow-sm flex items-center justify-center"
            >
              Fazer check-out noturno
            </Link>
          )}
          <Link
            href="/painel"
            className="text-sm text-oceano-600 underline underline-offset-4 min-h-[44px] inline-flex items-center"
          >
            Voltar pro painel
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <header className="flex items-center justify-between mb-8">
        <Link
          href="/painel"
          className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800"
        >
          ← Painel
        </Link>
      </header>

      <FluxoCheckIn
        tipo={tipo}
        temaContextoId={trilhaPrincipal?.tema.id}
        perguntaContextual={
          tipo === "MATINAL" && trilhaPrincipal
            ? `Como você está em relação a ${trilhaPrincipal.tema.nome.toLowerCase()} hoje?`
            : undefined
        }
      />
    </main>
  );
}
