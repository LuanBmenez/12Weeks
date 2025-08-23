import styled from 'styled-components';

export const ActionCardContainer = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
  
  &:hover { 
    box-shadow: 0 8px 32px rgba(0,0,0,0.10); 
  }
`;

export const ActionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const ActionIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChevronIcon = styled.div`
  color: #9ca3af;
`;

export const ActionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const ActionDesc = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  font-weight: 500;
  color: #fff;
  background: #2563eb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  box-shadow: 0 4px 16px rgba(37,99,235,0.10);
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  border: none;
  
  &:hover { 
    background: #1d4ed8; 
    transform: translateY(-2px); 
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Spinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin { 
    to { 
      transform: rotate(360deg); 
    } 
  }
`;

