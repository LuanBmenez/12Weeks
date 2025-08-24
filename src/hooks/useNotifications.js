import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { friendsAPI } from '../config/api';

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  
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
      console.error('Erro ao buscar contagem de não lidas:', error);
    }
  }, []);

  
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await friendsAPI.markNotificationAsRead(notificationId);
      
      
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
      
      
      await fetchUnreadCount();
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  }, [fetchUnreadCount]);

  
  const markAllAsRead = useCallback(async () => {
    try {
      await friendsAPI.markAllNotificationsAsRead();
      
      
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      
      setUnreadCount(0);
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  }, []);

  
  const addNotification = useCallback((notification) => {
    setNotifications(prev => [notification, ...prev]);
    if (!notification.read) {
      setUnreadCount(prev => prev + 1);
    }
  }, []);

  
  useEffect(() => {
    if (user) {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [user, fetchNotifications, fetchUnreadCount]);

  
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, [user, fetchNotifications, fetchUnreadCount]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    addNotification,
    refreshNotifications: fetchNotifications
  };
};
