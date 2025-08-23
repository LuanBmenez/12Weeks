import { useAuth } from '../../hooks/useAuth';
import DashboardHeader from "../../components/DashboardHeader";
import WelcomeSection from "../../components/WelcomeSection";
import QuickActions from "../../components/QuickActions";
import RecentActivity from "../../components/RecentActivity";
import {
  Container,
  Main,
} from "./style";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <Container>
      <DashboardHeader onLogout={logout} />
      
      <Main>
        <WelcomeSection />
        <QuickActions />
        <RecentActivity />
      </Main>
    </Container>
  );
}
