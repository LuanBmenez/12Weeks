import { Users, Clock } from "lucide-react";
import {
  RecentActivityCard,
  RecentList,
  RecentItem,
  RecentItemInner,
  RecentRoomInfo,
  RoomIcon,
  RoomName,
  RoomDetails,
  RoomDetail,
  EnterButton,
  LoadingText,
  EmptyText,
} from "./style";

export default function RecentActivity({ rooms = [], loading = false }) {
  if (loading) {
    return (
      <RecentActivityCard>
        <LoadingText>Carregando salas...</LoadingText>
      </RecentActivityCard>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <RecentActivityCard>
        <EmptyText>Nenhuma sala encontrada. Crie sua primeira sala!</EmptyText>
      </RecentActivityCard>
    );
  }

  return (
    <RecentActivityCard>
      <RecentList>
        {rooms.map((room) => (
          <RecentItem key={room._id}>
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
                      {room.participants.length} participantes
                    </RoomDetail>
                    <RoomDetail>
                      <Clock size={16} />
                      {room.updatedAt ? new Date(room.updatedAt).toLocaleDateString('pt-BR') : 'Recente'}
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

