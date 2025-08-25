import { Users } from "lucide-react";
import UserActions from "../UserActions";
import {
  Header,
  HeaderInner,
  LogoBox,
  LogoIcon,
  Title,
} from "./style";

export default function DashboardHeader({ onLogout }) {
  return (
    <Header>
      <HeaderInner>
        <LogoBox>
          <LogoIcon>
            <Users size={20} style={{ color: "#fff" }} />
          </LogoIcon>
          <Title>12Weeks</Title>
        </LogoBox>
        
        <UserActions onLogout={onLogout} />
      </HeaderInner>
    </Header>
  );
}

