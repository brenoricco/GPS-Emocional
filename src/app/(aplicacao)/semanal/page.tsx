import Link from "next/link";
import { redirect } from "next/navigation";

import { BotaoGerarSintese } from "@/componentes/semanal/botao-gerar-sintese";
import { CabecalhoPeriodo } from "@/componentes/semanal/cabecalho-periodo";
import { CardsNumeros } from "@/componentes/semanal/cards-numeros";
import { ExibicaoSinteseIA } from "@/componentes/semanal/exibicao-sintese-ia";
import type { AnaliseSemanalIA } from "@/lib/acoes/acoes-semanal";
import { auth } from "@/lib/autenticacao";
import { calcularPeriodoUltimaSemana } from "@/lib/painel/semana";
import { perfilRepository } from "@/repositorios/perfil.repository";
import { sinteseSemanalRepository } from "@/repositorios/sintese-semanal.repository";

export const metadata = {
  title: "Sua semana",
};

const TRES_DIAS_MS = 3 * 24 * 60 * 60 * 1000;

export default async function PaginaSemanal() {
  const sessao = await auth();
  if (!sessao?.user?.id) redirect("/entrar");

  const perfil = await perfilRepository.buscarPorUsuarioId(sessao.user.id);
  if (!perfil) redirect("/acolhimento");

  const ultima = await sinteseSemanalRepository.ultimaDoUsuario(
    sessao.user.id,
  );

  const ehFresca =
    ultima && Date.now() - ultima.geradaEm.getTime() < TRES_DIAS_MS;
  const periodo = ultima
    ? { inicio: ultima.periodoInicio, fim: ultima.periodoFim }
    : calcularPeriodoUltimaSemana();

  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/painel"
          className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800"
        >
          ← Painel
        </Link>
      </header>

      <div className="mb-7">
        <CabecalhoPeriodo periodo={periodo} />
      </div>

      {!ultima ? (
        <section className="space-y-6">
          <div className="rounded-2xl bg-white border border-oceano-100 p-6 space-y-3 text-center">
            <div
              className="w-16 h-16 mx-auto rounded-full bg-brisa-100 flex items-center justify-center text-2xl"
              aria-hidden="true"
            >
              🌊
            </div>
            <p className="text-base text-oceano-800 leading-relaxed">
              Sua primeira síntese semanal.
            </p>
            <p className="text-sm text-oceano-600 leading-relaxed">
              A gente lê seus check-ins e diários dos últimos 7 dias e devolve o
              que viu — com cuidado, sem julgamento.
            </p>
          </div>
          <BotaoGerarSintese rotulo="Gerar minha síntese" />
        </section>
      ) : (
        <section className="space-y-7">
          <CardsNumeros
            mediaHumor={ultima.mediaHumor}
            mediaEnergia={ultima.mediaEnergia}
            tendenciaHumor={ultima.tendenciaHumor ?? "estavel"}
            totalCheckIns={ultima.totalCheckIns}
            totalDiarios={ultima.totalDiarios}
            diasStreak={ultima.diasStreak}
          />

          {ultima.analiseIaJson ? (
            <ExibicaoSinteseIA
              analise={ultima.analiseIaJson as unknown as AnaliseSemanalIA}
            />
          ) : (
            <div className="rounded-2xl bg-areia-50 border border-oceano-100 p-5 text-sm text-oceano-700 leading-relaxed">
              A análise reflexiva ainda não pôde ser gerada (IA indisponível).
              Os números acima continuam te contando como foi a semana.
            </div>
          )}

          {!ehFresca && (
            <div className="pt-2">
              <BotaoGerarSintese rotulo="Atualizar síntese" />
            </div>
          )}
        </section>
      )}

      <footer className="pt-8 mt-auto">
        <p className="text-xs text-oceano-500 text-center leading-relaxed">
          Em crise, ligue para o{" "}
          <a
            href="tel:188"
            className="text-coral-600 underline underline-offset-4"
          >
            CVV — 188
          </a>{" "}
          (24h, gratuito).
        </p>
      </footer>
    </main>
  );
}
