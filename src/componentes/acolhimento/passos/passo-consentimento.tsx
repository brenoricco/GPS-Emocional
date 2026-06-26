"use client";

interface PropsPasso {
  termosAceitos: boolean;
  consentimentoDadosSensiveis: boolean;
  aoMudarTermos: (valor: boolean) => void;
  aoMudarConsentimento: (valor: boolean) => void;
}

export function PassoConsentimento({
  termosAceitos,
  consentimentoDadosSensiveis,
  aoMudarTermos,
  aoMudarConsentimento,
}: PropsPasso) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h2 className="text-2xl font-light text-oceano-800 leading-snug">
          Antes da gente começar.
        </h2>
        <p className="text-sm text-oceano-600 leading-relaxed">
          O que você vai compartilhar aqui é sensível. A gente leva isso a sério.
        </p>
      </header>

      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer select-none min-h-[44px] py-1">
          <input
            type="checkbox"
            checked={termosAceitos}
            onChange={(e) => aoMudarTermos(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-oceano-300 text-brisa-500 focus:ring-brisa-300/40"
          />
          <span className="text-sm leading-relaxed text-oceano-700">
            Li e aceito os{" "}
            <a
              href="/termos"
              target="_blank"
              className="underline underline-offset-2 hover:text-oceano-800"
            >
              Termos de Uso
            </a>{" "}
            e a{" "}
            <a
              href="/privacidade"
              target="_blank"
              className="underline underline-offset-2 hover:text-oceano-800"
            >
              Política de Privacidade
            </a>
            .
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer select-none min-h-[44px] py-1">
          <input
            type="checkbox"
            checked={consentimentoDadosSensiveis}
            onChange={(e) => aoMudarConsentimento(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-oceano-300 text-brisa-500 focus:ring-brisa-300/40"
          />
          <span className="text-sm leading-relaxed text-oceano-700">
            <strong className="text-oceano-800">Consinto</strong> com o
            tratamento de dados pessoais sensíveis de saúde (LGPD Art. 11) pra
            personalização do meu acompanhamento, com criptografia em repouso e
            direito de exclusão a qualquer momento.
          </span>
        </label>
      </div>

      <div className="rounded-2xl bg-areia-50 border border-oceano-100 p-5 text-xs text-oceano-700 leading-relaxed space-y-2">
        <p>
          <strong className="text-oceano-800">Como cuidamos do que é seu:</strong>{" "}
          conteúdo de diário e dados emocionais são cifrados antes de salvar.
          Nada é compartilhado sem você autorizar.
        </p>
        <p>
          Esta ferramenta <strong>não substitui</strong> psicoterapia, avaliação
          ou tratamento médico.
        </p>
      </div>
    </div>
  );
}
