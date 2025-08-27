import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useRooms } from './useRooms';
import { useFriends } from './useFriends';

export const useUserStats = () => {
  const { user } = useAuth();
  const { rooms } = useRooms();
  const { friends } = useFriends();
  
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalGoals: 0,
    completedGoals: 0,
    overallProgress: 0,
    currentWeek: 1,
    totalFriends: 0,
    weeklyStreak: 0,
    todayProgress: 0,
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

      setStats({
        totalRooms,
        totalGoals,
        completedGoals,
        overallProgress: Math.round(overallProgress),
        currentWeek,
        totalFriends,
        weeklyStreak,
        todayProgress: Math.round(todayProgress),
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

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  const refreshStats = useCallback(() => {
    setStats(prev => ({ ...prev, loading: true }));
    calculateStats();
  }, [calculateStats]);

  return {
    ...stats,
    refreshStats
  };
};
