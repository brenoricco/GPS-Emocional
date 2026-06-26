"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { BalaoDaCalma } from "@/componentes/sessao/balao-da-calma";
import { PlaceholderMecanica } from "@/componentes/sessao/placeholder-mecanica";
import { PlayerAudio } from "@/componentes/sessao/player-audio";
import { TelaAcolhimento } from "@/componentes/sessao/tela-acolhimento";
import { TelaSeloAncora } from "@/componentes/sessao/tela-selo-ancora";
import { concluirSessao } from "@/lib/acoes/acoes-sessao";

interface PropsSessao {
  id: string;
  titulo: string;
  textoAcolhimento: string;
  mecanicaInterativa:
    | "BALAO_DA_CALMA"
    | "ESPELHO_DA_VERDADE"
    | "CORTAR_FIOS"
    | "RESGATE_MEMORIAS"
    | "ACENDER_LUZ_INTERNA"
    | "CONECTAR_ESTRELAS";
  audioUrl: string | null;
  audioDuracaoSegundos: number | null;
  roteiroAudioMarkdown: string | null;
  seloAncora: string;
}

interface PropsFluxo {
  sessao: PropsSessao;
}

type Fase = "acolhimento" | "mecanica" | "audio" | "ancora";

export function FluxoSessao({ sessao }: PropsFluxo) {
  const router = useRouter();
  const [fase, setFase] = useState<Fase>("acolhimento");
  const [pendente, iniciarTransicao] = useTransition();

  function aoFinalizar() {
    iniciarTransicao(async () => {
      await concluirSessao(sessao.id);
      router.push("/painel");
    });
  }

  return (
    <main
      className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full"
      key={fase}
    >
      <div className="flex-1 flex flex-col animate-em-aparicao">
        {fase === "acolhimento" && (
          <TelaAcolhimento
            titulo={sessao.titulo}
            texto={sessao.textoAcolhimento}
            aoAvancar={() => setFase("mecanica")}
          />
        )}

        {fase === "mecanica" && (
          <>
            {sessao.mecanicaInterativa === "BALAO_DA_CALMA" ? (
              <BalaoDaCalma aoConcluir={() => setFase("audio")} />
            ) : (
              <PlaceholderMecanica
                tipo={sessao.mecanicaInterativa}
                aoConcluir={() => setFase("audio")}
              />
            )}
          </>
        )}

        {fase === "audio" && (
          <PlayerAudio
            audioUrl={sessao.audioUrl}
            audioDuracaoSegundos={sessao.audioDuracaoSegundos}
            roteiroMarkdown={sessao.roteiroAudioMarkdown}
            tituloModulo={sessao.titulo}
            aoConcluir={() => setFase("ancora")}
          />
        )}

        {fase === "ancora" && (
          <TelaSeloAncora
            frase={sessao.seloAncora}
            aoConcluir={aoFinalizar}
          />
        )}
      </div>

      {pendente && (
        <p className="text-center text-xs text-oceano-500 pt-4">Salvando...</p>
      )}
    </main>
  );
}
