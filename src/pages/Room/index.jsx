import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRooms } from '../../hooks/useRooms';
import { useFriends } from '../../hooks/useFriends';

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
    
    const activeGoals = roomData.weeklyGoals?.filter(goal => goal.isActive) || [];
    setWeeklyGoals(activeGoals);
    
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayProgressData = roomData.dailyProgress?.find(progress => 
      new Date(progress.date).toDateString() === today.toDateString()
    );
    
    if (todayProgressData) {
      setTodayProgress(todayProgressData);
      setDailyPercentage(todayProgressData.dailyPercentage || 0);
    } else {
      setTodayProgress(null);
      setDailyPercentage(0);
    }
    
    
    setOverallPercentage(roomData.weeklyProgress?.overallPercentage || 0);
    setCurrentWeek(roomData.weeklyProgress?.currentWeek || 1);
    

    if ((today.getDay() === 0 || today.getDay() === 6) && overallPercentage > 0) {
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
      alert('Adicione pelo menos uma meta!');
      return;
    }
    
    try {
      const result = await addDailyGoals(roomId, validGoals);
      if (result.success) {
        setNewGoals(['', '', '', '', '']);
        await loadRoom(); 
      }
    } catch (err) {
      console.error('Erro ao definir metas semanais:', err);
    }
  };

  const handleToggleGoal = async (goalId, completed) => {
    try {
      const result = await completeGoal(roomId, goalId, completed);
      if (result.success) {
        await loadRoom(); 
      }
    } catch (err) {
      console.error('Erro ao atualizar progresso:', err);
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    
    let inviteData = {};
    
    if (inviteMethod === 'friendCode') {
      if (!inviteFriendCode.trim()) {
        alert('Digite o código do amigo!');
        return;
      }
      inviteData = { friendCode: inviteFriendCode.trim() };
    } else if (inviteMethod === 'friendsList') {
      const selectedFriend = e.target.friendId?.value;
      if (!selectedFriend) {
        alert('Selecione um amigo da lista!');
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
        alert('Usuário convidado com sucesso!');
      } else {
        alert(result.message || 'Erro ao convidar usuário');
      }
    } catch (err) {
      alert('Erro interno ao convidar usuário');
      console.error('Erro ao convidar usuário:', err);
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
        alert('Amigo convidado com sucesso!');
      } else {
        alert(result.message || 'Erro ao convidar amigo');
      }
    } catch (err) {
      alert('Erro interno ao convidar amigo');
      console.error('Erro ao convidar amigo:', err);
    } finally {
      setInviting(false);
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
    if (!todayProgress || !weeklyGoals.length) return 0;
    
    const participantProgress = todayProgress.completedGoals?.filter(
      gp => gp.completed && gp.userId === participant.user._id
    ).length || 0;
    
    return (participantProgress / weeklyGoals.length) * 100;
  };

  const isFriendAlreadyInRoom = (friendId) => {
    return room?.participants?.some(p => p.user._id === friendId);
  };

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
            <h1>{room.name}</h1>
            <p>{room.description || 'Sem descrição'}</p>
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
                  <strong>Importante:</strong> Estas metas ficarão fixas por 7 dias e continuarão automaticamente 
                  se você não as modificar. O objetivo é criar constância por 12 semanas!
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
                <h3>Metas desta semana:</h3>
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
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${getParticipantProgress(participant)}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {Math.round(getParticipantProgress(participant))}%
                      </span>
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
