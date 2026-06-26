import { redirect } from "next/navigation";

interface PropsPagina {
  params: Promise<{ slug: string }>;
}

/**
 * Mantemos a URL /trilhas/[slug] por retrocompatibilidade,
 * mas redirecionamos pra /sessao/[slug] que renderiza a Sessão clínica
 * em 4 fases (modelo Rejane).
 */
export default async function PaginaTrilha({ params }: PropsPagina) {
  const { slug } = await params;
  redirect(`/sessao/${slug}`);
}
