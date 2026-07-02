import { BotaoPrimarioLink } from "@/componentes/jornada/botao-primario";
import { Logo } from "@/componentes/jornada/logo";
import { TextoAcolhimento } from "@/componentes/jornada/texto-acolhimento";
import { BOAS_VINDAS } from "@/constantes/copy";

export default function BoasVindas() {
  return (
    <main className="jornada-container ceu-com-estrelas">
      {/* Logo — protagonista visual no topo */}
      <header className="flex justify-center pt-4">
        <Logo variante="completo" tamanho={220} prioridade className="w-[55vw] max-w-[240px] h-auto" />
      </header>

      {/* Texto de acolhimento — no centro vertical, com espaço para respirar */}
      <section className="flex-1 flex flex-col justify-center text-center py-6">
        <p className="text-2xl font-medium text-bruma mb-5">
          {BOAS_VINDAS.saudacao}
        </p>
        <TextoAcolhimento className="text-center max-w-sm mx-auto">
          {`${BOAS_VINDAS.respireBloco}...${BOAS_VINDAS.pergunta}`}
        </TextoAcolhimento>
      </section>

      {/* CTA — thumb zone, base */}
      <div className="pt-6">
        <BotaoPrimarioLink href="/quiz" pulsar ariaLabel="Começar a jornada">
          {BOAS_VINDAS.cta}
        </BotaoPrimarioLink>
        <p className="text-center text-xs text-bruma-muted mt-4">
          Um espaço seguro. Nenhum julgamento.
        </p>
      </div>
    </main>
  );
}
