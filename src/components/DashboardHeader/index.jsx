import { useState } from "react";
import { Users, Bell, Settings, LogOut } from "lucide-react";
import SearchBar from "../SearchBar";
import UserActions from "../UserActions";
import {
  Header,
  HeaderInner,
  LogoBox,
  LogoIcon,
  Title,
} from "./style";

export default function DashboardHeader({ onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Header>
      <HeaderInner>
        <LogoBox>
          <LogoIcon>
            <Users size={20} style={{ color: "#fff" }} />
          </LogoIcon>
          <Title>12Weeks</Title>
        </LogoBox>
        
        <SearchBar />
        
        <UserActions 
          showNotifications={showNotifications}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          onLogout={onLogout}
        />
      </HeaderInner>
    </Header>
  );
}

