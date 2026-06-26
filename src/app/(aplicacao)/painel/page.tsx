import Image from "next/image";
import { redirect } from "next/navigation";

import { BannerLembretes } from "@/componentes/lembretes/banner-lembretes";
import { CartaoAtalho } from "@/componentes/painel/cartao-atalho";
import { MicrografoHumor } from "@/componentes/painel/micrografo-humor";
import { PainelVivo } from "@/componentes/painel/painel-vivo";
import { CardProximoPasso } from "@/componentes/painel/proximo-passo";
import { SaudacaoPainel } from "@/componentes/painel/saudacao-painel";
import { StreakAfetivo } from "@/componentes/painel/streak-afetivo";
import { sair } from "@/lib/acoes/acoes-autenticacao";
import { auth } from "@/lib/autenticacao";
import { buscarRegiaoPorTemaSlug } from "@/lib/clinico/regioes-mapa";
import { db } from "@/lib/db";
import { calcularDadosPainel } from "@/lib/painel/dados-painel";
import { perfilRepository } from "@/repositorios/perfil.repository";

export const metadata = {
  title: "Painel",
};

export default async function PaginaPainel() {
  const sessao = await auth();
  if (!sessao?.user?.id) redirect("/entrar");

  const perfil = await perfilRepository.buscarPorUsuarioId(sessao.user.id);
  if (!perfil) redirect("/acolhimento");

  const trilhaPrincipal = await db.trilhaUsuario.findFirst({
    where: { usuarioId: sessao.user.id },
    include: { tema: true },
    orderBy: { iniciadaEm: "asc" },
  });

  const temaPrincipal = trilhaPrincipal?.tema;
  const regiaoAtual = temaPrincipal
    ? buscarRegiaoPorTemaSlug(temaPrincipal.slug)
    : undefined;

  const dados = await calcularDadosPainel(
    sessao.user.id,
    temaPrincipal?.slug ?? null,
  );

  const nomeCompleto =
    sessao.user.name ?? sessao.user.email?.split("@")[0] ?? "você";
  const primeiroNome = nomeCompleto.split(" ")[0] ?? nomeCompleto;

  return (
    <PainelVivo nome={primeiroNome} ehModoDificil={dados.ehModoDificil}>
      <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-md mx-auto w-full">
        <header className="flex items-center justify-between mb-6">
          <span className="flex items-center gap-2 text-sm tracking-wide text-oceano-600">
            <Image
              src="/logo-simbolo.png"
              alt=""
              width={28}
              height={28}
              className="w-7 h-7"
            />
            GPS Emocional
          </span>
          <form action={sair}>
            <button
              type="submit"
              className="text-sm text-oceano-600 hover:text-oceano-800 transition-colors min-h-[44px] px-2 active:scale-95"
            >
              Sair
            </button>
          </form>
        </header>

        <section className="mb-7">
          <SaudacaoPainel nome={primeiroNome} />
        </section>

        <section className="mb-6 p-4 rounded-2xl bg-white/60 border border-oceano-100 space-y-4">
          <MicrografoHumor semana={dados.semana} />
          <div className="pt-3 border-t border-oceano-100">
            <StreakAfetivo dias={dados.diasStreak} />
          </div>
        </section>

        <section className="mb-7">
          <CardProximoPasso passo={dados.proximoPasso} />
        </section>

        <section className="mb-7">
          <BannerLembretes />
        </section>

        <section className="space-y-2.5 mb-7">
          <h2 className="text-xs uppercase tracking-wider text-oceano-400 px-1">
            Atalhos
          </h2>
          <CartaoAtalho
            href="/mapa"
            emoji="🗺️"
            titulo="Seu mapa"
            descricao={
              regiaoAtual
                ? `Você está em ${regiaoAtual.nome}`
                : "Veja onde você está"
            }
          />
          <CartaoAtalho
            href="/diario"
            emoji="📓"
            titulo="Diário"
            descricao={
              dados.diasSemDiario === null
                ? "Comece quando quiser"
                : dados.diasSemDiario === 0
                  ? "Você escreveu hoje"
                  : `Há ${dados.diasSemDiario} dias sem escrever`
            }
          />
          {temaPrincipal && (
            <CartaoAtalho
              href={`/trilhas/${temaPrincipal.slug}`}
              emoji="🧭"
              titulo={`Trilha: ${temaPrincipal.nome}`}
              descricao="Próximo exercício da sua rota"
            />
          )}
          <CartaoAtalho
            href="/semanal"
            emoji="📅"
            titulo="Sua semana"
            descricao="Síntese dos seus 7 dias"
          />
          <CartaoAtalho
            href="/check-in?tipo=noturno"
            emoji="🌙"
            titulo="Check-out noturno"
            descricao="Feche o dia em 30 segundos"
          />
        </section>

        <footer className="pt-4 border-t border-oceano-100">
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
    </PainelVivo>
  );
}
