import Link from "next/link";
import { redirect } from "next/navigation";

import { FormularioEntrada } from "@/componentes/diario/formulario-entrada";
import { auth } from "@/lib/autenticacao";
import { perfilRepository } from "@/repositorios/perfil.repository";

export const metadata = {
  title: "Nova entrada",
};

export default async function PaginaNovaEntrada() {
  const sessao = await auth();
  if (!sessao?.user?.id) redirect("/entrar");

  const perfil = await perfilRepository.buscarPorUsuarioId(sessao.user.id);
  if (!perfil) redirect("/acolhimento");

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
          Nova entrada
        </p>
        <h1 className="text-2xl font-light text-oceano-800 leading-snug">
          O que vive aí dentro?
        </h1>
      </section>

      <FormularioEntrada />
    </main>
  );
}
