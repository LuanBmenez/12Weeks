import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

export const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const HeaderInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

export const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: #2563eb;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
`;

export const SearchBarWrapper = styled.div`
  flex: 1;
  max-width: 24rem;
  margin: 0 2rem;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border 0.2s;
  &:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px #2563eb33; }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconButton = styled.button`
  padding: 0.5rem;
  color: #4b5563;
  background: none;
  border: none;
  border-radius: 0.5rem;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
  position: relative;
  &:hover { color: #111827; background: #f3f4f6; }
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

export const NotificationDropdown = styled.div`
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
  &:hover { background: #f9fafb; }
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
  &:hover { color: #dc2626; background: #fee2e2; }
`;

export const Main = styled.main`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

export const WelcomeTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const WelcomeSubtitle = styled.p`
  color: #4b5563;
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ActionCard = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.10); }
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
  background: #dbeafe;
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
  &:hover { background: #1d4ed8; transform: translateY(-2px); }
`;

export const Spinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

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
  &:hover { color: #1d4ed8; }
`;

export const RecentList = styled.div`
  border-top: 1px solid #e5e7eb;
`;

export const RecentItem = styled.div`
  padding: 1.5rem;
  transition: background 0.2s;
  &:hover { background: #f9fafb; }
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
  color: #2563eb;
  background: #f0f9ff;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
  &:hover { background: #dbeafe; color: #1d4ed8; }
`;
