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
  margin-bottom: 16px;
  position: relative;
  
  ${props => props.isOwner && `
    flex-direction: row-reverse;
    
    ${MessageInfo} {
      margin-right: 12px;
      margin-left: 0;
      text-align: right;
      align-items: flex-end;
    }
    
    ${Avatar} {
      margin-right: 0;
      margin-left: 12px;
    }
    

    &:hover .edit-button-container {
      opacity: 1 !important;
    }
  `}
`;

export const MessageInfo = styled.div`
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const MessageAuthor = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  margin-bottom: 4px;
`;

export const MessageText = styled.div`
  margin: 4px 0;
  word-wrap: break-word;
  line-height: 1.4;
  color: #333;
`;

export const MessageTime = styled.div`
  font-size: 11px;
  color: #666;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  align-self: flex-end;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b82f6;
  color: white;
  font-weight: bold;
  font-size: 16px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ActionButton = styled.button`
  background: #f3f4f6;
  border: none;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #666;
  
  &:hover {
    background: #e5e7eb;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const EditInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const EditActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
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
