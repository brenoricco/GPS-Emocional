import { redirect } from "next/navigation";

import { FluxoAcolhimento } from "@/componentes/acolhimento/fluxo-acolhimento";
import { auth } from "@/lib/autenticacao";
import { perfilRepository } from "@/repositorios/perfil.repository";

export const metadata = {
  title: "Acolhimento",
};

export default async function PaginaAcolhimento() {
  const sessao = await auth();
  if (!sessao?.user?.id) {
    redirect("/entrar");
  }

  // Se já fez o acolhimento, vai pro painel
  const perfil = await perfilRepository.buscarPorUsuarioId(sessao.user.id);
  if (perfil) {
    redirect("/painel");
  }

  return <FluxoAcolhimento />;
}
