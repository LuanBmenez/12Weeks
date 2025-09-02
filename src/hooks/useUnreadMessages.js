import { useState, useEffect, useCallback } from 'react';
import { roomsAPI } from '../config/api';

export const useUnreadMessages = () => {
  const [unreadMessages, setUnreadMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUnreadMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await roomsAPI.getUnreadMessages();
      
      if (response.data.success) {

        const unreadMap = {};
        response.data.unreadMessages.forEach(item => {
          unreadMap[item.roomId] = item.count;
        });
        setUnreadMessages(unreadMap);
      }
    } catch (err) {
      setError('Erro ao carregar mensagens não lidas');
      console.error('Erro ao buscar mensagens não lidas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getUnreadCount = useCallback((roomId) => {
    return unreadMessages[roomId] || 0;
  }, [unreadMessages]);

  const markAsRead = useCallback((roomId) => {
    setUnreadMessages(prev => ({
      ...prev,
      [roomId]: 0
    }));
  }, []);

  useEffect(() => {
    fetchUnreadMessages();
  }, [fetchUnreadMessages]);

  return {
    unreadMessages,
    loading,
    error,
    fetchUnreadMessages,
    getUnreadCount,
    markAsRead
  };
};
