import { Bell, Settings, LogOut } from "lucide-react";
import NotificationDropdown from "../NotificationDropdown";
import {
  UserActionsContainer,
  IconButton,
  NotificationDot,
  LogoutButton,
} from "./style";

export default function UserActions({ onLogout }) {
  return (
    <UserActionsContainer>
      <NotificationDropdown />
      
      <IconButton>
        <Settings size={24} />
      </IconButton>
      
      <LogoutButton onClick={onLogout}>
        <LogOut size={20} />
        <span>Sair</span>
      </LogoutButton>
    </UserActionsContainer>
  );
}

