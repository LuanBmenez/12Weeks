import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });


class EmailService {
  constructor() {

    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error('❌ Credenciais de email não configuradas');
      this.transporter = null;
      return;
    }
    
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });
  }

  async testConnection() {
    try {
      if (!this.transporter) {
        console.error('❌ Transporter não foi criado - verifique as credenciais');
        return false;
      }
      
      await this.transporter.verify();
      console.log('✅ Conexão com servidor de email estabelecida com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ Erro na conexão com servidor de email:', error.message);
      return false;
    }
  }

  async sendPasswordResetEmail(email, resetToken, userName) {
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      
      const mailOptions = {
        from: `"12Weeks App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Recuperação de Senha - 12Weeks',
        html: this.generatePasswordResetHTML(userName, resetUrl),
        text: this.generatePasswordResetText(userName, resetUrl)
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('📧 Email de recuperação enviado com sucesso para:', email);
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('❌ Erro ao enviar email de recuperação:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  generatePasswordResetHTML(userName, resetUrl) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Recuperação de Senha - 12Weeks</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Recuperação de Senha</h1>
          </div>
          <div class="content">
            <p>Olá <strong>${userName}</strong>,</p>
            <p>Recebemos uma solicitação para redefinir sua senha na plataforma 12Weeks.</p>
            <p>Clique no botão abaixo para criar uma nova senha:</p>
            <a href="${resetUrl}" class="button">🔑 Redefinir Senha</a>
            <p><strong>Este link expira em 1 hora.</strong></p>
            <p>Se você não solicitou esta recuperação, ignore este email.</p>
            <p>Se o botão não funcionar, copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; color:rgb(127, 121, 233);">${resetUrl}</p>
          </div>
          <div class="footer">
            <p>12Weeks - Transforme seus objetivos em realidade</p>
            <p>Este é um email automático, não responda a esta mensagem.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generatePasswordResetText(userName, resetUrl) {
    return `
Recuperação de Senha - 12Weeks

Olá ${userName},

Recebemos uma solicitação para redefinir sua senha na plataforma 12Weeks.

Para criar uma nova senha, acesse este link:
${resetUrl}

Este link expira em 1 hora.

Se você não solicitou esta recuperação, ignore este email.

12Weeks - Transforme seus objetivos em realidade
    `;
  }
}

export default new EmailService();
