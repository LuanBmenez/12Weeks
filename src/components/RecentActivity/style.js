import styled from 'styled-components';

export const RecentActivityCard = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
`;

export const RecentHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RecentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
`;

export const RecentButton = styled.button`
  color: #2563eb;
  background: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover { 
    color: #1d4ed8; 
  }
`;

export const RecentList = styled.div`
  border-top: 1px solid #e5e7eb;
`;

export const RecentItem = styled.div`
  padding: 1.5rem;
  transition: background 0.2s;
  
  &:hover { 
    background: #f9fafb; 
  }
`;

export const RecentItemInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RecentRoomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const RoomIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: #f3f4f6;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RoomName = styled.h4`
  font-weight: 500;
  color: #111827;
`;

export const RoomDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const RoomDetail = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const EnterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 2rem;
`;

export const EmptyText = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 2rem;
  font-style: italic;
`;

