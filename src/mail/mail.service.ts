import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailService {
  private apiKey: string;
  private baseUrl = 'https://api.brevo.com/v3';

  constructor() {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) throw new Error('BREVO_API_KEY não definida no .env');
    this.apiKey = apiKey;
  }

  private async post(endpoint: string, body: object) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'api-key': this.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    return response.json();
  }

  async sendVerificationCode(email: string, code: string, name: string) {
    try {
      await this.post('/smtp/email', {
        sender: { email: 'app@descobre.app.br', name: 'Descobre' },
        to: [{ email, name }],
        subject: 'Seu código de verificação',
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 420px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #1F2937;">Confirme seu email</h2>
            <p style="color: #4B5563;">Olá, <strong>${name}</strong>! Use o código abaixo para ativar sua conta:</p>
            <div style="
              font-size: 38px;
              font-weight: 700;
              letter-spacing: 10px;
              color: #4F46E5;
              text-align: center;
              padding: 24px;
              background: #F5F3FF;
              border-radius: 12px;
              margin: 24px 0;
            ">
              ${code}
            </div>
            <p style="color: #6B7280; font-size: 14px;">
              Este código expira em <strong>15 minutos</strong>.<br/>
              Se você não criou uma conta, ignore este email.
            </p>
          </div>
        `,
      });

      console.log('enviado');

    } catch (error) {
      console.error('[MAIL_ERROR]', error);
      throw new InternalServerErrorException('Erro ao enviar email');
    }
  }
}