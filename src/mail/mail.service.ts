// import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import * as Brevo from '@getbrevo/brevo';

// @Injectable()
// export class MailService {
//   private apiInstance: Brevo.TransactionalEmailsApi;

//   constructor() {
//     const apiKey = process.env.BREVO_API_KEY;

//     if (!apiKey) {
//       throw new Error('BREVO_API_KEY não definida no .env');
//     }

//     this.apiInstance = new Brevo.TransactionalEmailsApi();
//     this.apiInstance.setApiKey(
//       Brevo.TransactionalEmailsApiApiKeys.apiKey,
//       apiKey,
//     );
//   }

//   async sendVerificationCode(email: string, code: string, name: string) {
//     try {
//       const sendSmtpEmail = new Brevo.SendSmtpEmail();

//       sendSmtpEmail.to = [{ email, name }];
//       sendSmtpEmail.sender = {
//         email: 'noreply@seudominio.com',
//         name: 'Descobre',
//       };
//       sendSmtpEmail.subject = 'Seu código de verificação';
//       sendSmtpEmail.htmlContent = `
//         <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
//           <h2>Confirme seu email</h2>
//           <p>Use o código abaixo para ativar sua conta:</p>
//           <div style="font-size: 36px; font-weight: bold; 
//                       letter-spacing: 8px; color: #4F46E5;
//                       text-align: center; padding: 20px;">
//             ${code}
//           </div>
//           <p style="color: #666; font-size: 14px;">
//             Este código expira em <strong>15 minutos</strong>.
//           </p>
//         </div>
//       `;

//     //   await this.apiInstance.sendTransacEmail(sendSmtpEmail);
//     } catch (error) {
//       console.error('[MAIL_ERROR]', error);
//       throw new InternalServerErrorException('Erro ao enviar email');
//     }
//   }
// }