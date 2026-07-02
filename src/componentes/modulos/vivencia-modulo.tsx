"use client";

import { useEffect, useRef, useState } from "react";
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
import { COPY_POR_MODULO, ROTEIRO_HIPNOSE } from "@/constantes/copy";
import { MODULOS_POR_SLUG, ehModuloAltoRisco } from "@/constantes/modulos";
import type { ModuloSlug } from "@/tipos/modulo";

/**
 * Vivência do módulo — orquestração das 4 fases (padrão Rejane):
 *   1. Acolhimento
 *   2. Exercício interativo
 *   3. Áudio de indução hipnótica (com fallback textual)
 *   4. Âncora do dia + CTA para encerramento
 */
export function VivenciaModulo({ slug }: { slug: ModuloSlug }) {
  const router = useRouter();
  const modulo = MODULOS_POR_SLUG[slug];
  const copy = COPY_POR_MODULO[slug];
  const roteiro = ROTEIRO_HIPNOSE[slug];
  const [exercicioConcluido, setExercicioConcluido] = useState(false);
  const refConclusao = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (exercicioConcluido) {
      // Scroll suave até a mensagem pós-exercício para revelar o próximo passo
      setTimeout(() => {
        refConclusao.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [exercicioConcluido]);

  const altoRisco = ehModuloAltoRisco(slug);
  const M3 = slug === "rompendo-ciclos";
  const M4 = slug === "resgatando-cores";

  function renderExercicio() {
    const props = { aoConcluir: () => setExercicioConcluido(true) };
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
    <>
      <main
        className="jornada-container ceu-com-estrelas"
        style={{ paddingBottom: M4 ? "8rem" : undefined }}
      >
        <CabecalhoModulo slug={slug} />

        {/* 1. Texto de acolhimento */}
        <section className="mb-6">
          <TextoAcolhimento>{copy.acolhimento}</TextoAcolhimento>
        </section>

        {/* 2. Exercício interativo */}
        <section aria-label="Exercício interativo" className="mb-6">
          <p className="text-sm text-bruma-muted mb-4">{copy.instrucaoExercicio}</p>
          {renderExercicio()}
        </section>

        {exercicioConcluido && (
          <>
            {/* Marca âncora para scroll */}
            <div ref={refConclusao} className="space-y-6">
              <MensagemPosExercicio mensagem={copy.mensagemPosExercicio} />

              {/* 3. Áudio de indução hipnótica (com roteiro em fallback) */}
              <PlayerHipnose audioUrl={null} roteiro={roteiro} />

              {/* Bloco CVV — bloco fixo em M3 (rel. abusivo), flutuante em M4 (depressão) */}
              {M3 && (
                <BotaoCvv variante="bloco" incluirCentralMulher />
              )}

              {/* 4. Âncora do dia */}
              <AncoraDoDia frase={copy.ancora} />

              {/* CTA — Concluir dia */}
              <div className="pt-2">
                <BotaoPrimario
                  onClick={() =>
                    router.push(`/encerramento?de=${modulo.slug}` as Route)
                  }
                  pulsar
                >
                  Ir para o encerramento
                </BotaoPrimario>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Botão CVV flutuante em M4 — sempre visível pois é o módulo de depressão */}
      {M4 && !exercicioConcluido && <BotaoCvv variante="flutuante" />}
      {altoRisco && M4 && exercicioConcluido && <BotaoCvv variante="flutuante" />}
    </>
  );
}
