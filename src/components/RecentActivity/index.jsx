import { Users, Clock } from "lucide-react";
import {
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

export default function RecentActivity() {
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

  return (
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
  );
}

