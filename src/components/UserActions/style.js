import styled from 'styled-components';

export const UserActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;



export const NotificationDot = styled.span`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  background: #ef4444;
  border-radius: 9999px;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #4b5563;
  background: none;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
  &:hover { 
    color: #dc2626; 
    background: #fee2e2; 
  }
`;

