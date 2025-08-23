import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  
} from "./style";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, UserPlus, User } from "lucide-react";

export default function RegisterScreen({ onSwitchToLogin, onRegister }) {
  const navigate = useNavigate();
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
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

    // Simular chamada de API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    if (onRegister) {
      onRegister();
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Container>
      <Card>
        <BackButton
          onClick={onSwitchToLogin ? onSwitchToLogin : () => navigate("/login")}
        >
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
          <Form onSubmit={handleSubmit}>
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
                />
              </InputWrapper>
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
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
                />
              </InputWrapper>
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
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
                  placeholder="••••••••"
                />
                <IconRight
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconRight>
              </InputWrapper>
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
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
                <ErrorText>{errors.confirmPassword}</ErrorText>
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
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner />
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
              <LoginLink
                onClick={
                  onSwitchToLogin ? onSwitchToLogin : () => navigate("/login")
                }
              >
                Faça login
              </LoginLink>
            </DividerText>
          </Divider>
        </FormCard>
      </Card>
    </Container>
  );
}
