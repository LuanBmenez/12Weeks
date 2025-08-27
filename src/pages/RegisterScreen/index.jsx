import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Divider,
  BackButton,
  Card,
  Container,
  DividerText,
  ErrorText,
  Field,
  Form,
  FormCard,
  Header,
  IconBox,
  IconLeft,
  IconRight,
  Input,
  InputWrapper,
  Label,
  LoginLink,
  Spinner,
  SubmitButton,
  Subtitle,
  TermsLabel,
  TermsLink,
  TermsWrapper,
  Title,
  PasswordStrengthIndicator,
  StrengthBar,
  StrengthFill,
  StrengthText,
  PasswordRequirements,
  RequirementItem,
  ErrorAlert,
  LoadingText,
} from "./style";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, UserPlus, User, Check, X, AlertCircle } from "lucide-react";

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (apiError) {
      setApiError("");
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
      /[a-z]/.test(password), // lowercase
      /[A-Z]/.test(password), // uppercase
      /\d/.test(password), // number
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) // special char
    ];
    
    strength = checks.filter(Boolean).length;
    
    // Bonus for length
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter pelo menos 8 caracteres";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Senha deve conter: 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (!result.success) {
        setApiError(result.error);
      }


    } catch (error) {
      console.error('Erro na requisição:', error);
      setApiError('Erro de conexão. Verifique se o servidor está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <BackButton onClick={() => navigate("/login")}>
          <ArrowLeft className="w-5 h-5" />
          Voltar ao login
        </BackButton>
        <Header>
          <IconBox>
            <UserPlus className="w-8 h-8" style={{ color: "#fff" }} />
          </IconBox>
          <Title>Criar conta</Title>
          <Subtitle>Preencha os dados para se cadastrar</Subtitle>
        </Header>
        <FormCard>
          <Form onSubmit={handleSubmit} role="form" aria-label="Formulário de cadastro">
    
            {apiError && (
              <ErrorAlert>
                <AlertCircle size={16} />
                {apiError}
              </ErrorAlert>
            )}
            
            <Field>
              <Label htmlFor="name">Nome completo</Label>
              <InputWrapper>
                <IconLeft>
                  <User size={20} />
                </IconLeft>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  hasError={!!errors.name}
                  placeholder="Seu nome completo"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                />
              </InputWrapper>
              {errors.name && (
                <ErrorText id="name-error" role="alert">
                  <AlertCircle size={14} />
                  {errors.name}
                </ErrorText>
              )}
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <InputWrapper>
                <IconLeft>
                  <Mail size={20} />
                </IconLeft>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  hasError={!!errors.email}
                  placeholder="seu@email.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                />
              </InputWrapper>
              {errors.email && (
                <ErrorText id="email-error" role="alert">
                  <AlertCircle size={14} />
                  {errors.email}
                </ErrorText>
              )}
            </Field>
            <Field>
              <Label htmlFor="password">Senha</Label>
              <InputWrapper>
                <IconLeft>
                  <Lock size={20} />
                </IconLeft>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  hasError={!!errors.password}
                  placeholder="Mínimo 8 caracteres"
                  aria-describedby={errors.password ? "password-error" : "password-strength"}
                  aria-invalid={!!errors.password}
                />
                <IconRight
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconRight>
              </InputWrapper>
              {errors.password && (
                <ErrorText id="password-error" role="alert">
                  <AlertCircle size={14} />
                  {errors.password}
                </ErrorText>
              )}
              
              {formData.password && (
                <PasswordStrengthIndicator id="password-strength" role="status" aria-live="polite">
                  <StrengthBar aria-hidden="true">
                    <StrengthFill strength={getPasswordStrength(formData.password)} />
                  </StrengthBar>
                  <StrengthText strength={getPasswordStrength(formData.password)}>
                    Força da senha: {getPasswordStrengthText(getPasswordStrength(formData.password))}
                  </StrengthText>
                  <PasswordRequirements>
                    {getPasswordRequirements(formData.password).map((req, index) => (
                      <RequirementItem key={index} met={req.met} aria-label={req.met ? `${req.text} - atendido` : `${req.text} - não atendido`}>
                        {req.met ? <Check size={12} aria-hidden="true" /> : <X size={12} aria-hidden="true" />}
                        {req.text}
                      </RequirementItem>
                    ))}
                  </PasswordRequirements>
                </PasswordStrengthIndicator>
              )}
            </Field>
            <Field>
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <InputWrapper>
                <IconLeft>
                  <Lock size={20} />
                </IconLeft>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  hasError={!!errors.confirmPassword}
                  placeholder="••••••••"
                />
                <IconRight
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </IconRight>
              </InputWrapper>
              {errors.confirmPassword && (
                <ErrorText>
                  <AlertCircle size={14} />
                  {errors.confirmPassword}
                </ErrorText>
              )}
            </Field>
            <TermsWrapper>
              <input
                type="checkbox"
                id="terms"
                style={{
                  marginTop: "0.25rem",
                  width: "1rem",
                  height: "1rem",
                  accentColor: "#2563eb",
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                }}
                required
              />
              <TermsLabel htmlFor="terms">
                Concordo com os{" "}
                <TermsLink type="button">Termos de Uso</TermsLink> e{" "}
                <TermsLink type="button">Política de Privacidade</TermsLink>
              </TermsLabel>
            </TermsWrapper>
            <SubmitButton type="submit" disabled={isLoading} aria-describedby={isLoading ? "loading-message" : undefined}>
              {isLoading ? (
                <>
                  <Spinner />
                  <LoadingText id="loading-message">Criando conta...</LoadingText>
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Criar conta
                </>
              )}
            </SubmitButton>
          </Form>
          <Divider>
            <DividerText>
              Já tem uma conta?{" "}
              <LoginLink onClick={() => navigate("/login")}>
                Faça login
              </LoginLink>
            </DividerText>
          </Divider>
        </FormCard>
      </Card>
    </Container>
  );
}
