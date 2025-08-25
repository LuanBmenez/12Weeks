import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRooms } from '../../hooks/useRooms';
import DashboardHeader from "../../components/DashboardHeader";
import WelcomeSection from "../../components/WelcomeSection";
import QuickActions from "../../components/QuickActions";
import RecentActivity from "../../components/RecentActivity";
import CreateRoomModal from "../../components/CreateRoomModal";
import {
  Container,
  Main,
} from "./style";

export default function Dashboard() {
  const { logout } = useAuth();
  const { rooms, createRoom, loading } = useRooms();
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

  const handleCreateRoom = async (roomData) => {
    const result = await createRoom(roomData);
    if (result.success) {
      setIsCreateRoomModalOpen(false);
    }
  };

  return (
    <Container>
      <DashboardHeader onLogout={logout} />
      
      <Main>
        <WelcomeSection />
        <QuickActions onCreateRoom={() => setIsCreateRoomModalOpen(true)} />
        <RecentActivity rooms={rooms} loading={loading} />
      </Main>

      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={() => setIsCreateRoomModalOpen(false)}
        onCreateRoom={handleCreateRoom}
      />
    </Container>
  );
}
