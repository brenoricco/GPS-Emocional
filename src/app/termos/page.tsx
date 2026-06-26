import Link from "next/link";

export const metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do GPS Emocional.",
};

const ATUALIZADO_EM = "25 de junho de 2026";

export default function PaginaTermos() {
  return (
    <main className="min-h-[100svh] flex flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-w-2xl mx-auto w-full">
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-sm text-oceano-600 hover:text-oceano-800"
        >
          ← Voltar
        </Link>
      </header>

      <article className="prose-oceano space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-oceano-400">
            Termos
          </p>
          <h1 className="text-2xl font-light text-oceano-800">
            Termos de Uso
          </h1>
          <p className="text-xs text-oceano-500">
            Atualizado em {ATUALIZADO_EM}.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            1. Sobre o GPS Emocional
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            O GPS Emocional é uma plataforma digital de cuidado emocional
            complementar, desenvolvida por psicólogo registrado, que oferece
            check-ins, diário pessoal, exercícios baseados em TCC/ACT,
            meditações guiadas e ferramentas de regulação. Não substitui
            psicoterapia, avaliação ou tratamento médico.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            2. Quem pode usar
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            Pessoas com 18 anos ou mais. Não é destinado a menores de idade
            sem supervisão. Se você está em crise aguda, ligue para o CVV (188)
            ou procure um serviço de emergência.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            3. Uso responsável
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            Você concorda em usar o app para autocuidado pessoal. Não
            compartilhe sua conta com terceiros. Conteúdos sensíveis registrados
            no diário são cifrados e tratados conforme nossa Política de
            Privacidade.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            4. Limites clínicos
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            O GPS Emocional <strong>não diagnostica</strong>, <strong>não
            prescreve medicamentos</strong> e <strong>não substitui acompanhamento
            psicológico ou psiquiátrico</strong>. Ferramentas com IA (espelho
            cognitivo, síntese semanal) são reflexivas, não diagnósticas, e
            passam por filtros de segurança.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            5. Propriedade intelectual
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            O conteúdo clínico (textos de acolhimento, roteiros, exercícios
            interativos) é de autoria da equipe clínica do GPS Emocional e está
            protegido por direitos autorais. Seu uso é pessoal e
            intransferível.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            6. Encerramento de conta
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            Você pode solicitar a exclusão da sua conta e dados a qualquer
            momento nas configurações. A purga é processada em até 15 dias.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            7. Contato
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            Dúvidas ou solicitações:{" "}
            <a
              href="mailto:contato@gpsemocional.com.br"
              className="text-brisa-600 underline underline-offset-2"
            >
              contato@gpsemocional.com.br
            </a>
          </p>
        </section>

        <section className="space-y-2 rounded-2xl bg-areia-50 border border-oceano-100 p-4">
          <p className="text-xs text-oceano-700 leading-relaxed">
            <strong>Em crise emocional ou ideação suicida</strong>, ligue
            imediatamente para o{" "}
            <a
              href="tel:188"
              className="text-coral-600 underline underline-offset-2"
            >
              CVV — 188
            </a>{" "}
            (24h, gratuito) ou procure o serviço de emergência mais próximo.
          </p>
        </section>

        <p className="text-[11px] text-oceano-500 leading-relaxed">
          Estes termos podem ser atualizados. Mudanças relevantes serão
          comunicadas por e-mail e exibidas no app antes de entrarem em vigor.
        </p>
      </article>
    </main>
  );
}
