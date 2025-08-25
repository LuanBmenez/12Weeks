import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

export const CreateButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  .room-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid #e5e7eb;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-color: #3b82f6;
    }
    
    .room-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      
      h3 {
        margin: 0;
        color: #1f2937;
        font-size: 1.25rem;
        font-weight: 600;
        flex: 1;
      }
      
      .participant-count {
        background: #f3f4f6;
        color: #6b7280;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        font-weight: 500;
      }
    }
    
    .room-description {
      color: #6b7280;
      margin: 0 0 1.5rem 0;
      line-height: 1.5;
      font-size: 0.9rem;
    }
    
    .room-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .creation-date {
        color: #9ca3af;
        font-size: 0.875rem;
      }
      
      .enter-button {
        background: #10b981;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        font-size: 0.875rem;
        transition: background-color 0.2s;
        
        &:hover {
          background: #059669;
        }
      }
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #1f2937;
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }
  
  p {
    color: #6b7280;
    margin: 0 0 2rem 0;
    font-size: 1.1rem;
  }
  
  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.2s;
    
    &:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  
  &::after {
    content: '';
    width: 3rem;
    height: 3rem;
    border: 3px solid #e5e7eb;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ResponsiveContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`;


export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const CancelButton = styled.button`
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #e5e7eb;
  }
`;

export const SubmitButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #2563eb;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;
