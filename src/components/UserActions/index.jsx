import { Bell, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "../NotificationDropdown";
import {
  UserActionsContainer,
  NotificationDot,
  LogoutButton,
} from "./style";

export default function UserActions({ onLogout }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <UserActionsContainer>
      <NotificationDropdown />
      
      <LogoutButton onClick={handleProfileClick}>
        <User size={20} />
        <span>Perfil</span>
      </LogoutButton>
      
      <LogoutButton onClick={onLogout}>
        <LogOut size={20} />
        <span>Sair</span>
      </LogoutButton>
    </UserActionsContainer>
  );
}

