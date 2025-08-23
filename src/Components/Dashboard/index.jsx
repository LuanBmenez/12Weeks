import { useState } from "react";
import {
  Plus,
  UserPlus,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  Container,
  Header,
  HeaderInner,
  LogoBox,
  LogoIcon,
  Title,
  SearchBarWrapper,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
  UserActions,
  IconButton,
  NotificationDot,
  NotificationDropdown,
  NotificationHeader,
  NotificationTitle,
  NotificationList,
  NotificationItem,
  NotificationText,
  NotificationTime,
  LogoutButton,
  Main,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  QuickActionsGrid,
  ActionCard,
  ActionHeader,
  ActionIcon,
  ChevronIcon,
  ActionTitle,
  ActionDesc,
  ActionButton,
  Spinner,
  RecentActivityCard,
  RecentHeader,
  RecentTitle,
  RecentButton,
  RecentList,
  RecentItem,
  RecentItemInner,
  RecentRoomInfo,
  RoomIcon,
  RoomName,
  RoomDetails,
  RoomDetail,
  EnterButton,
} from "./style";

export default function Dashboard({ onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  const recentRooms = [
    {
      id: 1,
      name: "Reunião Equipe",
      participants: 8,
      lastActivity: "2 min atrás",
    },
    {
      id: 2,
      name: "Brainstorm Produto",
      participants: 5,
      lastActivity: "1 hora atrás",
    },
    {
      id: 3,
      name: "Review Semanal",
      participants: 12,
      lastActivity: "1 dia atrás",
    },
  ];

  const handleCreateRoom = async () => {
    setIsCreatingRoom(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsCreatingRoom(false);
    alert("Sala criada com sucesso!");
  };

  const handleInviteFriend = async () => {
    setIsInviting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsInviting(false);
    alert("Convite enviado!");
  };

  return (
    <Container>
      <Header>
        <HeaderInner>
          <LogoBox>
            <LogoIcon>
              <Users size={20} style={{ color: "#fff" }} />
            </LogoIcon>
            <Title>12Weeks</Title>
          </LogoBox>
          <SearchBarWrapper>
            <SearchInputWrapper>
              <SearchIcon>
                <Search size={20} />
              </SearchIcon>
              <SearchInput type="text" placeholder="Buscar salas..." />
            </SearchInputWrapper>
          </SearchBarWrapper>
          <UserActions>
            <IconButton
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={24} />
              <NotificationDot />
              {showNotifications && (
                <NotificationDropdown>
                  <NotificationHeader>
                    <NotificationTitle>Notificações</NotificationTitle>
                  </NotificationHeader>
                  <NotificationList>
                    <NotificationItem>
                      <NotificationText>
                        Nova sala criada: "Projeto X"
                      </NotificationText>
                      <NotificationTime>5 min atrás</NotificationTime>
                    </NotificationItem>
                    <NotificationItem>
                      <NotificationText>
                        João se juntou à sala "Brainstorm"
                      </NotificationText>
                      <NotificationTime>15 min atrás</NotificationTime>
                    </NotificationItem>
                  </NotificationList>
                </NotificationDropdown>
              )}
            </IconButton>
            <IconButton>
              <Settings size={24} />
            </IconButton>
            <LogoutButton onClick={onLogout}>
              <LogOut size={20} />
              <span>Sair</span>
            </LogoutButton>
          </UserActions>
        </HeaderInner>
      </Header>
      <Main>
        <WelcomeSection>
          <WelcomeTitle>Bem-vindo de volta!</WelcomeTitle>
          <WelcomeSubtitle>
            Gerencie suas salas e conecte-se com sua equipe
          </WelcomeSubtitle>
        </WelcomeSection>
        <QuickActionsGrid>
          <ActionCard>
            <ActionHeader>
              <ActionIcon>
                <Plus size={24} style={{ color: "#2563eb" }} />
              </ActionIcon>
              <ChevronIcon>
                <ChevronRight size={20} />
              </ChevronIcon>
            </ActionHeader>
            <ActionTitle>Criar Nova Sala</ActionTitle>
            <ActionDesc>
              Inicie uma nova sala de reunião e convide participantes
            </ActionDesc>
            <ActionButton onClick={handleCreateRoom} disabled={isCreatingRoom}>
              {isCreatingRoom ? (
                <Spinner />
              ) : (
                <>
                  <Plus size={20} />
                  Criar Sala
                </>
              )}
            </ActionButton>
          </ActionCard>
          <ActionCard>
            <ActionHeader>
              <ActionIcon>
                <UserPlus size={24} style={{ color: "#16a34a" }} />
              </ActionIcon>
              <ChevronIcon>
                <ChevronRight size={20} />
              </ChevronIcon>
            </ActionHeader>
            <ActionTitle>Convidar Amigo</ActionTitle>
            <ActionDesc>
              Convide pessoas para se juntarem à plataforma
            </ActionDesc>
            <ActionButton onClick={handleInviteFriend} disabled={isInviting}>
              {isInviting ? (
                <Spinner />
              ) : (
                <>
                  <UserPlus size={20} />
                  Enviar Convite
                </>
              )}
            </ActionButton>
          </ActionCard>
        </QuickActionsGrid>
        <RecentActivityCard>
          <RecentHeader>
            <RecentTitle>Salas Recentes</RecentTitle>
            <RecentButton>Ver todas</RecentButton>
          </RecentHeader>
          <RecentList>
            {recentRooms.map((room) => (
              <RecentItem key={room.id}>
                <RecentItemInner>
                  <RecentRoomInfo>
                    <RoomIcon>
                      <Users size={20} style={{ color: "#4b5563" }} />
                    </RoomIcon>
                    <div>
                      <RoomName>{room.name}</RoomName>
                      <RoomDetails>
                        <RoomDetail>
                          <Users size={16} />
                          {room.participants} participantes
                        </RoomDetail>
                        <RoomDetail>
                          <Clock size={16} />
                          {room.lastActivity}
                        </RoomDetail>
                      </RoomDetails>
                    </div>
                  </RecentRoomInfo>
                  <EnterButton>Entrar</EnterButton>
                </RecentItemInner>
              </RecentItem>
            ))}
          </RecentList>
        </RecentActivityCard>
      </Main>
    </Container>
  );
}
