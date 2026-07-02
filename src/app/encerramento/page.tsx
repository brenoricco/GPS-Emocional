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
      {/* Logo protegida na moldura circular — recolhimento */}
      <header className="flex justify-center pt-4">
        <div className="relative">
          <Logo variante="completo" tamanho={200} prioridade className="w-[50vw] max-w-[220px] h-auto" />
        </div>
      </header>

      {/* Texto de despedida */}
      <section className="flex-1 flex flex-col justify-center text-center py-6 space-y-5">
        <p className="text-xl font-medium text-bruma leading-snug">
          {ENCERRAMENTO.titulo}
        </p>
        <p className="text-acolhimento text-bruma/90 max-w-sm mx-auto">
          {ENCERRAMENTO.corpo}
        </p>
        <p className="text-acolhimento text-bruma/85 max-w-sm mx-auto">
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
