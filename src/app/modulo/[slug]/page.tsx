import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { VivenciaModulo } from "@/componentes/modulos/vivencia-modulo";
import { MODULOS_POR_SLUG } from "@/constantes/modulos";
import type { ModuloSlug } from "@/tipos/modulo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const modulo = MODULOS_POR_SLUG[slug as ModuloSlug];
  if (!modulo) return { title: "Módulo" };
  return { title: modulo.titulo };
}

export default async function PaginaModulo({ params }: Props) {
  const { slug } = await params;
  const modulo = MODULOS_POR_SLUG[slug as ModuloSlug];
  if (!modulo) notFound();

  return <VivenciaModulo slug={modulo.slug} />;
}
