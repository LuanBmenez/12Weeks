import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, RefreshCw, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useToast } from '../../components/Toast/index.jsx';
import config from '../../config/config';
import {
  Container,
  Card,
  Header,
  Title,
  Subtitle,
  CodeInputContainer,
  CodeInput,
  Button,
  ResendButton,
  Footer,
  IconContainer
} from './style';

const EmailVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithToken } = useAuth();
  const { showSuccess, showError } = useToast();

  const email = location.state?.email;
  const tempUserId = location.state?.tempUserId;

  useEffect(() => {
    if (!email) {
      navigate('/register');
      return;
    }

   
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

   
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="code-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }

    
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerification(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="code-${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerification = async (verificationCode = null) => {
    const codeToVerify = verificationCode || code.join('');
    
    if (codeToVerify.length !== 6) {
      showError('Por favor, insira o código completo de 6 dígitos');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${config.API_BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          code: codeToVerify
        })
      });

      const data = await response.json();
      console.log('Resposta da verificação:', data);

      if (!response.ok) {
        showError(data.message || 'Erro na verificação');
        return;
      }

      
      console.log('Fazendo login com:', { user: data.user, token: data.token });
      loginWithToken(data.user, data.token);
      showSuccess('Conta criada com sucesso! Bem-vindo ao 12Weeks! 🎉');

    } catch (error) {
      console.error('Erro na verificação:', error);
      showError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);

      const response = await fetch(`${config.API_BASE_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message || 'Erro ao reenviar código');
        return;
      }

      showSuccess('Código reenviado com sucesso!');
      setCanResend(false);
      setCountdown(60);
      setCode(['', '', '', '', '', '']);

    } catch (error) {
      console.error('Erro ao reenviar:', error);
      showError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setResendLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <Header>
            <IconContainer>
              <Mail size={48} />
            </IconContainer>
            <Title>Verifique seu Email</Title>
            <Subtitle>
              Enviamos um código de 6 dígitos para<br />
              <strong>{email}</strong>
            </Subtitle>
          </Header>

          <CodeInputContainer>
            {code.map((digit, index) => (
              <CodeInput
                key={index}
                name={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                disabled={loading}
              />
            ))}
          </CodeInputContainer>

          <Button
            onClick={() => handleVerification()}
            disabled={loading || code.some(digit => digit === '')}
          >
            {loading ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Verificar Código
              </>
            )}
          </Button>

          <Footer>
            <p>Não recebeu o código?</p>
            <ResendButton
              onClick={handleResend}
              disabled={!canResend || resendLoading}
            >
              {resendLoading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Reenviando...
                </>
              ) : canResend ? (
                'Reenviar código'
              ) : (
                `Reenviar em ${countdown}s`
              )}
            </ResendButton>
          </Footer>
        </Card>
      </motion.div>
    </Container>
  );
};

export default EmailVerification;
