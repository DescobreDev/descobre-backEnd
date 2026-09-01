import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { verificationCodeEmail } from './templates/verification-code.template';
import { passwordResetEmail } from './templates/password-reset.template';

const BREVO_BASE_URL = 'https://api.brevo.com/v3';
const SENDER = { email: 'app@descobre.app.br', name: 'Descobre' };

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly apiKey: string;

  constructor() {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) throw new Error('BREVO_API_KEY não definida no .env');
    this.apiKey = apiKey;
  }

  private async post(endpoint: string, body: object) {
    const response = await fetch(`${BREVO_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'api-key': this.apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    return response.json();
  }

  async sendPasswordResetCode(email: string, code: string, name: string) {
    const { html, text } = passwordResetEmail({ name, code });

    try {
      await this.post('/smtp/email', {
        sender: SENDER,
        to: [{ email, name }],
        subject: 'Redefinição de senha',
        htmlContent: html,
        textContent: text,
      });

      this.logger.log(`Código de redefinição de senha enviado para ${email}`);
    } catch (error) {
      this.logger.error(
        `Falha ao enviar código de redefinição para ${email}`,
        error as Error,
      );
      throw new InternalServerErrorException('Erro ao enviar email');
    }
  }

  async sendVerificationCode(email: string, code: string, name: string) {
    const { html, text } = verificationCodeEmail({ name, code });

    try {
      await this.post('/smtp/email', {
        sender: SENDER,
        to: [{ email, name }],
        subject: 'Seu código de verificação',
        htmlContent: html,
        textContent: text,
      });

      this.logger.log(`Código de verificação enviado para ${email}`);
    } catch (error) {
      this.logger.error(`Falha ao enviar código para ${email}`, error as Error);
      throw new InternalServerErrorException('Erro ao enviar email');
    }
  }
}
