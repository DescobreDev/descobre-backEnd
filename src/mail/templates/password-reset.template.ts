export function passwordResetEmail({
  name,
  code,
}: {
  name: string;
  code: string;
}) {
  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2>Redefinição de senha</h2>
      <p>Olá, ${name}!</p>
      <p>Use o código abaixo para redefinir sua senha. Ele expira em 15 minutos.</p>
      <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; margin: 24px 0;">
        ${code}
      </div>
      <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
    </div>
  `;

  const text = `Olá, ${name}! Seu código para redefinir a senha é: ${code}. Ele expira em 15 minutos.`;

  return { html, text };
}
