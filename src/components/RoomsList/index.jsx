import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRooms } from '../../hooks/useRooms';
import RoomCard from '../RoomCard';
import { 
  Container, 
  Header, 
  Title, 
  CreateButton, 
  RoomsGrid, 
  EmptyState,
  LoadingSpinner
} from './style';

const RoomsList = () => {
  const { rooms, loading, error, fetchRooms, editRoom } = useRooms();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseRoomCard = () => {
    setSelectedRoom(null);
  };

  const handleEditRoom = async (roomId, updates) => {
    try {
      const result = await editRoom(roomId, updates);
      if (result.success) {
        // A sala já foi atualizada no estado local pelo hook
        console.log('Sala editada com sucesso');
      }
    } catch (error) {
      console.error('Erro ao editar sala:', error);
    }
  };

  const handleCreateRoom = () => {
    setShowCreateModal(true);
  };

  const handleEnterRoom = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Carregando suas salas...</p>
        </LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="error">
          <p>Erro ao carregar salas: {error}</p>
          <button onClick={fetchRooms}>Tentar novamente</button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Minhas Salas</Title>
        <CreateButton onClick={handleCreateRoom}>
          + Criar Nova Sala
        </CreateButton>
      </Header>

      {rooms.length === 0 ? (
        <EmptyState>
          <div className="empty-icon">🏠</div>
          <h3>Nenhuma sala criada ainda</h3>
          <p>Crie sua primeira sala para começar a trabalhar em equipe!</p>
          <button onClick={handleCreateRoom}>
            Criar Primeira Sala
          </button>
        </EmptyState>
      ) : (
        <RoomsGrid>
          {rooms.map((room) => (
            <div 
              key={room._id} 
              className="room-card"
              onClick={() => handleRoomClick(room)}
            >
              <div className="room-avatar">
                {room.participants && room.participants.length > 0 ? (
                  <div className="participants-preview">
                    {room.participants.slice(0, 3).map((participant, index) => (
                      <div 
                        key={participant.user._id} 
                        className={`participant ${index > 0 ? 'overlap' : ''}`}
                        style={{ 
                          left: `${index * 15}px`,
                          zIndex: 3 - index
                        }}
                      >
                        {participant.user.profilePicture ? (
                          <img 
                            src={participant.user.profilePicture} 
                            alt={participant.user.name}
                          />
                        ) : (
                          <div className="initials">
                            {participant.user.name
                              .split(' ')
                              .map(word => word.charAt(0))
                              .join('')
                              .toUpperCase()
                              .slice(0, 2)
                            }
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="default-avatar">👥</div>
                )}
              </div>
              
              <div className="room-info">
                <h3 className="room-name">{room.name}</h3>
                <p className="room-description">
                  {room.description || 'Sem descrição'}
                </p>
                <div className="room-meta">
                  <span className="member-count">
                    {room.participants?.length || 0} membros
                  </span>
                  <span className="room-date">
                    {new Date(room.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="room-actions">
                <button 
                  className="enter-room"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnterRoom(room._id);
                  }}
                >
                  Entrar
                </button>
              </div>
            </div>
          ))}
        </RoomsGrid>
      )}

      {selectedRoom && (
        <RoomCard
          room={selectedRoom}
          onClose={handleCloseRoomCard}
          onEdit={handleEditRoom}
        />
      )}

      {/* Modal de criação de sala seria implementado aqui */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Criar Nova Sala</h3>
            <p>Funcionalidade em desenvolvimento...</p>
            <button onClick={() => setShowCreateModal(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default RoomsList;
