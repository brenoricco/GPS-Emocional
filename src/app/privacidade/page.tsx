import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade",
  description: "Como o GPS Emocional cuida dos seus dados.",
};

const ATUALIZADO_EM = "25 de junho de 2026";

export default function PaginaPrivacidade() {
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
            Privacidade
          </p>
          <h1 className="text-2xl font-light text-oceano-800">
            Política de Privacidade
          </h1>
          <p className="text-xs text-oceano-500">
            Atualizado em {ATUALIZADO_EM}. Adequado à LGPD (Lei 13.709/2018).
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            Dados que coletamos
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            <strong>Cadastro:</strong> e-mail e nome (ou Google se você escolher
            login social).
          </p>
          <p className="text-sm text-oceano-700 leading-relaxed">
            <strong>Dados pessoais sensíveis (LGPD Art. 11) — saúde:</strong>{" "}
            check-ins (humor, energia), conteúdo de diário, respostas a escalas
            clínicas (GAD-7), mapa corporal, plano de segurança, sinais de risco
            registrados em eventos de segurança.
          </p>
          <p className="text-sm text-oceano-700 leading-relaxed">
            <strong>Uso:</strong> registros de uso de ferramentas, conclusão de
            sessões, métricas semanais agregadas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            Para que usamos
          </h2>
          <ul className="text-sm text-oceano-700 leading-relaxed space-y-1 list-disc list-inside">
            <li>Personalizar sua trilha emocional e recomendações</li>
            <li>Gerar reflexões (espelho cognitivo, síntese semanal)</li>
            <li>Detectar sinais de risco e oferecer suporte adequado</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            Base legal
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            Tratamento de dados sensíveis é feito com base no seu{" "}
            <strong>consentimento explícito</strong> (Art. 11, I) coletado no
            onboarding. Você pode revogar a qualquer momento — isso encerra o
            uso e desencadeia a exclusão dos dados.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            Como protegemos
          </h2>
          <ul className="text-sm text-oceano-700 leading-relaxed space-y-1 list-disc list-inside">
            <li>Conteúdo de diário cifrado em repouso (AES-256-GCM)</li>
            <li>Conexões criptografadas (HTTPS/TLS)</li>
            <li>Logs nunca contêm conteúdo de diário em texto claro</li>
            <li>Acesso interno restrito ao essencial</li>
            <li>Senhas substituídas por magic link e OAuth</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            Inteligência Artificial
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            Para gerar reflexões, enviamos trechos do seu texto JÁ ANONIMIZADOS
            (sem nome, e-mail, telefone, CPF) ao provedor de IA (Groq Cloud,
            EUA). O texto NUNCA contém identificadores diretos. Logs internos
            guardam só hash do prompt e metadados — não o conteúdo.
          </p>
          <p className="text-sm text-oceano-700 leading-relaxed">
            A IA NÃO diagnostica, NÃO prescreve medicamento e NÃO substitui
            terapia. Toda saída passa por filtros antes de chegar até você.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            Seus direitos (LGPD Art. 18)
          </h2>
          <ul className="text-sm text-oceano-700 leading-relaxed space-y-1 list-disc list-inside">
            <li>Acesso aos seus dados</li>
            <li>Correção de dados incompletos ou inexatos</li>
            <li>Anonimização ou exclusão</li>
            <li>Portabilidade (exportação em formato legível)</li>
            <li>Revogação do consentimento</li>
            <li>Reclamação à ANPD</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            Retenção
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            Mantemos seus dados enquanto você usa o serviço. Ao solicitar
            exclusão, todos os dados pessoais são apagados em até 15 dias,
            salvo retenção legal obrigatória.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            Compartilhamento
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            Não vendemos seus dados. Compartilhamos só com provedores
            essenciais (hospedagem, IA anonimizada, e-mail transacional) sob
            contratos de proteção de dados.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-oceano-800">
            Contato e DPO
          </h2>
          <p className="text-sm text-oceano-700 leading-relaxed">
            Encarregado de Proteção de Dados:{" "}
            <a
              href="mailto:dpo@gpsemocional.com.br"
              className="text-brisa-600 underline underline-offset-2"
            >
              dpo@gpsemocional.com.br
            </a>
          </p>
        </section>

        <section className="space-y-2 rounded-2xl bg-areia-50 border border-oceano-100 p-4">
          <p className="text-xs text-oceano-700 leading-relaxed">
            <strong>Em crise emocional</strong>, ligue para o{" "}
            <a
              href="tel:188"
              className="text-coral-600 underline underline-offset-2"
            >
              CVV — 188
            </a>{" "}
            (24h, gratuito). Esta política de privacidade não substitui suporte
            humano em momentos críticos.
          </p>
        </section>
      </article>
    </main>
  );
}
