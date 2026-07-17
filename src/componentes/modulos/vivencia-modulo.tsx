"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";

import { AncoraDoDia } from "@/componentes/jornada/ancora-do-dia";
import { BotaoPrimario } from "@/componentes/jornada/botao-primario";
import { CabecalhoModulo } from "@/componentes/jornada/cabecalho-modulo";
import { TextoAcolhimento } from "@/componentes/jornada/texto-acolhimento";
import { MensagemPosExercicio } from "@/componentes/modulos/mensagem-pos-exercicio";
import { PlayerHipnose } from "@/componentes/audio/player-hipnose";
import { BotaoCvv } from "@/componentes/seguranca/botao-cvv";
import { BalaoDaCalma } from "@/componentes/modulos/leveza-e-paz/balao-da-calma";
import { ReconstrucaoPilares } from "@/componentes/modulos/cura-do-coracao/reconstrucao-pilares";
import { CortarFios } from "@/componentes/modulos/rompendo-ciclos/cortar-fios";
import { DespertarCores } from "@/componentes/modulos/resgatando-cores/despertar-cores";
import { TresPilares } from "@/componentes/modulos/resgate-do-valor/tres-pilares";
import { COPY_POR_MODULO } from "@/constantes/copy";
import { AUDIO_HIPNOSE } from "@/constantes/audios";
import { MODULOS_POR_SLUG } from "@/constantes/modulos";
import type { ModuloSlug } from "@/tipos/modulo";

type Fase = "exercicio" | "pos-exercicio" | "ancora";

/**
 * Vivência do módulo — orquestra 3 fases DISCRETAS (padrão Rejane v2.1):
 *   1. exercicio      → acolhimento + exercício interativo
 *   2. pos-exercicio  → mensagem de fechamento + áudio de indução + Continuar
 *   3. ancora         → âncora do dia + rede de segurança (M3/M4) + CTA final
 *
 * Fases discretas garantem que a tela anterior não "vaze" no topo — bug
 * reportado pela Rejane nos módulos 2/4/5. Scroll volta ao topo em cada troca.
 */
export function VivenciaModulo({ slug }: { slug: ModuloSlug }) {
  const router = useRouter();
  const modulo = MODULOS_POR_SLUG[slug];
  const copy = COPY_POR_MODULO[slug];
  const audioUrl = AUDIO_HIPNOSE[slug];
  const [fase, setFase] = useState<Fase>("exercicio");

  const M3 = slug === "rompendo-ciclos";
  const M4 = slug === "resgatando-cores";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fase]);

  function renderExercicio() {
    const props = { aoConcluir: () => setFase("pos-exercicio") };
    switch (slug) {
      case "leveza-e-paz":
        return <BalaoDaCalma {...props} />;
      case "cura-do-coracao":
        return <ReconstrucaoPilares {...props} />;
      case "rompendo-ciclos":
        return <CortarFios {...props} />;
      case "resgatando-cores":
        return <DespertarCores {...props} />;
      case "resgate-do-valor":
        return <TresPilares {...props} />;
    }
  }

  return (
    <main className="jornada-container ceu-com-estrelas">
      <CabecalhoModulo slug={slug} />

      {fase === "exercicio" && (
        <>
          <section className="mb-6">
            <TextoAcolhimento>{copy.acolhimento}</TextoAcolhimento>
          </section>
          <section aria-label="Exercício interativo" className="mb-6">
            <p className="text-sm text-bruma-muted mb-4">{copy.instrucaoExercicio}</p>
            {renderExercicio()}
          </section>
        </>
      )}

      {fase === "pos-exercicio" && (
        <div className="space-y-6 animate-aparecer">
          <MensagemPosExercicio mensagem={copy.mensagemPosExercicio} />

          <PlayerHipnose
            audioUrl={audioUrl}
            aoFinalizar={M3 ? () => setFase("ancora") : undefined}
          />

          <div className="pt-2">
            <BotaoPrimario onClick={() => setFase("ancora")} pulsar>
              Continuar
            </BotaoPrimario>
          </div>
        </div>
      )}

      {fase === "ancora" && (
        <div className="space-y-6 animate-aparecer">
          <AncoraDoDia frase={copy.ancora} />

          {/* Rede de segurança — bloco completo apenas no fim (decisão Rejane) */}
          {M3 && <BotaoCvv variante="bloco" incluirCentralMulher />}
          {M4 && <BotaoCvv variante="bloco" />}

          <div className="pt-2">
            <BotaoPrimario
              onClick={() => router.push(`/encerramento?de=${modulo.slug}` as Route)}
              pulsar
            >
              Ir para o encerramento
            </BotaoPrimario>
          </div>
        </div>
      )}
    </main>
  );
}
