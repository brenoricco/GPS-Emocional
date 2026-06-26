import Image from "next/image";
import Link from "next/link";

import { OndasAmbiente } from "@/componentes/landing/ondas-ambiente";
import { ParticulasAmbiente } from "@/componentes/landing/particulas-ambiente";
import { BotaoRespiraComigo } from "@/componentes/landing/respira-comigo";
import { SaudacaoDinamica } from "@/componentes/landing/saudacao-dinamica";

export default function PaginaInicial() {
  return (
    <main className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Gradiente radial de fundo: claro no topo, levemente mais profundo nas bordas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.7)_0%,_rgba(244,248,250,1)_45%,_rgba(207,224,234,0.6)_100%)]"
      />

      {/* Camadas de ambiente — ordem importa: ondas no fundo, partículas em cima */}
      <OndasAmbiente />
      <ParticulasAmbiente />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col min-h-[100svh] max-w-md mx-auto w-full px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <header className="flex items-center justify-between mb-2">
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
          <Link
            href="/entrar"
            className="text-sm text-oceano-600 hover:text-oceano-800 transition-colors min-h-[44px] inline-flex items-center px-2"
          >
            Entrar
          </Link>
        </header>

        <section className="flex-1 flex flex-col justify-center items-center text-center space-y-9 py-6">
          {/* Logo — protagonista visual */}
          <div className="flex justify-center">
            <Image
              src="/logo-simbolo.png"
              alt="GPS Emocional"
              width={160}
              height={160}
              priority
              className="w-36 h-36 md:w-40 md:h-40"
            />
          </div>

          {/* Saudação adaptada à hora do dia */}
          <div className="space-y-6 max-w-sm">
            <SaudacaoDinamica />

            <p className="text-base text-oceano-600 leading-relaxed">
              Pra quem não tá dormindo.
              <br />
              Pra quem chora no chuveiro.
              <br />
              Pra quem sorri por fora.
            </p>
          </div>

          {/* CTAs — primeiro o gostinho sem cadastro */}
          <div className="w-full space-y-3 pt-2">
            <BotaoRespiraComigo />

            <p className="text-[11px] uppercase tracking-wider text-oceano-400 pt-3 pb-1">
              ou, se preferir
            </p>

            <Link
              href="/bem-vindo"
              className="w-full min-h-[56px] px-8 rounded-full bg-white border border-oceano-200 text-oceano-800 font-medium hover:bg-areia-50 active:scale-95 transition-all duration-150 flex items-center justify-center shadow-sm"
            >
              Começar a jornada
            </Link>
          </div>
        </section>

        {/* Rodapé clínico — CVV sempre visível */}
        <footer className="pt-8">
          <div className="border-t border-oceano-200/60 pt-5 space-y-2 text-xs text-oceano-500 text-center">
            <p>
              Não substitui psicoterapia. Em crise, ligue para o{" "}
              <a
                href="tel:188"
                className="text-coral-600 underline underline-offset-4 hover:text-coral-700"
              >
                CVV — 188
              </a>{" "}
              (24h, gratuito).
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
