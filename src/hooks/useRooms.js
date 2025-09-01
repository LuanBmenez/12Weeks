import { useState, useEffect, useCallback } from 'react';
import { roomsAPI } from '../config/api';

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await roomsAPI.getMyRooms();
      
      if (response.data.success) {
        setRooms(response.data.rooms);
      }
    } catch (err) {
      setError('Erro ao carregar salas');
      console.error('Erro ao buscar salas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRoom = useCallback(async (roomData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await roomsAPI.createRoom(roomData);
      
      if (response.data.success) {
        const newRoom = response.data.room;
        setRooms(prevRooms => [newRoom, ...prevRooms]);
        return { success: true, room: newRoom };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao criar sala';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const addDailyGoals = useCallback(async (roomId, goals) => {
    try {
      setError(null);
      
      const response = await roomsAPI.setWeeklyGoals(roomId, goals);
      
      if (response.data.success) {
        
        setRooms(prevRooms => 
          prevRooms.map(room => 
            room._id === roomId 
              ? { 
                  ...room, 
                  weeklyGoals: [...(room.weeklyGoals || []), ...response.data.weeklyGoals],
                  dailyProgress: [...(room.dailyProgress || []), response.data.todayProgress]
                }
              : room
          )
        );
        
        return { success: true };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao definir metas semanais';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  const completeGoal = useCallback(async (roomId, goalId, completed) => {
    try {
      setError(null);
      
      const response = await roomsAPI.updateDailyProgress(roomId, goalId, completed);
      
      if (response.data.success) {
        
        setRooms(prevRooms => 
          prevRooms.map(room => {
            if (room._id === roomId) {
              const updatedRoom = { ...room };
              
              
              const todayProgressIndex = updatedRoom.dailyProgress.findIndex(
                progress => progress.date === response.data.todayProgress.date
              );
              
              if (todayProgressIndex >= 0) {
                updatedRoom.dailyProgress[todayProgressIndex] = response.data.todayProgress;
              } else {
                updatedRoom.dailyProgress.push(response.data.todayProgress);
              }
              
              
              updatedRoom.weeklyProgress = response.data.weeklyProgress;
              
              return updatedRoom;
            }
            return room;
          })
        );
        
        return { 
          success: true, 
          todayProgress: response.data.todayProgress,
          weeklyProgress: response.data.weeklyProgress
        };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao atualizar progresso';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  const editRoom = useCallback(async (roomId, updates) => {
    try {
      setError(null);
      
      const response = await roomsAPI.editRoom(roomId, updates);
      
      if (response.data.success) {
        
        setRooms(prevRooms => 
          prevRooms.map(room => 
            room._id === roomId 
              ? { ...room, ...response.data.room }
              : room
          )
        );
        
        return { success: true, room: response.data.room };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao editar sala';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  const getRoom = useCallback(async (roomId) => {
    try {
      setError(null);
      
      const response = await roomsAPI.getRoom(roomId);
      
      if (response.data.success) {
        return { success: true, room: response.data.room };
      } else {
        return { success: false, message: 'Erro ao buscar sala' };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao buscar sala';
      return { success: false, message: errorMessage };
    }
  }, []);

  const inviteUser = useCallback(async (roomId, data) => {
    try {
      setError(null);
      
      const response = await roomsAPI.inviteUser(roomId, data);
      
      if (response.data.success) {
        
        setRooms(prevRooms => 
          prevRooms.map(room => 
            room._id === roomId 
              ? { ...room, participants: response.data.room.participants }
              : room
          )
        );
        
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao convidar usuário';
      return { success: false, message: errorMessage };
    }
  }, []);

  const deleteRoom = useCallback(async (roomId) => {
    try {
      setError(null);
      
      const response = await roomsAPI.deleteRoom(roomId);
      
      if (response.data.success) {
        
        setRooms(prevRooms => prevRooms.filter(room => room._id !== roomId));
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao deletar sala';
      return { success: false, message: errorMessage };
    }
  }, []);

  const addRoomGoals = useCallback(async (roomId, goals) => {
    try {
      setError(null);
      
      const response = await roomsAPI.setRoomGoals(roomId, goals);
      
      if (response.data.success) {
        return { success: true };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao definir metas da sala';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  const completeRoomGoal = useCallback(async (roomId, goalId, completed) => {
    try {
      setError(null);
      
      const response = await roomsAPI.updateRoomGoalProgress(roomId, goalId, completed);
      
      if (response.data.success) {
     
        setRooms(prevRooms => 
          prevRooms.map(room => {
            if (room._id === roomId) {
              const updatedRoom = { ...room };
              
             
              if (updatedRoom.roomGoals) {
                updatedRoom.roomGoals = updatedRoom.roomGoals.map(goal => {
                  if (goal._id === goalId) {
                    return { ...goal, userCompleted: completed };
                  }
                  return goal;
                });
              }
              
              return updatedRoom;
            }
            return room;
          })
        );
        
        return { 
          success: true, 
          roomProgress: response.data.roomProgress,
          todayProgress: response.data.todayProgress,
          weeklyProgress: response.data.weeklyProgress
        };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao atualizar progresso da meta da sala';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    createRoom,
    addDailyGoals,
    completeGoal,
    editRoom,
    getRoom,
    inviteUser,
    deleteRoom,
    addRoomGoals,
    completeRoomGoal
  };
};

