interface ParametrosLinkMagico {
  urlLink: string;
  email: string;
}

interface EmailLinkMagico {
  html: string;
  texto: string;
}

/**
 * Template de email do link mágico (magic link).
 *
 * Tom acolhedor, paleta Oceano Calmo, aviso clínico e CVV no rodapé.
 * HTML inline + tabelas — padrão obrigatório pra clientes de email.
 */
export function gerarEmailLinkMagico({
  urlLink,
  email,
}: ParametrosLinkMagico): EmailLinkMagico {
  const urlBase =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://gpsemocional.com.br";

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <title>Seu link para entrar</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F8FA;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#283C49;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F4F8FA;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:480px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(26,43,53,0.06);">
          <tr>
            <td style="padding:40px 32px 24px 32px;text-align:center;">
              <img src="${urlBase}/logo-completo.png" alt="GPS Emocional" width="140" style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none;height:auto;max-width:140px;" />
              <h1 style="margin:24px 0 0 0;font-size:20px;font-weight:400;color:#283C49;line-height:1.4;">
                Você está aqui.<br />
                <span style="color:#1B6C79;">Esse é o seu link.</span>
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 24px 32px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#195A66;">
                Toque no botão abaixo para entrar no GPS Emocional. Esse link é só seu e expira em 24 horas.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 32px 32px;text-align:center;">
              <a href="${urlLink}"
                 style="display:inline-block;background-color:#338670;color:#FFFFFF;text-decoration:none;padding:16px 32px;border-radius:999px;font-size:16px;font-weight:500;min-width:200px;">
                Entrar no GPS Emocional
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px 32px;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#6F7575;text-align:center;">
                Se o botão não funcionar, copie e cole este endereço no seu navegador:
              </p>
              <p style="margin:8px 0 0 0;font-size:12px;line-height:1.5;color:#8E9494;word-break:break-all;text-align:center;">
                ${urlLink}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px 32px;border-top:1px solid #D5D7D7;">
              <p style="margin:0 0 8px 0;font-size:12px;line-height:1.6;color:#8E9494;text-align:center;">
                Se você não pediu este link, pode ignorar este email com segurança.
              </p>
              <p style="margin:0 0 8px 0;font-size:12px;line-height:1.6;color:#8E9494;text-align:center;">
                Este email foi enviado para <strong style="color:#6F7575;">${email}</strong>.
              </p>
              <p style="margin:16px 0 0 0;font-size:12px;line-height:1.6;color:#8E9494;text-align:center;">
                O GPS Emocional <strong>não substitui</strong> psicoterapia.
              </p>
              <p style="margin:8px 0 0 0;font-size:12px;line-height:1.6;color:#8E9494;text-align:center;">
                Em crise, ligue para o <a href="tel:188" style="color:#C56350;text-decoration:underline;">CVV — 188</a> (24h, gratuito).
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0 0;font-size:11px;color:#8E9494;text-align:center;">
          GPS Emocional · Desenvolvido por psicólogo com registro ativo no CFP.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const texto = `Você está aqui. Esse é o seu link.

Toque no link abaixo para entrar no GPS Emocional. Esse link é só seu e expira em 24 horas.

${urlLink}

Se você não pediu este link, pode ignorar este email com segurança.

Este email foi enviado para ${email}.

O GPS Emocional não substitui psicoterapia. Em crise, ligue para o CVV — 188 (24h, gratuito).

GPS Emocional · Desenvolvido por psicólogo com registro ativo no CFP.`;

  return { html, texto };
}
