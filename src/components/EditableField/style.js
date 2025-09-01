import styled, { css } from 'styled-components';

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

export const DisplayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  min-height: 42px;
`;

export const ValueDisplay = styled.span`
  font-size: 1rem;
  color: #111827;
`;

export const EditIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #111827;
    background-color: #e5e7eb;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #9ca3af;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #111827;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  ${({ variant }) =>
    variant === 'save' &&
    css`
      background-color: #2563eb;
      color: white;
      &:hover {
        background-color: #1d4ed8;
      }
    `}

  ${({ variant }) =>
    variant === 'cancel' &&
    css`
      background-color: #e5e7eb;
      color: #374151;
      &:hover {
        background-color: #d1d5db;
      }
    `}
`;
