import { Users } from "lucide-react";
import UserActions from "../UserActions";
import logoImage from "../../assets/12weeks_sem_fundo.png";
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
            <img 
              src={logoImage} 
              alt="12Weeks Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain' 
              }} 
            />
          </LogoIcon>
        </LogoBox>
        
        <UserActions onLogout={onLogout} />
      </HeaderInner>
    </Header>
  );
}

