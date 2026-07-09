import type { Metadata } from "next";

import { PaginaDesabafos } from "@/componentes/desabafos/pagina-desabafos";

export const metadata: Metadata = {
  title: "Meus desabafos",
};

export default function Pagina() {
  return <PaginaDesabafos />;
}
