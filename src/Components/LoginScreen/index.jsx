import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import {
  Container,
  Card,
  Divider,
  DividerText,
  ErrorText,
  Field,
  ForgotPassword,
  Form,
  FormCard,
  Header,
  IconBox,
  IconLeft,
  IconRight,
  Input,
  InputWrapper,
  Label,
  RegisterLink,
  Spinner,
  SubmitButton,
  Subtitle,
  Title,
} from "./style";
import { authAPI } from "../../config/api";

export default function LoginScreen({ onSwitchToRegister, onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    // Clear API error when user starts typing
    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError("");

    try {
      const response = await authAPI.login({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (!response.ok) {
        // Erro do servidor
        if (response.data.errors && Array.isArray(response.data.errors)) {
          // Erros de validação do backend
          const backendErrors = {};
          response.data.errors.forEach(error => {
            if (error.path === 'email') backendErrors.email = error.msg;
            if (error.path === 'password') backendErrors.password = error.msg;
          });
          setErrors(backendErrors);
        } else {
          // Erro geral do servidor
          setApiError(response.data.message || 'Erro ao fazer login');
        }
        return;
      }

      // Sucesso!
      console.log('Login realizado:', response.data);
      
      // Salvar token no localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Redirecionar ou chamar callback
      if (onLogin) {
        onLogin(response.data);
      } else {
        navigate("/dashboard");
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
        <Header>
          <IconBox>
            <Lock size={32} style={{ color: "#fff" }} />
          </IconBox>
          <Title>Bem-vindo ao 12WEEKS</Title>
          <Subtitle>Entre na sua conta para continuar</Subtitle>
        </Header>
        <FormCard>
          <Form onSubmit={handleSubmit}>
            {/* Erro geral da API */}
            {apiError && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                color: '#dc2626',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {apiError}
              </div>
            )}
            
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
                  $hasError={!!errors.email}
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
                  $hasError={!!errors.password}
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
            <ForgotPassword type="button">Esqueceu a senha?</ForgotPassword>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight size={20} />
                </>
              )}
            </SubmitButton>
          </Form>
          <Divider>
            <DividerText>
              Não tem uma conta?{" "}
              <RegisterLink
                onClick={
                  onSwitchToRegister
                    ? onSwitchToRegister
                    : () => navigate("/register")
                }
              >
                Cadastre-se
              </RegisterLink>
            </DividerText>
          </Divider>
        </FormCard>
      </Card>
    </Container>
  );
}
