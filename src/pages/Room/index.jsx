import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { MessageSquare } from 'lucide-react';
import { useRooms } from '../../hooks/useRooms';
import { useFriends } from '../../hooks/useFriends';
import { useUnreadMessages } from '../../hooks/useUnreadMessages';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useEvents } from '../../contexts/EventContext.jsx';
import { roomsAPI } from '../../config/api';
import config from '../../config/config';

import Chat from '../../components/Chat';

import { 
  Container, 
  Main, 
  Header, 
  BackButton, 
  RoomInfo, 
  Content,
  FloatingChatButton,
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

const socket = io(config.SOCKET_URL);

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { getRoom, addDailyGoals, completeGoal, inviteUser, addRoomGoals, completeRoomGoal } = useRooms();
  const { friends, fetchFriends } = useFriends();
  const { getUnreadCount } = useUnreadMessages();
  const { showSuccess, showError, showWarning } = useToast();
  const { user } = useAuth();
  const { emit } = useEvents();

  const loadRoomData = (roomData) => {
    const activeGoals = roomData.userIndividualGoals?.filter(goal => goal.isActive) || [];
    setWeeklyGoals(activeGoals);
    
    const todayProgressData = roomData.userTodayProgress;
    
    if (todayProgressData) {
      setTodayProgress(todayProgressData);
      setDailyPercentage(todayProgressData.dailyPercentage || 0);
    } else {
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const emptyTodayProgress = {
        roomId: roomData._id,
        date: today,
        completedGoals: activeGoals.map(goal => ({
          goalId: goal._id,
          completed: false
        })),
        dailyPercentage: 0
      };
      
      setTodayProgress(emptyTodayProgress);
      setDailyPercentage(0);
    }
    
    setOverallPercentage(roomData.userProgress?.overallPercentage || 0);
    setCurrentWeek(roomData.userProgress?.currentWeek || 1);
    
    const activeRoomGoals = roomData.roomGoals || [];
    setRoomGoals(activeRoomGoals);
    setRoomGoalProgress(roomData.roomGoalProgress || 0);
    
    const today = new Date();
    if ((today.getDay() === 0 || today.getDay() === 6) && (roomData.userProgress?.overallPercentage || 0) > 0) {
      setShowFeedback(true);
    }
  };

  const loadRoom = useCallback(async () => {
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
  }, [roomId, getRoom]);
 
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
  
  
  const [newRoomGoals, setNewRoomGoals] = useState(['', '', '', '', '']);
  const [roomGoals, setRoomGoals] = useState([]);
  const [roomGoalProgress, setRoomGoalProgress] = useState(0);
  
  
  const [expandedIndividualGoals, setExpandedIndividualGoals] = useState(true);
  const [expandedRoomGoals, setExpandedRoomGoals] = useState(true);
  

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [saving, setSaving] = useState(false);
  
  
  const [expandedParticipants, setExpandedParticipants] = useState(new Set());
  const [updatingParticipants, setUpdatingParticipants] = useState(new Set());

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    loadRoom();

    socket.emit('join_room', roomId);

    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const handleLoadHistory = (history) => {
      setMessages(history);
    };

    const handleMessageUpdate = (updatedMessage) => {
      setMessages((prevMessages) => 
        prevMessages.map(msg => 
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    };

    socket.on('receive_message', handleNewMessage);
    socket.on('load_history', handleLoadHistory);
    socket.on('message_updated', handleMessageUpdate);

    return () => {
      socket.off('receive_message', handleNewMessage);
      socket.off('load_history', handleLoadHistory);
      socket.off('message_updated', handleMessageUpdate);
    };
  }, [roomId, loadRoom]);

  useEffect(() => {
    const checkDayChange = () => {
      const today = new Date().toDateString();
      const lastDay = localStorage.getItem(`lastDay_${roomId}`);
      
      if (lastDay && lastDay !== today) {
        console.log('Dia mudou, resetando metas...');
        loadRoom();
      }
      
      localStorage.setItem(`lastDay_${roomId}`, today);
    };

    checkDayChange();

    const interval = setInterval(checkDayChange, 60000);

    return () => clearInterval(interval);
  }, [roomId, loadRoom]);

  useEffect(() => {
    const handleFocus = () => {
      const today = new Date().toDateString();
      const lastDay = localStorage.getItem(`lastDay_${roomId}`);
      
      if (lastDay && lastDay !== today) {
        console.log('Página ganhou foco, dia mudou, resetando metas...');
        loadRoom();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        handleFocus();
      }
    });

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [roomId, loadRoom]);

  
  useEffect(() => {
    if (user && room) {
      
      const currentParticipant = room.participants?.find(p => p.user._id === user._id);
      if (currentParticipant && currentParticipant.user.profilePicture !== user.profilePicture) {
        loadRoom();
      }
    }
  }, [user, room, loadRoom]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const updateLocalProgress = (result) => {
    if (result.todayProgress) {
      setTodayProgress(result.todayProgress);
      setDailyPercentage(result.todayProgress.dailyPercentage || 0);
    }
    
    if (result.weeklyProgress) {
      setOverallPercentage(result.weeklyProgress.overallPercentage || 0);
      setCurrentWeek(result.weeklyProgress.currentWeek || 1);
    }
    
    if (result.roomProgress) {
      setRoomGoals(prevRoomGoals => {
        const updatedRoomGoals = prevRoomGoals.map(goal => {
          const goalCompletion = result.roomProgress.completedGoals.find(
            cg => cg.goalId.toString() === goal._id.toString() && 
                  cg.userId.toString() === user._id.toString()
          );
          
          return {
            ...goal,
            userCompleted: goalCompletion ? goalCompletion.completed : false
          };
        });
        
        return updatedRoomGoals;
      });
      
      setRoomGoalProgress(result.roomProgress.dailyPercentage || 0);
    }

    
    if (result.todayProgress && user) {
     
      setUpdatingParticipants(prev => new Set([...prev, user._id]));
      
      setRoom(prevRoom => {
        if (!prevRoom || !prevRoom.participants) return prevRoom;
        
        const updatedParticipants = prevRoom.participants.map(participant => {
          if (participant.user._id === user._id) {
            return {
              ...participant,
              progress: {
                ...participant.progress,
                hasGoals: true,
                dailyPercentage: result.todayProgress.dailyPercentage || 0,
                goals: result.todayProgress.completedGoals || []
              }
            };
          }
          return participant;
        });
        
        return {
          ...prevRoom,
          participants: updatedParticipants
        };
      });
      
      
      setTimeout(() => {
        setUpdatingParticipants(prev => {
          const newSet = new Set(prev);
          newSet.delete(user._id);
          return newSet;
        });
      }, 600);
    }

    if (result.roomProgress && user) {

      setUpdatingParticipants(prev => new Set([...prev, user._id]));
      
      setRoom(prevRoom => {
        if (!prevRoom || !prevRoom.participants) return prevRoom;
        
        const updatedParticipants = prevRoom.participants.map(participant => {
          if (participant.user._id === user._id) {
            const individualProgress = participant.progress?.dailyPercentage || 0;
            const roomProgress = result.roomProgress.dailyPercentage || 0;
            const combinedProgress = Math.round((individualProgress + roomProgress) / 2);
            
            return {
              ...participant,
              progress: {
                ...participant.progress,
                hasGoals: true,
                dailyPercentage: combinedProgress
              }
            };
          }
          return participant;
        });
        
        return {
          ...prevRoom,
          participants: updatedParticipants
        };
      });
      
      setTimeout(() => {
        setUpdatingParticipants(prev => {
          const newSet = new Set(prev);
          newSet.delete(user._id);
          return newSet;
        });
      }, 600);
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
        updateLocalProgress(result);
        const message = completed ? 'Meta concluída! 🎉' : 'Meta desmarcada';
        showSuccess(message);
        
        // Emite evento para atualizar estatísticas
        emit('goalUpdated', { goalId, completed, type: 'individual' });
        
        if (completed && user) {
          triggerCelebration(user._id);
        }
      }
    } catch (err) {
      console.error('❌ Erro ao atualizar progresso:', err);
      showError('Erro ao atualizar progresso');
    }
  };

  const handleRoomGoalChange = (index, value) => {
    const updatedGoals = [...newRoomGoals];
    updatedGoals[index] = value;
    setNewRoomGoals(updatedGoals);
  };

  const handleSubmitRoomGoals = async () => {
    const validGoals = newRoomGoals.filter(goal => goal.trim() !== '');
    
    if (validGoals.length === 0) {
      showWarning('Adicione pelo menos uma meta da sala!');
      return;
    }
    
    try {
      const result = await addRoomGoals(roomId, validGoals);
      if (result.success) {
        setNewRoomGoals(['', '', '', '', '']);
        await loadRoom(); 
        showSuccess('Metas da sala atualizadas com sucesso! 🏠');
      }
    } catch (err) {
      console.error('Erro ao definir metas da sala:', err);
      showError('Erro ao definir metas da sala');
    }
  };

    const handleToggleRoomGoal = async (goalId, completed) => {
    try {
      const result = await completeRoomGoal(roomId, goalId, completed);
      if (result.success) {
        updateLocalProgress(result);
        const message = completed ? 'Meta da sala concluída! 🏠' : 'Meta da sala desmarcada';
        showSuccess(message);
        
        // Emite evento para atualizar estatísticas
        emit('goalUpdated', { goalId, completed, type: 'room' });
        
        if (completed && user) {
          triggerCelebration(user._id);
        }
      }
    } catch (err) {
      console.error('Erro ao atualizar progresso da meta da sala:', err);
      showError('Erro ao atualizar progresso da meta da sala');
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

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim() && user) {
      const messageData = {
        room: roomId,
        author: {
          _id: user._id,
          name: user.name || user.username,
          profilePicture: user.profilePicture,
        },
        message: currentMessage.trim(),
        timestamp: new Date(),
      };
      socket.emit('send_message', messageData);
      setCurrentMessage('');
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

  const shouldShowRoomGoalsForm = () => {
    return roomGoals.length === 0;
  };

  const shouldShowDailyReminder = () => {
    if (weeklyGoals.length === 0) return false;
    
    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;
    

    return !todayProgress && !isWeekend;
  };

  const toggleIndividualGoals = () => {
    setExpandedIndividualGoals(!expandedIndividualGoals);
  };

  const toggleRoomGoals = () => {
    setExpandedRoomGoals(!expandedRoomGoals);
  };

  const handleFeedbackAction = () => {
    setShowFeedback(false);
    navigate('/my-rooms');
  };

  const getParticipantProgress = (participant) => {
    if (participant.progress && participant.progress.hasGoals) {
      return participant.progress.dailyPercentage || 0;
    }
    return 0;
  };

  const getParticipantCardClass = (participant) => {
    const progress = getParticipantProgress(participant);
    const completedGoals = participant.progress?.goals?.filter(g => g.completed).length || 0;
    const totalGoals = participant.progress?.goals?.length || 0;
    const isAllCompleted = completedGoals === totalGoals && totalGoals > 0;
    const isUpdating = updatingParticipants.has(participant.user._id);
    
    let baseClass = 'participant-card-modern';
    
   
    if (progress >= 100) {
      baseClass += ' progress-excellent';
    } else if (progress >= 75) {
      baseClass += ' progress-good';
    } else if (progress >= 50) {
      baseClass += ' progress-average';
    } else {
      baseClass += ' progress-poor';
    }
    

    if (isAllCompleted) {
      baseClass += ' stars';
    }
    
    if (isUpdating) {
      baseClass += ' updating';
    }
    
    return baseClass;
  };

  const triggerCelebration = (participantId) => {

    const element = document.querySelector(`[data-participant-id="${participantId}"]`);
    if (element) {
      element.classList.add('celebration');
      setTimeout(() => {
        element.classList.remove('celebration');
      }, 2000);
    }
  };

  const getHotStreak = (participant) => {

    if (participant.user?.streakData?.currentStreak !== undefined && 
        participant.user?.streakData?.streakHistory?.length > 0) {
      return participant.user.streakData.currentStreak;
    }

    const progress = getParticipantProgress(participant);
    
    if (progress > 0) {
      return 1; 
    }
    
    return 0;
  };

  const getLastActivity = (participant) => {
    if (participant.user._id === user?._id) {
      return { text: 'Ativo agora', class: 'active' };
    }

    if (participant.user?.timeSinceLastActivity) {
      return participant.user.timeSinceLastActivity;
    }

    const progress = getParticipantProgress(participant);
    const totalGoals = participant.progress?.goals?.length || 0;
    
    if (progress > 0) {
      if (progress >= 100) {
        return { text: 'Ativo agora', class: 'active' };
      } else if (progress >= 75) {
        return { text: 'Ativo há 1h', class: 'active' };
      } else if (progress >= 50) {
        return { text: 'Ativo há 2h', class: 'active' };
      } else if (progress >= 25) {
        return { text: 'Ativo há 3h', class: 'inactive' };
      } else {
        return { text: 'Ativo há 4h', class: 'inactive' };
      }
    }
    
    if (totalGoals > 0) {
      return { text: 'Ativo há 6h', class: 'inactive' };
    }
    
    return { text: 'Sem atividade', class: 'inactive' };
  };

  const getStreakBadgeClass = (streakDays) => {
    if (streakDays >= 7) return 'streak-7';
    if (streakDays >= 5) return 'streak-5';
    if (streakDays >= 3) return 'streak-3';
    return '';
  };

  const getProgressCardClass = (percentage) => {
    if (percentage >= 100) return 'progress-excellent';
    if (percentage >= 75) return 'progress-good';
    if (percentage >= 50) return 'progress-average';
    if (percentage >= 25) return 'progress-poor';
    return '';
  };

  const isFriendAlreadyInRoom = (friendId) => {
    return room?.participants?.some(p => p.user._id === friendId);
  };


  const toggleParticipantExpansion = (participantId) => {
    setExpandedParticipants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(participantId)) {
        newSet.delete(participantId);
      } else {
        newSet.add(participantId);
      }
      return newSet;
    });
  };


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

            <div className="room-title-section">
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
                    placeholder="Digite o nome da sala..."
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
                <div className="room-title-enhanced">
                  <div className="title-header">
                    <h1 className="main-title">
                      <span className="room-icon">🏠</span>
                      <span className="title-text">{room.name}</span>
                    </h1>
                    {canEdit && (
                      <button 
                        onClick={startEditingTitle}
                        className="edit-title-btn"
                        title="Editar título"
                      >
                        ✏️
                      </button>
                    )}
                  </div>
                  
                  <div className="title-badges">
                    <span className={`room-status-badge ${overallPercentage >= 75 ? 'active' : overallPercentage >= 50 ? 'medium' : 'inactive'}`}>
                      {overallPercentage >= 75 ? '🟢 Ativa' : overallPercentage >= 50 ? '🟡 Média' : '🔴 Inativa'}
                    </span>
                    <span className="participants-count">
                      👥 {room.participants?.length || 0} membros
                    </span>
                  </div>
                  

                  <div className="room-meta-info">
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span className="meta-text">Semana {currentWeek} de 12</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">🎯</span>
                      <span className="meta-text">{weeklyGoals.length + roomGoals.length} metas ativas</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">📈</span>
                      <span className="meta-text">{Math.round(overallPercentage)}% completo</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

        
            <div className="room-description-section">
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
                    placeholder="Digite uma descrição para esta sala..."
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
                <div className="room-description-enhanced">
                  {room.description ? (
                    <div className="description-content">
                      <p className="description-text">{room.description}</p>
                      {canEdit && (
                        <button 
                          onClick={startEditingDescription}
                          className="edit-description-btn"
                          title="Editar descrição"
                        >
                          ✏️
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="no-description-state">
                      <span className="no-desc-icon">📝</span>
                      <span className="no-desc-text">Adicione uma descrição para esta sala</span>
                      {canEdit && (
                        <button 
                          onClick={startEditingDescription}
                          className="add-description-btn"
                          title="Adicionar descrição"
                        >
                          Adicionar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>


            <div className="room-stats-header">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <span className="stat-value">{room.participants?.length || 0}</span>
                  <span className="stat-label">Participantes</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <span className="stat-value">{weeklyGoals.length + roomGoals.length}</span>
                  <span className="stat-label">Metas Ativas</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-content">
                  <span className="stat-value">{Math.round(dailyPercentage)}%</span>
                  <span className="stat-label">Hoje</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-content">
                  <span className="stat-value">{Math.round(overallPercentage)}%</span>
                  <span className="stat-label">Geral</span>
                </div>
              </div>
            </div>
          </RoomInfo>
        </Header>
        <Content>
          <GoalsSection className="modern-goals">
            <div className="goals-card-header">
              <div className="header-left">
                <div className="goals-icon room">🏠</div>
                <div className="goals-info">
                  <h2>Metas da Sala</h2>
                  <span className="goals-subtitle">Progresso Coletivo: {Math.round(roomGoalProgress)}%</span>
                </div>
              </div>
              <div className="header-right">
                <div className="progress-badge room">
                  {Math.round(roomGoalProgress)}%
                </div>
                <button 
                  className="expand-toggle modern"
                  onClick={toggleRoomGoals}
                  title={expandedRoomGoals ? 'Recolher metas da sala' : 'Expandir metas da sala'}
                >
                  <span className={`arrow ${expandedRoomGoals ? 'expanded' : ''}`}>▼</span>
                </button>
              </div>
            </div>

            {expandedRoomGoals && (
              <>
                {shouldShowRoomGoalsForm() ? (
                  isAdmin && (
                    <GoalsForm>
                      <h3>Defina as metas da sala (máximo 5):</h3>
                      <p className="info">
                        <strong>Administrador:</strong> Estas metas serão visíveis para todos os participantes 
                        e cada um poderá marcar seu progresso individual.
                        <br/><br/>
                        <strong>⚡ Importante:</strong> As metas da sala <u>contribuem para o progresso individual </u> 
                        de cada participante, afetando tanto o progresso diário quanto o progresso das 12 semanas.
                      </p>
                      {newRoomGoals.map((goal, index) => (
                        <input
                          key={index}
                          type="text"
                          placeholder={`Meta da Sala ${index + 1}`}
                          value={goal}
                          onChange={(e) => handleRoomGoalChange(index, e.target.value)}
                          maxLength={100}
                        />
                      ))}
                      <button onClick={handleSubmitRoomGoals}>
                        Definir Metas da Sala
                      </button>
                    </GoalsForm>
                  )
                ) : (
                  <div className="modern-goals-container">
                    <div className="goals-actions">
                      <h3>Metas da sala para hoje</h3>
                      {isAdmin && (
                        <button 
                          className="edit-goals-btn modern"
                          onClick={() => {
                            setNewRoomGoals(roomGoals.map(goal => goal.text).concat(['', '', '', '', '']).slice(0, 5));
                            setRoomGoals([]);
                          }}
                        >
                          <span className="btn-icon">✏️</span>
                          Editar
                        </button>
                      )}
                    </div>
                    
                    <div className="goals-grid">
                      {roomGoals.map((goal, index) => {
                        const isCompleted = goal.userCompleted || false;
                         
                        return (
                          <div 
                            key={goal._id || index} 
                            className={`goal-card room ${isCompleted ? 'completed' : 'pending'}`}
                            onClick={() => handleToggleRoomGoal(goal._id, !isCompleted)}
                          >
                            <div className="goal-status">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => {}}
                                className="goal-checkbox"
                                tabIndex={-1} 
                              />
                              <div className={`status-indicator ${isCompleted ? 'completed' : 'pending'}`}>
                                {isCompleted ? '✓' : '○'}
                              </div>
                            </div>
                            <div className="goal-content">
                              <span className={`goal-text ${isCompleted ? 'completed' : ''}`}>
                                {goal.text}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </GoalsSection>
            
           
          <GoalsSection className="modern-goals">
            <div className="goals-card-header">
              <div className="header-left">
                <div className="goals-icon individual">👤</div>
                <div className="goals-info">
                  <h2>Metas Individuais</h2>
                  <span className="goals-subtitle">Semana {currentWeek} de 12</span>
                </div>
              </div>
              <div className="header-right">
                <div className="progress-badge individual">
                  {todayProgress?.completedGoals?.filter(g => g.completed).length || 0}/{weeklyGoals.length}
                </div>
                <button 
                  className="expand-toggle modern"
                  onClick={toggleIndividualGoals}
                  title={expandedIndividualGoals ? 'Recolher metas individuais' : 'Expandir metas individuais'}
                >
                  <span className={`arrow ${expandedIndividualGoals ? 'expanded' : ''}`}>▼</span>
                </button>
              </div>
            </div>

            {expandedIndividualGoals && (
              <>
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
                  <div className="modern-goals-container">
                    <div className="goals-actions">
                      <h3>Metas de hoje</h3>
                      <button 
                        className="edit-goals-btn modern"
                        onClick={() => {
                          setNewGoals(weeklyGoals.map(goal => goal.text).concat(['', '', '', '', '']).slice(0, 5));
                          setWeeklyGoals([]);
                        }}
                      >
                        <span className="btn-icon">✏️</span>
                        Editar
                      </button>
                    </div>
                    
                    <div className="goals-grid">
                      {weeklyGoals.map((goal, index) => {
                        const isCompleted = todayProgress?.completedGoals?.find(
                          gp => gp.goalId === goal._id
                        )?.completed || false;
                         
                        return (
                          <div 
                            key={goal._id || index} 
                            className={`goal-card ${isCompleted ? 'completed' : 'pending'}`}
                            onClick={() => handleToggleGoal(goal._id, !isCompleted)}
                          >
                            <div className="goal-status">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => {}} 
                                className="goal-checkbox"
                                tabIndex={-1} 
                              />
                              <div className={`status-indicator ${isCompleted ? 'completed' : 'pending'}`}>
                                {isCompleted ? '✓' : '○'}
                              </div>
                            </div>
                            <div className="goal-content">
                              <span className={`goal-text ${isCompleted ? 'completed' : ''}`}>
                                {goal.text}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </GoalsSection>

            
          <ProgressSection>
            <ProgressCard className={`modern-card ${getProgressCardClass(dailyPercentage)}`}>
              <div className="card-header">
                <div className={`card-icon today modern-icon ${Math.round(dailyPercentage) === 100 ? 'perfect-progress' : ''}`}>
                  <span className="icon-emoji">⚡</span>
                  <div className="icon-glow"></div>
                </div>
                <div className="card-title">
                  <h3>Hoje</h3>
                  <span className="card-subtitle">Progresso diário</span>
                </div>
                <div className="card-percentage">{Math.round(dailyPercentage)}%</div>
              </div>
              
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill today" 
                    style={{ width: `${dailyPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="progress-details">
                <div className="detail-item">
                  <span className="detail-icon">👤</span>
                  <span className="detail-text">Individual</span>
                  <span className="detail-count">
                    {todayProgress?.completedGoals?.filter(g => g.completed).length || 0}/{weeklyGoals.length}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🏠</span>
                  <span className="detail-text">Sala</span>
                  <span className="detail-count">
                    {roomGoals.filter(goal => goal.userCompleted).length}/{roomGoals.length}
                  </span>
                </div>
              </div>
            </ProgressCard>

            <ProgressCard className={`modern-card ${getProgressCardClass(overallPercentage)}`}>
              <div className="card-header">
                <div className={`card-icon overall modern-icon ${Math.round(overallPercentage) === 100 ? 'perfect-progress' : ''}`}>
                  <span className="icon-emoji">🏆</span>
                  <div className="icon-glow"></div>
                </div>
                <div className="card-title">
                  <h3>12 Semanas</h3>
                  <span className="card-subtitle">Progresso geral</span>
                </div>
                <div className="card-percentage">{Math.round(overallPercentage)}%</div>
              </div>
              
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill overall" 
                    style={{ width: `${overallPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="progress-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span className="detail-text">Semana atual</span>
                  <span className="detail-count">{currentWeek}/12</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⭐</span>
                  <span className="detail-text">Todas as metas</span>
                  <span className="detail-count">Completo</span>
                </div>
              </div>
            </ProgressCard>
          </ProgressSection>

            
          <ParticipantsSection className="modern-participants">
            <div className="participants-card-header">
              <div className="header-left">
                <div className="participants-icon">👥</div>
                <div className="participants-info">
                  <h2>Participantes</h2>
                  <span className="participants-subtitle">{room?.participants?.length || 0} membros</span>
                </div>
              </div>
              <div className="header-right">
                <button 
                  className="invite-button modern"
                  onClick={() => setShowInviteForm(!showInviteForm)}
                >
                  <span className="btn-icon">+</span>
                  Convidar
                </button>
              </div>
            </div>

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

            <div className="modern-participants-grid">
              {room.participants?.map((participant) => (
                <div 
                  key={participant.user._id} 
                  className={getParticipantCardClass(participant)}
                  data-participant-id={participant.user._id}
                >
                  <div className="participant-header">
                    <div className="participant-avatar">
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
                    <div className="participant-info">
                      <h4>{participant.user.name}</h4>
                      <div className="participant-badges">
                        <span className={`role-badge ${participant.role}`}>
                          {participant.role === 'admin' ? '👑 Admin' : '👤 Membro'}
                        </span>
                        
                        {(() => {
                          const streakDays = getHotStreak(participant);
                          const activity = getLastActivity(participant);
                          
                          return (
                            <>
                              {streakDays > 0 && (
                                <span className={`hot-streak-badge ${getStreakBadgeClass(streakDays)}`}>
                                  🔥 {streakDays} dias
                                </span>
                              )}
                              <span className={`activity-badge ${activity.class}`}>
                                {activity.text}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                     
                  <div className="participant-progress">
                    {weeklyGoals.length > 0 ? (
                      participant.progress && participant.progress.hasGoals ? (
                        <div 
                          className="progress-section clickable"
                          onClick={() => toggleParticipantExpansion(participant.user._id)}
                        >
                          <div className="progress-header">
                            <span className="progress-label">Progresso de hoje</span>
                            <div className="progress-value">
                              <span className="percentage">{Math.round(getParticipantProgress(participant))}%</span>
                              <span className={`expand-arrow ${expandedParticipants.has(participant.user._id) ? 'expanded' : ''}`}>
                                ▼
                              </span>
                            </div>
                          </div>
                          <div className="progress-bar-modern">
                            <div 
                              className="progress-fill-modern" 
                              style={{ width: `${getParticipantProgress(participant)}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="no-progress">
                          <span className="no-progress-icon">📝</span>
                          <span className="no-progress-text">Sem metas definidas</span>
                        </div>
                      )
                    ) : (
                      <div className="no-progress">
                        <span className="no-progress-icon">⏳</span>
                        <span className="no-progress-text">Aguardando metas</span>
                      </div>
                    )}
                  </div>
                  
                  
                  {expandedParticipants.has(participant.user._id) && participant.progress && participant.progress.hasGoals && (
                    <div className="participant-goals-expanded">
                      <h5>Metas de hoje:</h5>
                      <div className="goals-list">
                        {participant.progress.goals?.map((goal, index) => (
                          <div key={goal.goalId || index} className={`goal-item ${goal.completed ? 'completed' : 'pending'}`}>
                            <span className="goal-status">
                              {goal.completed ? '✅' : '⏳'}
                            </span>
                            <span className="goal-text">
                              {goal.text || `Meta ${index + 1}`}
                            </span>
                          </div>
                        )) || (
                          <div className="no-goals-data">
                            <span>Dados das metas não disponíveis</span>
                          </div>
                        )}
                      </div>
                      <div className="goals-summary">
                        <span className="completed-count">
                          {participant.progress.goals?.filter(g => g.completed).length || 0} de {participant.progress.goals?.length || 0} concluídas
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ParticipantsSection>

           
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

      {!isChatOpen && (
        <FloatingChatButton onClick={() => setIsChatOpen(true)}>
          <MessageSquare />
          {getUnreadCount(roomId) > 0 && (
            <div className="notification-badge">
              {getUnreadCount(roomId)}
            </div>
          )}
        </FloatingChatButton>
      )}

      {isChatOpen && (
        <Chat 
          messages={messages}
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          sendMessage={sendMessage}
          user={user}
          onClose={() => setIsChatOpen(false)}
          socket={socket}
        />
      )}
    </Container>
  );
};

export default Room;
