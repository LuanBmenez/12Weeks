import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #111827;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    color: #6b7280;
    transition: all 0.2s;

    &:hover {
      background-color: #f3f4f6;
      color: #374151;
    }
  }
`;

export const ModalTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 24px;
  gap: 4px;
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#2563eb' : '#6b7280'};
  background-color: ${props => props.active ? '#eff6ff' : 'transparent'};
  border-bottom: 2px solid ${props => props.active ? '#2563eb' : 'transparent'};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${props => props.active ? '#eff6ff' : '#f9fafb'};
    color: ${props => props.active ? '#2563eb' : '#374151'};
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  max-height: 60vh;
  overflow-y: auto;
`;

export const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

export const SearchSection = styled.div`
  h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 600;
    color: #111827;
  }

  p {
    margin: 0 0 24px 0;
    color: #6b7280;
    font-size: 14px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SearchButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const UserResult = styled.div`
  margin-top: 24px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

export const UserInfo = styled.div`
  margin-bottom: 16px;
`;

export const UserName = styled.h4`
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

export const UserCode = styled.p`
  margin: 0;
  font-family: 'Courier New', monospace;
  color: #6b7280;
  font-size: 14px;
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  background-color: #16a34a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #15803d;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const ShareSection = styled.div`
  h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 600;
    color: #111827;
  }

  p {
    margin: 0 0 24px 0;
    color: #6b7280;
    font-size: 14px;
  }
`;

export const CodeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

export const CodeText = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 24px;
  font-weight: 600;
  color: #2563eb;
  letter-spacing: 3px;
  flex: 1;
`;

export const CopyButton = styled.button`
  padding: 10px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const CopyMessage = styled.div`
  padding: 12px 16px;
  background-color: #dcfce7;
  color: #166534;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`;

export const RequestsSection = styled.div`
  h3 {
    margin: 0 0 24px 0;
    font-size: 20px;
    font-weight: 600;
    color: #111827;
  }
`;

export const RequestItem = styled.div`
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const RequestInfo = styled.div`
  flex: 1;
`;

export const RequestActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const FriendsSection = styled.div`
  h3 {
    margin: 0 0 24px 0;
    font-size: 20px;
    font-weight: 600;
    color: #111827;
  }
`;

export const FriendItem = styled.div`
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 16px;
  position: relative;
`;

export const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

export const RemoveButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b91c1c;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;

  svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }

  p {
    margin: 8px 0;
    font-size: 16px;
  }
`;

export const ErrorMessage = styled.div`
  padding: 12px 16px;
  background-color: #fef2f2;
  color: #dc2626;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  border: 1px solid #fecaca;
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
