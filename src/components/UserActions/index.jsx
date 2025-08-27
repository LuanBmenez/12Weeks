import { Bell, LogOut } from "lucide-react";
import NotificationDropdown from "../NotificationDropdown";
import {
  UserActionsContainer,
  NotificationDot,
  LogoutButton,
} from "./style";

export default function UserActions({ onLogout }) {
  return (
    <UserActionsContainer>
      <NotificationDropdown />
      
      <LogoutButton onClick={onLogout}>
        <LogOut size={20} />
        <span>Sair</span>
      </LogoutButton>
    </UserActionsContainer>
  );
}

