import type { Metadata } from "next";

import { BotaoPrimarioLink } from "@/componentes/jornada/botao-primario";
import { Logo } from "@/componentes/jornada/logo";
import { ENCERRAMENTO } from "@/constantes/copy";

export const metadata: Metadata = {
  title: "Concluir Dia",
};

export default function PaginaEncerramento() {
  return (
    <main className="jornada-container ceu-com-estrelas">
      {/* Símbolo — variante mais leve na despedida */}
      <header className="flex justify-center pt-4">
        <div className="relative">
          <Logo variante="simbolo" tamanho={140} prioridade className="w-[35vw] max-w-[160px] h-auto opacity-90" />
        </div>
      </header>

      {/* Texto de despedida — corpo justificado (título e âncora ficam centralizados) */}
      <section className="flex-1 flex flex-col justify-center py-6 space-y-5">
        <p className="text-xl font-medium text-noite leading-snug text-center">
          {ENCERRAMENTO.titulo}
        </p>
        <p className="text-acolhimento text-noite/85 max-w-sm mx-auto text-justify hyphens-auto">
          {ENCERRAMENTO.corpo}
        </p>
        <p className="text-acolhimento text-noite/75 max-w-sm mx-auto text-justify hyphens-auto">
          {ENCERRAMENTO.lembrete}
        </p>
      </section>

      {/* CTA + frase âncora final */}
      <div className="pt-4 space-y-4">
        <BotaoPrimarioLink href="/" pulsar>
          {ENCERRAMENTO.cta}
        </BotaoPrimarioLink>

        <p className="text-center text-sm text-lavanda italic">
          ⚓ {ENCERRAMENTO.ancoraFinal}
        </p>
      </div>
    </main>
  );
}
