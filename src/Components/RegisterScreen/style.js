import styled from 'styled-components';


export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #eff6ff, #c7d2fe);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
export const Card = styled.div`
  width: 100%;
  max-width: 28rem;
`;
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  background: #e0e7ff;
  border: none;
  border-radius: 0.75rem;
  padding: 0.5rem 1.25rem;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    background: #c7d2fe;
    color: #1d4ed8;
    box-shadow: 0 4px 16px rgba(37,99,235,0.15);
    transform: translateY(-2px);
  }
`;
export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;
export const IconBox = styled.div`
  width: 4rem;
  height: 4rem;
  background: #2563eb;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
`;
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
`;
export const Subtitle = styled.p`
  color: #4b5563;
`;
export const FormCard = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 4px 32px rgba(0,0,0,0.10);
  padding: 2rem;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const Field = styled.div``;
export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;
export const InputWrapper = styled.div`
  position: relative;
`;
export const Input = styled.input`
  width: 85%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 1rem;
  border: 1px solid ${props => props.hasError ? '#fca5a5' : '#d1d5db'};
  background: ${props => props.hasError ? '#fee2e2' : '#fff'};
  font-size: 1rem;
  transition: border 0.2s, background 0.2s;
  &:hover { border-color: #9ca3af; }
  &:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px #2563eb33; }
`;
export const ErrorText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc2626;
`;
export const IconLeft = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;
export const IconRight = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #4b5563; }
`;
export const TermsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;
export const TermsLabel = styled.label`
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
`;
export const TermsLink = styled.button`
  color: #2563eb;
  background: none;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #1d4ed8; }
`;
export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-weight: 500;
  color: #fff;
  background: ${props => props.disabled ? '#60a5fa' : '#2563eb'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  box-shadow: ${props => props.disabled ? 'none' : '0 4px 16px rgba(37,99,235,0.15)'};
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover { background: ${props => props.disabled ? '#60a5fa' : '#1d4ed8'}; transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'}; }
`;
export const Spinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;
export const Divider = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;
export const DividerText = styled.p`
  text-align: center;
  color: #4b5563;
`;
export const LoginLink = styled.button`
  color: #2563eb;
  background: none;
  border: none;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #1d4ed8; }
`;
