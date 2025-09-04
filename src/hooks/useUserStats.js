import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useEvents } from '../contexts/EventContext.jsx';
import { useRooms } from './useRooms';
import { useFriends } from './useFriends';

export const useUserStats = () => {
  const { user } = useAuth();
  const { rooms } = useRooms();
  const { friends } = useFriends();
  const { on } = useEvents();
  
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalGoals: 0,
    completedGoals: 0,
    overallProgress: 0,
    currentWeek: 1,
    totalFriends: 0,
    weeklyStreak: 0,
    todayProgress: 0,
    totalFocusTime: 0,
    currentStreak: 0,
    achievements: [],
    weeklyGoalProgress: 0,
    loading: true
  });

  const calculateStats = useCallback(() => {
    if (!user || !rooms) {
      setStats(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
    
      const totalRooms = rooms.length;
      const totalFriends = friends?.length || 0;

      
      let totalGoals = 0;
      let completedGoals = 0;
      let overallProgress = user.weeklyProgress?.overallPercentage || 0;
      let currentWeek = user.weeklyProgress?.currentWeek || 1;
      let todayProgress = 0;

      
      rooms.forEach(room => {
        
        const userGoals = user.individualGoals?.filter(goal => 
          goal.roomId?.toString() === room._id?.toString() && goal.isActive
        ) || [];
        
        totalGoals += userGoals.length;

        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayProgressData = user.dailyProgress?.find(progress => 
          progress.roomId?.toString() === room._id?.toString() &&
          progress.date && new Date(progress.date).toDateString() === today.toDateString()
        );

        if (todayProgressData) {
          const completed = todayProgressData.completedGoals?.filter(g => g.completed).length || 0;
          completedGoals += completed;
          todayProgress += todayProgressData.dailyPercentage || 0;
        }
      });

      
      if (totalRooms > 0) {
        todayProgress = todayProgress / totalRooms;
      }

      
      const weeklyStreak = calculateWeeklyStreak();

      const totalFocusTime = calculateTotalFocusTime();
      const currentStreak = calculateCurrentStreak();
      
      const achievements = calculateAchievements(totalRooms, currentStreak, totalFocusTime, totalFriends, completedGoals, overallProgress);
      
      
      const weeklyGoalProgress = Math.round(overallProgress);

      setStats({
        totalRooms,
        totalGoals,
        completedGoals,
        overallProgress: Math.round(overallProgress),
        currentWeek,
        totalFriends,
        weeklyStreak,
        todayProgress: Math.round(todayProgress),
        
        totalFocusTime,
        currentStreak,
        achievements,
        weeklyGoalProgress,
        loading: false
      });

    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  }, [user, rooms, friends]);

  const calculateWeeklyStreak = () => {
    if (!user?.weeklyProgress?.weeklyPercentages) return 0;
    
    const weeklyData = user.weeklyProgress.weeklyPercentages;
    let streak = 0;
    
    
    for (let i = weeklyData.length - 1; i >= 0; i--) {
      if (weeklyData[i].percentage > 70) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateTotalFocusTime = () => {
    if (!user?.dailyProgress) return 0;
    
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    let totalMinutes = 0;
    
    user.dailyProgress.forEach(progress => {

      const progressDate = new Date(progress.date);
      if (progressDate >= thirtyDaysAgo && progress.dailyPercentage > 0) {
        
        const completedGoals = progress.completedGoals?.filter(g => g.completed).length || 0;
        
        
        const estimatedMinutes = Math.round(completedGoals * 18); 
        totalMinutes += Math.min(estimatedMinutes, 180); 
      }
    });
    
    return totalMinutes;
  };

  const calculateCurrentStreak = () => {
    if (user?.streakData?.currentStreak !== undefined) {
      return user.streakData.currentStreak;
    }
    
    if (!user?.dailyProgress) return 0;
    
    const today = new Date();
    let streak = 0;
    
    
    for (let i = 0; i < 30; i++) { 
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);
      
      const dayProgress = user.dailyProgress.find(progress => {
        const progressDate = new Date(progress.date);
        progressDate.setHours(0, 0, 0, 0);
        return progressDate.getTime() === checkDate.getTime();
      });
      
      if (dayProgress && dayProgress.dailyPercentage > 0) {
        streak++;
      } else if (i > 0) { 
        break;
      }
    }
    
    return streak;
  };

  const calculateAchievements = (totalRooms, currentStreak, totalFocusTime, totalFriends, completedGoals, overallProgress) => {
    const allAchievements = [
      
      {
        id: 'welcome',
        name: 'Bem-vindo',
        description: 'Entrou na plataforma',
        icon: '👋',
        category: 'inicio',
        unlocked: true 
      },
      {
        id: 'first_room',
        name: 'Primeira Sala',
        description: 'Criou sua primeira sala de estudos',
        icon: '🏠',
        category: 'inicio',
        unlocked: totalRooms > 0
      },
      {
        id: 'first_goal',
        name: 'Primeira Meta',
        description: 'Completou sua primeira meta',
        icon: '🎯',
        category: 'inicio',
        unlocked: completedGoals > 0
      },
      {
        id: 'first_friend',
        name: 'Social',
        description: 'Adicionou seu primeiro amigo',
        icon: '👥',
        category: 'social',
        unlocked: totalFriends > 0
      },
      
      
      {
        id: 'first_minute',
        name: 'Primeiro Minuto',
        description: 'Começou sua jornada de foco',
        icon: '⏰',
        category: 'tempo',
        unlocked: true 
      },
      {
        id: 'one_hour',
        name: 'Primeira Hora',
        description: 'Acumulou 1 hora de tempo de foco',
        icon: '⏱️',
        category: 'tempo',
        unlocked: totalFocusTime >= 60
      },
      {
        id: 'five_hours',
        name: 'Foco Intenso',
        description: 'Acumulou 5 horas de tempo de foco',
        icon: '⏱️',
        category: 'tempo',
        unlocked: totalFocusTime >= 300
      },
      {
        id: 'ten_hours',
        name: 'Maratonista',
        description: 'Acumulou 10 horas de tempo de foco',
        icon: '🏃‍♂️',
        category: 'tempo',
        unlocked: totalFocusTime >= 600
      },
      {
        id: 'twenty_hours',
        name: 'Mestre do Tempo',
        description: 'Acumulou 20 horas de tempo de foco',
        icon: '⏳',
        category: 'tempo',
        unlocked: totalFocusTime >= 1200
      },
      
      
      {
        id: 'first_day',
        name: 'Primeiro Dia',
        description: 'Começou sua sequência de foco',
        icon: '📅',
        category: 'streak',
        unlocked: true 
      },
      {
        id: 'three_days',
        name: 'Três Dias',
        description: 'Manteve foco por 3 dias consecutivos',
        icon: '📆',
        category: 'streak',
        unlocked: currentStreak >= 3
      },
      {
        id: 'week_streak',
        name: 'Semana de Foco',
        description: 'Manteve foco por 7 dias consecutivos',
        icon: '🔥',
        category: 'streak',
        unlocked: currentStreak >= 7
      },
      {
        id: 'month_streak',
        name: 'Mês de Dedicação',
        description: 'Manteve foco por 30 dias consecutivos',
        icon: '📆',
        category: 'streak',
        unlocked: currentStreak >= 30
      },
      
      
      {
        id: 'five_rooms',
        name: 'Organizador',
        description: 'Criou 5 salas de estudos',
        icon: '🏢',
        category: 'salas',
        unlocked: totalRooms >= 5
      },
      {
        id: 'ten_rooms',
        name: 'Arquiteto',
        description: 'Criou 10 salas de estudos',
        icon: '🏗️',
        category: 'salas',
        unlocked: totalRooms >= 10
      },
      
      
      {
        id: 'ten_goals',
        name: 'Persistente',
        description: 'Completou 10 metas',
        icon: '✅',
        category: 'metas',
        unlocked: completedGoals >= 10
      },
      {
        id: 'fifty_goals',
        name: 'Conquistador',
        description: 'Completou 50 metas',
        icon: '🏆',
        category: 'metas',
        unlocked: completedGoals >= 50
      },
      {
        id: 'hundred_goals',
        name: 'Lenda',
        description: 'Completou 100 metas',
        icon: '👑',
        category: 'metas',
        unlocked: completedGoals >= 100
      },
      
      
      {
        id: 'five_friends',
        name: 'Popular',
        description: 'Adicionou 5 amigos',
        icon: '👨‍👩‍👧‍👦',
        category: 'social',
        unlocked: totalFriends >= 5
      },
      {
        id: 'ten_friends',
        name: 'Influenciador',
        description: 'Adicionou 10 amigos',
        icon: '🌟',
        category: 'social',
        unlocked: totalFriends >= 10
      },
      
      
      {
        id: 'perfect_week',
        name: 'Semana Perfeita',
        description: 'Alcançou 100% de progresso em uma semana',
        icon: '💯',
        category: 'especial',
        unlocked: overallProgress >= 100
      },
      {
        id: 'early_bird',
        name: 'Madrugador',
        description: 'Estudou antes das 6h da manhã',
        icon: '🌅',
        category: 'especial',
        unlocked: false 
      },
      {
        id: 'night_owl',
        name: 'Coruja',
        description: 'Estudou depois das 23h',
        icon: '🦉',
        category: 'especial',
        unlocked: false 
      }
    ];
    
    return allAchievements;
  };

  useEffect(() => {
    calculateStats();
  }, [calculateStats, user, rooms, friends]);

  // Escuta eventos de atualização de metas
  useEffect(() => {
    const unsubscribe = on('goalUpdated', () => {
      console.log('Meta atualizada, recalculando estatísticas...');
      calculateStats();
    });

    return unsubscribe;
  }, [on, calculateStats]);

  const refreshStats = useCallback(() => {
    setStats(prev => ({ ...prev, loading: true }));
    calculateStats();
  }, [calculateStats]);

  return {
    ...stats,
    refreshStats
  };
};
