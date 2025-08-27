import dotenv from 'dotenv';
import emailService from './services/emailService.js';

dotenv.config();

async function testEmailService() {
  console.log('🧪 Testando serviço de email...\n');
  
  console.log('📋 Variáveis de ambiente:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Configurado' : '❌ Não configurado');
  console.log('EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD ? '✅ Configurado' : '❌ Não configurado');
  console.log('FRONTEND_URL:', process.env.FRONTEND_URL ? '✅ Configurado' : '❌ Não configurado');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.log('\n❌ Configure as variáveis de ambiente primeiro!');
    console.log('1. Copie env.example para .env');
    console.log('2. Configure EMAIL_USER e EMAIL_APP_PASSWORD');
    console.log('3. Execute novamente este teste');
    return;
  }
  
  console.log('\n🔌 Testando conexão com servidor de email...');
  
  try {
    const connectionTest = await emailService.testConnection();
    
    if (connectionTest) {
      console.log('✅ Conexão estabelecida com sucesso!');
      
      console.log('\n📧 Testando envio de email...');
      
      const testEmail = process.env.EMAIL_USER; 
      const testToken = 'test-token-123456';
      const testName = 'Usuário Teste';
      
      const emailResult = await emailService.sendPasswordResetEmail(
        testEmail, 
        testToken, 
        testName
      );
      
      if (emailResult.success) {
        console.log('✅ Email de teste enviado com sucesso!');
        console.log('📧 Message ID:', emailResult.messageId);
        console.log('📬 Verifique sua caixa de entrada');
      } else {
        console.log('❌ Falha no envio do email:', emailResult.error);
      }
      
    } else {
      console.log('❌ Falha na conexão com servidor de email');
    }
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
  }
}


testEmailService();
