import styled from 'styled-components';

export const NotificationDropdownContainer = styled.div`
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 20rem;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  border: 1px solid #e5e7eb;
  padding: 0.5rem 0;
  z-index: 50;
`;

export const NotificationHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
`;

export const NotificationTitle = styled.h3`
  font-weight: 600;
  color: #111827;
`;

export const NotificationList = styled.div`
  max-height: 16rem;
  overflow-y: auto;
`;

export const NotificationItem = styled.div`
  padding: 1rem;
  transition: background 0.2s;
  &:hover { 
    background: #f9fafb; 
  }
`;

export const NotificationText = styled.p`
  font-size: 0.875rem;
  color: #111827;
`;

export const NotificationTime = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

