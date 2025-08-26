import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRooms } from '../../hooks/useRooms';
import { useFriends } from '../../hooks/useFriends';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../hooks/useAuth';
import { roomsAPI } from '../../config/api';

import { 
  Container, 
  Main, 
  Header, 
  BackButton, 
  RoomInfo, 
  Content,
  GoalsSection,
  GoalsHeader,
  GoalsForm,
  GoalsList,
  GoalItem,
  ProgressSection,
  ProgressCard,
  FeedbackSection,
  FeedbackCard,
  ParticipantsSection,
  ParticipantsHeader,
  ParticipantsList,
  ParticipantCard,
  InviteSection,
  InviteForm,
  FriendsList,
  FriendItem,
  EmptyState
} from './style';

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { getRoom, addDailyGoals, completeGoal, inviteUser } = useRooms();
  const { friends, fetchFriends } = useFriends();
  const { showSuccess, showError, showWarning } = useToast();
  const { user } = useAuth();
 
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGoals, setNewGoals] = useState(['', '', '', '', '']);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [todayProgress, setTodayProgress] = useState(null);
  const [dailyPercentage, setDailyPercentage] = useState(0);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteMethod, setInviteMethod] = useState('friendCode'); 
  const [inviteFriendCode, setInviteFriendCode] = useState('');
  const [inviting, setInviting] = useState(false);
  
  // Estados para edição inline
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadRoom();
  }, [roomId]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const loadRoom = async () => {
    try {
      setLoading(true);
      const result = await getRoom(roomId);
      if (result.success) {
        setRoom(result.room);
        loadRoomData(result.room);
      } else {
        setError('Erro ao carregar sala');
      }
    } catch {
      setError('Erro ao carregar sala');
    } finally {
      setLoading(false);
    }
  };

  const loadRoomData = (roomData) => {
    // Usar metas individuais do usuário em vez das metas globais da sala
    const activeGoals = roomData.userIndividualGoals?.filter(goal => goal.isActive) || [];
    setWeeklyGoals(activeGoals);
    
    // Usar progresso individual do usuário
    const todayProgressData = roomData.userTodayProgress;
    
    if (todayProgressData) {
      setTodayProgress(todayProgressData);
      setDailyPercentage(todayProgressData.dailyPercentage || 0);
    } else {
      setTodayProgress(null);
      setDailyPercentage(0);
    }
    
    // Usar progresso individual do usuário
    setOverallPercentage(roomData.userProgress?.overallPercentage || 0);
    setCurrentWeek(roomData.userProgress?.currentWeek || 1);
    
    // Mostrar feedback nos fins de semana se houver progresso
    const today = new Date();
    if ((today.getDay() === 0 || today.getDay() === 6) && (roomData.userProgress?.overallPercentage || 0) > 0) {
      setShowFeedback(true);
    }
  };

  const handleGoalChange = (index, value) => {
    const updatedGoals = [...newGoals];
    updatedGoals[index] = value;
    setNewGoals(updatedGoals);
  };

  const handleSubmitGoals = async () => {
    const validGoals = newGoals.filter(goal => goal.trim() !== '');
    
    if (validGoals.length === 0) {
      showWarning('Adicione pelo menos uma meta!');
      return;
    }
    
    try {
      const result = await addDailyGoals(roomId, validGoals);
      if (result.success) {
        setNewGoals(['', '', '', '', '']);
        await loadRoom(); 
        showSuccess('Metas semanais atualizadas com sucesso! 🎯');
      }
    } catch (err) {
      console.error('Erro ao definir metas semanais:', err);
      showError('Erro ao definir metas semanais');
    }
  };

  const handleToggleGoal = async (goalId, completed) => {
    try {
      const result = await completeGoal(roomId, goalId, completed);
      if (result.success) {
        await loadRoom(); 
        const message = completed ? 'Meta concluída! 🎉' : 'Meta desmarcada';
        showSuccess(message);
      }
    } catch (err) {
      console.error('Erro ao atualizar progresso:', err);
      showError('Erro ao atualizar progresso');
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    
    let inviteData = {};
    
    if (inviteMethod === 'friendCode') {
      if (!inviteFriendCode.trim()) {
        showWarning('Digite o código do amigo!');
        return;
      }
      inviteData = { friendCode: inviteFriendCode.trim() };
    } else if (inviteMethod === 'friendsList') {
      const selectedFriend = e.target.friendId?.value;
      if (!selectedFriend) {
        showWarning('Selecione um amigo da lista!');
        return;
      }
      inviteData = { userId: selectedFriend };
    }
    
    try {
      setInviting(true);
      const result = await inviteUser(roomId, inviteData);
      
      if (result.success) {
        setInviteFriendCode('');
        setShowInviteForm(false);
        await loadRoom(); 
        showSuccess('Usuário convidado com sucesso! 👥');
      } else {
        showError(result.message || 'Erro ao convidar usuário');
      }
    } catch (err) {
      console.error('Erro ao convidar usuário:', err);
      showError('Erro interno ao convidar usuário');
    } finally {
      setInviting(false);
    }
  };

  const handleInviteFriend = async (friendId) => {
    try {
      setInviting(true);
      const result = await inviteUser(roomId, { userId: friendId });
      
      if (result.success) {
        await loadRoom(); 
        showSuccess('Amigo convidado com sucesso! 👥');
      } else {
        showError(result.message || 'Erro ao convidar amigo');
      }
    } catch (err) {
      console.error('Erro ao convidar amigo:', err);
      showError('Erro interno ao convidar amigo');
    } finally {
      setInviting(false);
    }
  };

  // Funções para edição inline
  const startEditingTitle = () => {
    setEditTitle(room.name);
    setEditingTitle(true);
  };

  const startEditingDescription = () => {
    setEditDescription(room.description || '');
    setEditingDescription(true);
  };

  const cancelEditingTitle = () => {
    setEditingTitle(false);
    setEditTitle('');
  };

  const cancelEditingDescription = () => {
    setEditingDescription(false);
    setEditDescription('');
  };

  const saveTitle = async () => {
    if (!editTitle.trim()) {
      showWarning('O título não pode estar vazio!');
      return;
    }

    try {
      setSaving(true);
      const response = await roomsAPI.editRoom(roomId, { name: editTitle.trim() });

      if (response.data.success) {
        setRoom(prev => ({ ...prev, name: editTitle.trim() }));
        setEditingTitle(false);
        setEditTitle('');
        showSuccess('Título atualizado com sucesso! ✏️');
      } else {
        showError(response.data.message || 'Erro ao atualizar título');
      }
    } catch (err) {
      console.error('Erro ao atualizar título:', err);
      showError('Erro interno ao atualizar título');
    } finally {
      setSaving(false);
    }
  };

  const saveDescription = async () => {
    try {
      setSaving(true);
      const response = await roomsAPI.editRoom(roomId, { description: editDescription.trim() });

      if (response.data.success) {
        setRoom(prev => ({ ...prev, description: editDescription.trim() }));
        setEditingDescription(false);
        setEditDescription('');
        showSuccess('Descrição atualizada com sucesso! ✏️');
      } else {
        showError(response.data.message || 'Erro ao atualizar descrição');
      }
    } catch (err) {
      console.error('Erro ao atualizar descrição:', err);
      showError('Erro interno ao atualizar descrição');
    } finally {
      setSaving(false);
    }
  };

  const handleKeyPress = (e, saveFunction) => {
    if (e.key === 'Enter') {
      saveFunction();
    } else if (e.key === 'Escape') {
      if (saveFunction === saveTitle) {
        cancelEditingTitle();
      } else {
        cancelEditingDescription();
      }
    }
  };

  const getFeedbackMessage = () => {
    if (overallPercentage < 80) {
      return {
        type: 'difficult',
        title: 'Metas muito difíceis! 😰',
        message: 'Sua porcentagem geral das 12 semanas está baixa. Que tal ajustar as metas para algo mais realista?',
        action: 'Ajustar Metas'
      };
    } else if (overallPercentage < 90) {
      return {
        type: 'medium',
        title: 'Está na média! 😊',
        message: 'Seu desempenho está bom, mas há espaço para melhorar. Quer ajustar as metas?',
        action: 'Ajustar Metas'
      };
    } else {
      return {
        type: 'easy',
        title: 'Metas muito fáceis! 🚀',
        message: 'Parabéns! Você está dominando. Que tal aumentar o desafio?',
        action: 'Aumentar Desafio'
      };
    }
  };

  const shouldShowGoalsForm = () => {
    return weeklyGoals.length === 0;
  };

  const shouldShowDailyReminder = () => {
    if (weeklyGoals.length === 0) return false;
    
    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;
    
 
    return !todayProgress && !isWeekend;
  };

  const handleFeedbackAction = () => {
    setShowFeedback(false);
    navigate('/my-rooms');
  };

  const getParticipantProgress = (participant) => {
    // Agora usando os dados reais de progresso dos participantes
    if (participant.progress && participant.progress.hasGoals) {
      return participant.progress.dailyPercentage || 0;
    }
    return 0;
  };

  const isFriendAlreadyInRoom = (friendId) => {
    return room?.participants?.some(p => p.user._id === friendId);
  };

  // Verificar se o usuário é admin para permitir edição
  const isAdmin = room?.participants?.some(p => 
    p.user._id === user?._id && p.role === 'admin'
  );
  const canEdit = isAdmin;

  if (loading) {
    return (
      <Container>
        <Main>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="spinner"></div>
            <p>Carregando sala...</p>
          </div>
        </Main>
      </Container>
    );
  }

  if (error || !room) {
    return (
      <Container>
        <Main>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Erro ao carregar sala: {error}</p>
            <button onClick={() => navigate('/my-rooms')}>
              Voltar para Minhas Salas
            </button>
          </div>
        </Main>
      </Container>
    );
  }

  const feedback = getFeedbackMessage();

  return (
    <Container>
      <Main>
        <Header>
          <BackButton onClick={() => navigate('/my-rooms')}>
            ← Voltar
          </BackButton>
          <RoomInfo>
            <h1>
              {editingTitle ? (
                <div className="edit-input-container">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={saveTitle}
                    onKeyPress={(e) => handleKeyPress(e, saveTitle)}
                    autoFocus
                    className="edit-input title-input"
                    disabled={saving}
                  />
                  <div className="edit-actions">
                    <button 
                      onClick={saveTitle} 
                      disabled={saving}
                      className="save-btn"
                      title="Salvar (Enter)"
                    >
                      {saving ? 'Salvando...' : '✓'}
                    </button>
                    <button 
                      onClick={cancelEditingTitle}
                      disabled={saving}
                      className="cancel-btn"
                      title="Cancelar (Esc)"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="title-with-edit">
                  <span>{room.name}</span>
                  {canEdit && (
                    <button 
                      onClick={startEditingTitle}
                      className="edit-icon-btn"
                      title="Editar título"
                    >
                      ✏️
                    </button>
                  )}
                </div>
              )}
            </h1>
            <p>
              {editingDescription ? (
                <div className="edit-input-container">
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    onBlur={saveDescription}
                    onKeyPress={(e) => handleKeyPress(e, saveDescription)}
                    autoFocus
                    className="edit-input description-input"
                    placeholder="Digite uma descrição..."
                    disabled={saving}
                  />
                  <div className="edit-actions">
                    <button 
                      onClick={saveDescription} 
                      disabled={saving}
                      className="save-btn"
                      title="Salvar (Enter)"
                    >
                      {saving ? 'Salvando...' : '✓'}
                    </button>
                    <button 
                      onClick={cancelEditingDescription}
                      disabled={saving}
                      className="cancel-btn"
                      title="Cancelar (Esc)"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="description-with-edit">
                  <span>{room.description || 'Sem descrição'}</span>
                  {canEdit && (
                    <button 
                      onClick={startEditingDescription}
                      className="edit-icon-btn"
                      title="Editar descrição"
                    >
                      ✏️
                    </button>
                  )}
                </div>
              )}
            </p>
          </RoomInfo>
        </Header>

        <Content>
          {/* Seção de Metas Semanais */}
          <GoalsSection>
            <GoalsHeader>
              <h2>Metas Semanais</h2>
              <div className="week-info">
                <span className="week">Semana {currentWeek} de 12</span>
                <span className="date">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </GoalsHeader>

            {shouldShowDailyReminder() && (
              <div style={{
                background: '#eff6ff',
                border: '1px solid #3b82f6',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, color: '#1e40af', fontWeight: '500' }}>
                  🎯 <strong>Lembrete:</strong> Marque suas metas de hoje para manter o foco e produtividade!
                </p>
              </div>
            )}

            {shouldShowGoalsForm() ? (
              <GoalsForm>
                <h3>Defina suas metas para esta semana (máximo 5):</h3>
                <p className="info">
                  <strong>Importante:</strong> Você pode alterar suas metas a qualquer momento! 
                  O objetivo é criar constância e flexibilidade por 12 semanas.
                </p>
                {newGoals.map((goal, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Meta ${index + 1}`}
                    value={goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    maxLength={100}
                  />
                ))}
                <button onClick={handleSubmitGoals}>
                  Definir Metas Semanais
                </button>
              </GoalsForm>
            ) : (
              <GoalsList>
                <div className="goals-header">
                  <h3>Metas desta semana:</h3>
                  <button 
                    className="edit-goals-btn"
                    onClick={() => {
                      setNewGoals(weeklyGoals.map(goal => goal.text).concat(['', '', '', '', '']).slice(0, 5));
                      setWeeklyGoals([]);
                    }}
                  >
                    ✏️ Editar Metas
                  </button>
                </div>
                {weeklyGoals.map((goal, index) => {
                  const isCompleted = todayProgress?.completedGoals?.find(
                    gp => gp.goalId === goal._id
                  )?.completed || false;
                   
                  return (
                    <GoalItem key={goal._id || index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={(e) => handleToggleGoal(goal._id, e.target.checked)}
                        />
                        <span className={isCompleted ? 'completed' : ''}>
                          {goal.text}
                        </span>
                      </label>
                    </GoalItem>
                  );
                })}
              </GoalsList>
            )}
          </GoalsSection>

          {/* Seção de Progresso */}
          <ProgressSection>
            <ProgressCard>
              <h3>Progresso de Hoje</h3>
              <div className="progress-circle">
                <div className="percentage">{Math.round(dailyPercentage)}%</div>
                <div className="label">Concluído Hoje</div>
              </div>
              <div className="stats">
                <span>
                  {todayProgress?.completedGoals?.filter(g => g.completed).length || 0} de {weeklyGoals.length} metas
                </span>
              </div>
            </ProgressCard>

            <ProgressCard>
              <h3>Progresso das 12 Semanas</h3>
              <div className="progress-circle">
                <div className="percentage">{Math.round(overallPercentage)}%</div>
                <div className="label">Geral</div>
              </div>
              <div className="stats">
                <span>Semana {currentWeek} de 12</span>
              </div>
            </ProgressCard>
          </ProgressSection>

          {/* Seção de Participantes */}
          <ParticipantsSection>
            <ParticipantsHeader>
              <h2>Participantes da Sala</h2>
              <button 
                className="invite-button"
                onClick={() => setShowInviteForm(!showInviteForm)}
              >
                + Convidar Amigo
              </button>
            </ParticipantsHeader>

            {showInviteForm && (
              <InviteSection>
                <div className="invite-tabs">
                  <button 
                    className={`tab ${inviteMethod === 'friendCode' ? 'active' : ''}`}
                    onClick={() => setInviteMethod('friendCode')}
                  >
                    Por Código
                  </button>
                  <button 
                    className={`tab ${inviteMethod === 'friendsList' ? 'active' : ''}`}
                    onClick={() => setInviteMethod('friendsList')}
                  >
                    Da Lista de Amigos
                  </button>
                </div>

                {inviteMethod === 'friendCode' ? (
                  <InviteForm onSubmit={handleInviteUser}>
                    <div className="form-group">
                      <label htmlFor="friendCode">Código do Amigo:</label>
                      <input
                        id="friendCode"
                        type="text"
                        placeholder="Digite o código do amigo"
                        value={inviteFriendCode}
                        onChange={(e) => setInviteFriendCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="button-group">
                      <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => {
                          setShowInviteForm(false);
                          setInviteFriendCode('');
                        }}
                      >
                        Cancelar
                      </button>
                      <button 
                        type="submit" 
                        className="submit-button"
                        disabled={inviting}
                      >
                        {inviting ? 'Convidando...' : 'Convidar'}
                      </button>
                    </div>
                  </InviteForm>
                ) : (
                  <FriendsList>
                    <h4>Seus amigos:</h4>
                    {friends && friends.length > 0 ? (
                      friends.map((friend) => (
                        <FriendItem key={friend._id}>
                          <div className="friend-info">
                            <div className="avatar">
                              {friend.profilePicture ? (
                                <img 
                                  src={friend.profilePicture} 
                                  alt={friend.name}
                                />
                              ) : (
                                <div className="initials">
                                  {friend.name
                                    .split(' ')
                                    .map(word => word.charAt(0))
                                    .join('')
                                    .toUpperCase()
                                    .slice(0, 2)
                                  }
                                </div>
                              )}
                            </div>
                            <span className="name">{friend.name}</span>
                          </div>
                          <button
                            className={`invite-friend-btn ${isFriendAlreadyInRoom(friend._id) ? 'already-in' : ''}`}
                            onClick={() => handleInviteFriend(friend._id)}
                            disabled={isFriendAlreadyInRoom(friend._id) || inviting}
                          >
                            {isFriendAlreadyInRoom(friend._id) 
                              ? 'Já na sala' 
                              : 'Convidar'
                            }
                          </button>
                        </FriendItem>
                      ))
                    ) : (
                      <p className="no-friends">Você ainda não tem amigos adicionados.</p>
                    )}
                  </FriendsList>
                )}
              </InviteSection>
            )}

            <ParticipantsList>
              {room.participants?.map((participant) => (
                <ParticipantCard key={participant.user._id}>
                  <div className="participant-info">
                    <div className="avatar">
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
                    <div className="details">
                      <h4>{participant.user.name}</h4>
                      <span className="role">{participant.role === 'admin' ? 'Administrador' : 'Membro'}</span>
                    </div>
                  </div>
                   
                  {weeklyGoals.length > 0 && (
                    <div className="progress-info">
                      {participant.progress && participant.progress.hasGoals ? (
                        <>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${getParticipantProgress(participant)}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">
                            {Math.round(getParticipantProgress(participant))}%
                          </span>
                        </>
                      ) : (
                        <div className="no-goals-indicator">
                          <span className="no-goals-text">Sem metas</span>
                        </div>
                      )}
                    </div>
                  )}
                </ParticipantCard>
              ))}
            </ParticipantsList>
          </ParticipantsSection>

          {/* Seção de Feedback */}
          {showFeedback && (
            <FeedbackSection>
              <FeedbackCard className={feedback.type}>
                <h3>{feedback.title}</h3>
                <p>{feedback.message}</p>
                <button onClick={handleFeedbackAction}>
                  {feedback.action}
                </button>
                <button 
                  className="close-feedback" 
                  onClick={() => setShowFeedback(false)}
                >
                  Fechar
                </button>
              </FeedbackCard>
            </FeedbackSection>
          )}
        </Content>
      </Main>
    </Container>
  );
};

export default Room;
