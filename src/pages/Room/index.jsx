import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRooms } from '../../hooks/useRooms';
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
  EmptyState
} from './style';

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { getRoom, addDailyGoals, completeGoal } = useRooms();
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

  useEffect(() => {
    loadRoom();
  }, [roomId]);

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
    
    // Carregar progresso de hoje
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
        await loadRoom(); // Recarregar para mostrar as novas metas
      }
    } catch (err) {
      console.error('Erro ao definir metas semanais:', err);
    }
  };

  const handleToggleGoal = async (goalId, completed) => {
    try {
      const result = await completeGoal(roomId, goalId, completed);
      if (result.success) {
        await loadRoom(); // Recarregar para atualizar o progresso
      }
    } catch (err) {
      console.error('Erro ao atualizar progresso:', err);
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
                <h3>Suas metas desta semana:</h3>
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
