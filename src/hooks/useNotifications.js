import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { friendsAPI } from '../config/api';
import { useToast } from '../components/Toast/index.jsx';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await friendsAPI.getNotifications();
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await friendsAPI.getUnreadCount();
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Erro ao contar notificações não lidas:', error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [fetchNotifications, fetchUnreadCount]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await friendsAPI.markNotificationAsRead(notificationId);
      
      
      setNotifications(prev => 
        prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      showSuccess('Notificação marcada como lida.');
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      showError('Não foi possível marcar a notificação como lida.');
    }
  }, [showSuccess, showError]);

  const markAllAsRead = useCallback(async () => {
    try {
      await friendsAPI.markAllNotificationsAsRead();
      
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      
      showSuccess('Todas as notificações foram marcadas como lidas.');
    } catch (error) {
      console.error('Erro ao marcar todas as notificações como lidas:', error);
      showError('Não foi possível marcar todas as notificações como lidas.');
    }
  }, [showSuccess, showError]);

  return { 
    notifications, 
    unreadCount, 
    loading, 
    fetchNotifications, 
    fetchUnreadCount,
    markAsRead, 
    markAllAsRead 
  };
};
