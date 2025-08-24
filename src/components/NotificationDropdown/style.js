import styled from 'styled-components';

export const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
  }
`;

export const MarkAllReadButton = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #eff6ff;
  }
`;

export const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export const NotificationItem = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  background-color: ${props => props.$isUnread ? '#f0f9ff' : 'white'};
  position: relative;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.$isUnread ? '#e0f2fe' : '#f9fafb'};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const NotificationMessage = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #111827;
  line-height: 1.4;
`;

export const NotificationTime = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const NotificationActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #374151;
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
    margin: 8px 0 4px 0;
    font-size: 16px;
    font-weight: 500;
  }

  span {
    font-size: 14px;
    opacity: 0.8;
  }
`;

export const UnreadDot = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 8px;
  height: 8px;
  background-color: #2563eb;
  border-radius: 50%;
`;

export const NotificationCount = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #dc2626;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  line-height: 1;
`;

