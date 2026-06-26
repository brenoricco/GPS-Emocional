import { redirect } from "next/navigation";

import { BotaoEmergenciaFlutuante } from "@/componentes/seguranca/botao-emergencia-flutuante";
import { auth } from "@/lib/autenticacao";

/**
 * Layout das rotas autenticadas.
 * - Garante sessão server-side antes de renderizar qualquer página filha
 *   (middleware também protege — defesa em camadas).
 * - Inclui o botão de emergência flutuante em TODAS as páginas autenticadas
 *   (FAB sempre acessível, mesmo nas escalation pages).
 */
export default async function LayoutAplicacao({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessao = await auth();

  if (!sessao?.user) {
    redirect("/entrar");
  }

  return (
    <>
      {children}
      <BotaoEmergenciaFlutuante />
    </>
  );
}
