import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRooms } from '../../hooks/useRooms';
import { useToast } from '../Toast';
import { 
  Container, 
  Header, 
  Title, 
  CreateButton, 
  RoomsGrid, 
  EmptyState, 
  LoadingSpinner,
  ResponsiveContainer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  CancelButton,
  SubmitButton
} from './style';

const RoomsList = () => {
  const navigate = useNavigate();
  const { rooms, loading, error, fetchRooms, createRoom } = useRooms();
  const { showSuccess, showError, showWarning } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleCreateRoom = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({ name: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      showWarning('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setCreating(true);
      
      const result = await createRoom(formData);
      
      if (result.success) {
        handleCloseModal();
        showSuccess('Sala criada com sucesso! 🎉');
        navigate(`/room/${result.room._id}`);
      } else {
        showError(result.message || 'Erro ao criar sala');
      }
    } catch (err) {
      showError('Erro interno ao criar sala');
      console.error('Erro ao criar sala:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleRoomClick = (room) => {
    
    navigate(`/room/${room._id}`);
  };

  const handleEnterRoom = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  if (loading) {
    return (
      <ResponsiveContainer>
        <LoadingSpinner />
      </ResponsiveContainer>
    );
  }

  if (error) {
    return (
      <ResponsiveContainer>
        <div style={{ textAlign: 'center', color: 'red' }}>
          <p>Erro ao carregar salas: {error}</p>
          <button onClick={fetchRooms}>Tentar novamente</button>
        </div>
      </ResponsiveContainer>
    );
  }

  return (
    <Container>
      <Header>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => e.target.style.background = '#4b5563'}
          onMouseOut={(e) => e.target.style.background = '#6b7280'}
        >
          ← Voltar ao Dashboard
        </button>
        
        <Title style={{ flex: 1, textAlign: 'center' }}>Minhas Salas</Title>
        
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
            <div key={room._id} className="room-card" onClick={() => handleRoomClick(room)}>
              <div className="room-header">
                <h3>{room.name}</h3>
                <span className="participant-count">
                  {room.participants?.length || 0} participantes
                </span>
              </div>
              <p className="room-description">{room.description}</p>
              <div className="room-footer">
                <span className="creation-date">
                  {new Date(room.createdAt).toLocaleDateString('pt-BR')}
                </span>
                <button 
                  className="enter-button"
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

      {/* Modal de Criação de Sala */}
      {showCreateModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Criar Nova Sala</ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">
                    Nome da Sala *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ex: Metas da Semana"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength={100}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="description">
                    Descrição *
                  </Label>
                  <TextArea
                    id="description"
                    name="description"
                    placeholder="Descreva o objetivo desta sala..."
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength={500}
                    rows={4}
                    required
                  />
                </FormGroup>

                <ButtonGroup>
                  <CancelButton type="button" onClick={handleCloseModal}>
                    Cancelar
                  </CancelButton>
                  <SubmitButton type="submit" disabled={creating}>
                    {creating ? 'Criando...' : 'Criar Sala'}
                  </SubmitButton>
                </ButtonGroup>
              </Form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default RoomsList;
