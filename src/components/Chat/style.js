import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 380px;
  height: 500px;
  max-height: calc(100vh - 4rem);
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  z-index: 1001;
  animation: ${slideUp} 0.3s ease-out;
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e2e8f0;
  
  h2 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #9ca3af;
  padding: 5px;
  line-height: 1;
  border-radius: 50%;
  
  &:hover {
    color: #4b5563;
    background: #f1f5f9;
  }
`;

export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MessageBubble = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  max-width: 80%;
  align-self: ${props => props.isOwner ? 'flex-end' : 'flex-start'};
  flex-direction: ${props => props.isOwner ? 'row-reverse' : 'row'};
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const MessageInfo = styled.div`
  background: ${props => props.isOwner ? '#dcf8c6' : '#fff'};
  padding: 10px 15px;
  border-radius: 18px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isOwner ? 'flex-end' : 'flex-start'};
`;

export const MessageAuthor = styled.span`
  font-weight: bold;
  font-size: 0.9em;
  color: #333;
  margin-bottom: 5px;
`;

export const MessageText = styled.p`
  margin: 0;
  color: #111;
  word-wrap: break-word;
  text-align: left;
`;

export const MessageTime = styled.span`
  font-size: 0.75em;
  color: #999;
  margin-top: 5px;
`;

export const MessageForm = styled.form`
  display: flex;
  margin-top: 15px;

  input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px 0 0 20px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #007bff;
    }
  }

  button {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #0056b3;
    }
  }
`;
