import type { Metadata } from "next";

import { AncoraDoDia } from "@/componentes/jornada/ancora-do-dia";
import { BotaoPrimarioLink } from "@/componentes/jornada/botao-primario";
import { ENCERRAMENTO } from "@/constantes/copy";

export const metadata: Metadata = {
  title: "Concluir Dia",
};

export default function PaginaEncerramento() {
  return (
    <main className="jornada-container ceu-com-estrelas">
      {/* Mensagem da Rejane — centralizada no topo, é o coração da tela */}
      <section className="pt-6 pb-4 text-center">
        <p className="text-acolhimento text-noite/90 max-w-sm mx-auto text-justify hyphens-auto">
          {ENCERRAMENTO.mensagemRejane}
        </p>
        <p className="mt-4 text-sm font-medium text-mauve italic">
          {ENCERRAMENTO.assinatura}
        </p>
      </section>

      {/* Bloco final — CTA + Âncora */}
      <div className="mt-auto pt-4 space-y-5">
        <BotaoPrimarioLink href="/" pulsar>
          {ENCERRAMENTO.cta}
        </BotaoPrimarioLink>

        <AncoraDoDia frase={ENCERRAMENTO.ancoraFinal} />
      </div>
    </main>
  );
}
