const BRAND_ORANGE = '#f97316';
const BRAND_ORANGE_DARK = '#ea580c';
const BRAND_DARK = '#171310';
const TEXT_MAIN = '#1f2937';
const TEXT_MUTED = '#6b7280';
const BORDER = '#e5e7eb';

interface VerificationCodeEmailParams {
  name: string;
  code: string;
  expiresInMinutes?: number;
}

export function verificationCodeEmail({
  name,
  code,
  expiresInMinutes = 15,
}: VerificationCodeEmailParams): { html: string; text: string } {
  const codeDigits = code
    .split('')
    .join('<span style="display:inline-block;width:8px;"></span>');

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Confirme seu email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f5; font-family:'Segoe UI', Helvetica, Arial, sans-serif;">
    <!-- Preheader (hidden preview text) -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      Seu código de verificação Descobre expira em ${expiresInMinutes} minutos.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid ${BORDER};">

            <!-- Header -->
            <tr>
              <td style="background-color:${BRAND_DARK}; padding:28px 32px;">
                <span style="font-size:18px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">
                  Descobre
                </span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 32px 28px;">
                <h1 style="margin:0 0 12px; font-size:20px; font-weight:700; color:${TEXT_MAIN};">
                  Confirme seu email
                </h1>
                <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:${TEXT_MUTED};">
                  Olá, <strong style="color:${TEXT_MAIN};">${name}</strong>! Use o código abaixo para ativar sua conta.
                </p>

                <!-- Code block -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="background-color:#fff7ed; border:1px solid #fed7aa; border-radius:10px; padding:20px;">
                      <span style="font-size:34px; font-weight:700; color:${BRAND_ORANGE_DARK}; font-family:'Courier New', monospace;">
                        ${codeDigits}
                      </span>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 0; font-size:13px; line-height:1.6; color:${TEXT_MUTED};">
                  Este código expira em <strong style="color:${TEXT_MAIN};">${expiresInMinutes} minutos</strong>.<br />
                  Se você não criou uma conta no Descobre, pode ignorar este email com segurança.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px; border-top:1px solid ${BORDER}; background-color:#fafafa;">
                <p style="margin:0; font-size:12px; color:#9ca3af; text-align:center;">
                  © ${new Date().getFullYear()} Descobre · Dúvidas? <a href="mailto:suporte@descobre.com.br" style="color:${BRAND_ORANGE};">suporte@descobre.com.br</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();

  const text = [
    `Confirme seu email`,
    ``,
    `Olá, ${name}! Use o código abaixo para ativar sua conta:`,
    ``,
    `Código: ${code}`,
    ``,
    `Este código expira em ${expiresInMinutes} minutos.`,
    `Se você não criou uma conta no Descobre, pode ignorar este email.`,
  ].join('\n');

  return { html, text };
}
