import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { authAPI } from "../../config/api";
import {
  Container,
  Card,
  Header,
  IconBox,
  Title,
  Subtitle,
  Form,
  Field,
  Label,
  InputWrapper,
  IconLeft,
  IconRight,
  Input,
  SubmitButton,
  BackButton,
  MessageBox,
  SuccessMessage,
  ErrorMessage,
  LoadingText,
  Spinner,
  PasswordStrengthIndicator,
  StrengthBar,
  StrengthFill,
  StrengthText,
  PasswordRequirements,
  RequirementItem
} from "./style";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await authAPI.verifyResetToken(token);
      setUserEmail(response.data.email);
      setIsValidating(false);
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: "Link inválido ou expirado. Solicite um novo link de recuperação." 
      });
      setIsValidating(false);
    }
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const getPasswordStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    const checks = [
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    ];
    
    strength = checks.filter(Boolean).length;
    
    if (password.length >= 8) strength = Math.min(4, strength);
    if (password.length < 6) strength = Math.max(0, strength - 1);
    
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch(strength) {
      case 0: return '';
      case 1: return 'Muito fraca';
      case 2: return 'Fraca';
      case 3: return 'Boa';
      case 4: return 'Forte';
      default: return '';
    }
  };

  const getPasswordRequirements = (password) => {
    return [
      { text: 'Pelo menos 8 caracteres', met: password.length >= 8 },
      { text: 'Uma letra minúscula', met: /[a-z]/.test(password) },
      { text: 'Uma letra maiúscula', met: /[A-Z]/.test(password) },
      { text: 'Um número', met: /\d/.test(password) },
      { text: 'Um caractere especial', met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) }
    ];
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (message.type) {
      setMessage({ type: "", text: "" });
    }
  };

  const validateForm = () => {
    if (!formData.password) {
      setMessage({ type: "error", text: "Nova senha é obrigatória" });
      return false;
    }
    
    if (formData.password.length < 8) {
      setMessage({ type: "error", text: "Senha deve ter pelo menos 8 caracteres" });
      return false;
    }
    
    if (!validatePassword(formData.password)) {
      setMessage({ type: "error", text: "Senha deve conter: 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial" });
      return false;
    }
    
    if (!formData.confirmPassword) {
      setMessage({ type: "error", text: "Confirme sua nova senha" });
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Senhas não coincidem" });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await authAPI.resetPassword(token, formData.password);
      
      setMessage({ 
        type: "success", 
        text: "Senha redefinida com sucesso! Redirecionando para o login..." 
      });
      
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao redefinir senha';
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <Container>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spinner />
            <LoadingText>Validando link...</LoadingText>
          </div>
        </Card>
      </Container>
    );
  }

  if (message.type === "error" && !userEmail) {
    return (
      <Container>
        <Card>
          <Header>
            <IconBox>
              <AlertCircle size={32} style={{ color: "#fff" }} />
            </IconBox>
            <Title>Link Inválido</Title>
            <Subtitle>{message.text}</Subtitle>
          </Header>
          <BackButton onClick={() => navigate("/forgot-password")}>
            Solicitar novo link
          </BackButton>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <BackButton onClick={() => navigate("/forgot-password")}>
          <ArrowLeft size={20} />
          Voltar
        </BackButton>
        
        <Header>
          <IconBox>
            <Lock size={32} style={{ color: "#fff" }} />
          </IconBox>
          <Title>Nova Senha</Title>
          <Subtitle>
            Digite sua nova senha para a conta {userEmail}
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {message.type === "success" && (
            <SuccessMessage>
              <CheckCircle size={16} />
              {message.text}
            </SuccessMessage>
          )}
          
          {message.type === "error" && (
            <ErrorMessage>
              <AlertCircle size={16} />
              {message.text}
            </ErrorMessage>
          )}

          <Field>
            <Label htmlFor="password">Nova senha</Label>
            <InputWrapper>
              <IconLeft>
                <Lock size={20} />
              </IconLeft>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Mínimo 8 caracteres"
                disabled={isLoading}
                required
              />
              <IconRight
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconRight>
            </InputWrapper>
            
            {formData.password && (
              <PasswordStrengthIndicator>
                <StrengthBar>
                  <StrengthFill strength={getPasswordStrength(formData.password)} />
                </StrengthBar>
                <StrengthText strength={getPasswordStrength(formData.password)}>
                  Força da senha: {getPasswordStrengthText(getPasswordStrength(formData.password))}
                </StrengthText>
                <PasswordRequirements>
                  {getPasswordRequirements(formData.password).map((req, index) => (
                    <RequirementItem key={index} met={req.met}>
                      {req.met ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      {req.text}
                    </RequirementItem>
                  ))}
                </PasswordRequirements>
              </PasswordStrengthIndicator>
            )}
          </Field>

          <Field>
            <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
            <InputWrapper>
              <IconLeft>
                <Lock size={20} />
              </IconLeft>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                required
              />
              <IconRight
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconRight>
            </InputWrapper>
          </Field>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner />
                <LoadingText>Redefinindo...</LoadingText>
              </>
            ) : (
              "Redefinir senha"
            )}
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  );
}
