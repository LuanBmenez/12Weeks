import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useNotifications } from './useNotifications';
import api from '../config/api';

export const useFriends = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [friendCode, setFriendCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const fetchMyFriendCode = async () => {
    try {
      setLoading(true);
      const response = await api.get('/friends/my-code');
      setFriendCode(response.data.friendCode);
    } catch (error) {
      setError('Erro ao buscar código de amigo');
      console.error('Erro ao buscar código:', error);
    } finally {
      setLoading(false);
    }
  };


  const searchUserByCode = async (code) => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/friends/search/${code}`);
      setSearchResult(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setError('Usuário não encontrado');
      } else {
        setError('Erro ao buscar usuário');
      }
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };


  const sendFriendRequest = async (code) => {
    try {
      setLoading(true);
      setError('');
      await api.post('/friends/request', { friendCode: code });
      setSearchResult(null);
      

      addNotification({
        _id: Date.now().toString(), 
        type: 'friend_request',
        message: `Solicitação de amizade enviada para ${searchResult?.user?.name}`,
        read: false,
        createdAt: new Date().toISOString()
      });
      
      return { success: true, message: 'Solicitação enviada com sucesso!' };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao enviar solicitação';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };


  const respondToRequest = async (fromUserId, action) => {
    try {
      setLoading(true);
      await api.post('/friends/respond', { fromUserId, action });
      

      await fetchFriendRequests();
      

      if (action === 'accept') {
        await fetchFriends();
      }
      
      return { success: true, message: action === 'accept' ? 'Amizade aceita!' : 'Solicitação rejeitada' };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao processar solicitação';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };


  const fetchFriendRequests = async () => {
    try {
      const response = await api.get('/friends/requests');
      setFriendRequests(response.data.requests);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
    }
  };


  const fetchFriends = async () => {
    try {
      const response = await api.get('/friends/list');
      setFriends(response.data.friends);
    } catch (error) {
      console.error('Erro ao buscar amigos:', error);
    }
  };

  
  const removeFriend = async (friendId) => {
    try {
      await api.delete(`/friends/remove/${friendId}`);
      
      
      setFriends(prev => prev.filter(friend => friend._id !== friendId));
      
      
      addNotification({
        _id: Date.now().toString(),
        type: 'friend_removed',
        message: 'Amigo removido com sucesso',
        read: false,
        createdAt: new Date().toISOString()
      });
      
      return { success: true, message: 'Amigo removido com sucesso!' };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao remover amigo';
      console.error('Erro ao remover amigo:', error);
      return { success: false, message };
    }
  };


  const copyFriendCode = async () => {
    try {
      await navigator.clipboard.writeText(friendCode);
      return { success: true, message: 'Código copiado para a área de transferência!' };
    } catch (error) {
      console.error('Erro ao copiar código:', error);
      return { success: false, message: 'Erro ao copiar código' };
    }
  };


  const clearSearch = () => {
    setSearchResult(null);
    setError('');
  };


  const cleanupOldRequests = async () => {
    try {
      const response = await api.post('/friends/cleanup-old-requests');
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao limpar solicitações antigas';
      return { success: false, message };
    }
  };


  useEffect(() => {
    if (user) {
      fetchMyFriendCode();
      fetchFriendRequests();
      fetchFriends();
    }
  }, [user]);

  return {
    friendCode,
    searchResult,
    friendRequests,
    friends,
    loading,
    error,
    searchUserByCode,
    sendFriendRequest,
    respondToRequest,
    copyFriendCode,
    clearSearch,
    fetchFriendRequests,
    fetchFriends,
    removeFriend,
    cleanupOldRequests
  };
};
