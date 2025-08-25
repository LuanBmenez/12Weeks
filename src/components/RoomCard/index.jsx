import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Header, 
  ProfilePicture, 
  RoomName, 
  MemberCount, 
  Description, 
  CreationInfo,
  EditButton,
  CloseButton
} from './style';

const RoomCard = ({ room, onClose, onEdit }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(room.name);
  const [editedDescription, setEditedDescription] = useState(room.description || '');

  const handleEnterRoom = () => {
    navigate(`/room/${room._id}`);
  };

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleSaveName = async () => {
    if (editedName.trim() !== room.name) {
      await onEdit(room._id, { name: editedName.trim() });
    }
    setIsEditing(false);
  };

  const handleEditDescription = () => {
    if (!room.description) {
      setEditedDescription('');
    }
    setIsEditing(true);
  };

  const handleSaveDescription = async () => {
    if (editedDescription.trim() !== (room.description || '')) {
      await onEdit(room._id, { description: editedDescription.trim() });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container>
      <Header>
        <CloseButton onClick={onClose}>
          <span>×</span>
        </CloseButton>
        <h2>Dados do grupo</h2>
      </Header>

      <ProfilePicture onClick={handleEnterRoom}>
        {room.participants && room.participants.length > 0 ? (
          <div className="participants-avatar">
            {room.participants.slice(0, 3).map((participant, index) => (
              <div 
                key={participant.user._id} 
                className={`participant ${index > 0 ? 'overlap' : ''}`}
                style={{ 
                  left: `${index * 20}px`,
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
                    {getInitials(participant.user.name)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="default-avatar">
            <span>👥</span>
          </div>
        )}
      </ProfilePicture>

      <RoomName>
        {isEditing ? (
          <div className="edit-name">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleSaveName}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
              autoFocus
            />
          </div>
        ) : (
          <>
            <span>{room.name}</span>
            <EditButton onClick={handleEditName}>
              <span>✏️</span>
            </EditButton>
          </>
        )}
      </RoomName>

      <MemberCount>
        Grupo · {room.participants?.length || 0} membros
      </MemberCount>

      <Description>
        {isEditing ? (
          <div className="edit-description">
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onBlur={handleSaveDescription}
              placeholder="Digite a descrição do grupo..."
              rows={3}
              autoFocus
            />
            <div className="edit-actions">
              <button onClick={handleSaveDescription}>Salvar</button>
              <button onClick={() => setIsEditing(false)}>Cancelar</button>
            </div>
          </div>
        ) : (
          <>
            <span 
              className={room.description ? 'has-description' : 'add-description'}
              onClick={room.description ? undefined : handleEditDescription}
            >
              {room.description || 'Adicionar descrição ao grupo'}
            </span>
            {room.description && (
              <EditButton onClick={handleEditDescription}>
                <span>✏️</span>
              </EditButton>
            )}
          </>
        )}
      </Description>

      <CreationInfo>
        Grupo criado por você no dia {formatDate(room.createdAt)}
      </CreationInfo>

      <div className="enter-room-button" onClick={handleEnterRoom}>
        Entrar na sala
      </div>
    </Container>
  );
};

export default RoomCard;
