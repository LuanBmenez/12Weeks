import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
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
  Input,
  SubmitButton,
  BackButton,
  MessageBox,
  SuccessMessage,
  ErrorMessage,
  LoadingText,
  Spinner
} from "./style";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: "error", text: "Por favor, insira seu email" });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await authAPI.forgotPassword(email.trim());
      
      setMessage({ 
        type: "success", 
        text: response.data.message 
      });
      
      
      setEmail("");
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao processar solicitação';
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <BackButton onClick={() => navigate("/login")}>
          <ArrowLeft size={20} />
          Voltar ao login
        </BackButton>
        
        <Header>
          <IconBox>
            <Mail size={32} style={{ color: "#fff" }} />
          </IconBox>
          <Title>Recuperar Senha</Title>
          <Subtitle>
            Digite seu email para receber instruções de recuperação
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
            <Label htmlFor="email">Email</Label>
            <InputWrapper>
              <IconLeft>
                <Mail size={20} />
              </IconLeft>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                disabled={isLoading}
                required
              />
            </InputWrapper>
          </Field>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner />
                <LoadingText>Enviando...</LoadingText>
              </>
            ) : (
              "Enviar instruções"
            )}
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  );
}
