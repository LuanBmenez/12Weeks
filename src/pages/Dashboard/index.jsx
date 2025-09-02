import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useRooms } from '../../hooks/useRooms';
import { useUserStats } from '../../hooks/useUserStats';
import DashboardHeader from "../../components/DashboardHeader";
import StatsCards from "../../components/StatsCards";
import QuickActions from "../../components/QuickActions";
import CreateRoomModal from "../../components/CreateRoomModal";
import AchievementsRoom from "../../components/AchievementsRoom";
import {
  Container,
  Main,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  StatsSection
} from "./style";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { createRoom } = useRooms();
  const userStats = useUserStats();
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  const handleCreateRoom = async (roomData) => {
    const result = await createRoom(roomData);
    if (result.success) {
      setIsCreateRoomModalOpen(false);
     
      userStats.refreshStats();
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Container>
      <DashboardHeader onLogout={logout} />
      
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <Main>
          <WelcomeSection>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <WelcomeTitle>
                Olá, {user?.name?.split(' ')[0] || 'Usuário'}! 👋
              </WelcomeTitle>
              <WelcomeSubtitle>
                Acompanhe seu progresso e alcance suas metas em 12 semanas
              </WelcomeSubtitle>
            </motion.div>
          </WelcomeSection>

          <StatsSection>
            <StatsCards userStats={userStats} />
          </StatsSection>
          
          <QuickActions 
            onCreateRoom={() => setIsCreateRoomModalOpen(true)}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
          />
        </Main>
      </motion.div>

      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={() => setIsCreateRoomModalOpen(false)}
        onCreateRoom={handleCreateRoom}
      />

      {isAchievementsOpen && (
        <AchievementsRoom onClose={() => setIsAchievementsOpen(false)} />
      )}
    </Container>
  );
}
