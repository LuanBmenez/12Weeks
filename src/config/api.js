import axios from 'axios';

export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      ME: '/auth/me',
      LOGOUT: '/auth/logout'
    },
    FRIENDS: {
      MY_CODE: '/friends/my-code',
      SEARCH: '/friends/search',
      REQUEST: '/friends/request',
      RESPOND: '/friends/respond',
      REQUESTS: '/friends/requests',
      LIST: '/friends/list',
      REMOVE_FRIEND: '/friends/remove',
      NOTIFICATIONS: '/friends/notifications',
      NOTIFICATION_READ: '/friends/notifications',
      NOTIFICATIONS_READ_ALL: '/friends/notifications/read-all',
      NOTIFICATIONS_UNREAD_COUNT: '/friends/notifications/unread-count'
    }
  }
};

// Criar instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para adicionar token de autenticação automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log('Resposta da API:', response);
    
    return response;
  },
  (error) => {
    console.error('Erro na API:', error);

    if (error.response?.status === 401) {
      localStorage.removeItem('token');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    

    console.error('Erro na API:', error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);


export const authAPI = {
  register: (userData) => 
    api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData),
  
  login: (credentials) => 
    api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials),
  
  getProfile: () => 
    api.get(API_CONFIG.ENDPOINTS.AUTH.ME),
  
  logout: () => 
    api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT),
};


// API para amizades
export const friendsAPI = {
  getMyCode: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.MY_CODE),
  
  searchUser: (friendCode) => 
    api.get(`${API_CONFIG.ENDPOINTS.FRIENDS.SEARCH}/${friendCode}`),
  
  sendRequest: (friendCode) => 
    api.post(API_CONFIG.ENDPOINTS.FRIENDS.REQUEST, { friendCode }),
  
  respondToRequest: (fromUserId, action) => 
    api.post(API_CONFIG.ENDPOINTS.FRIENDS.RESPOND, { fromUserId, action }),
  
  getRequests: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.REQUESTS),
  
  getFriends: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.LIST),
  
  // Remover amigo
  removeFriend: (friendId) => 
    api.delete(`${API_CONFIG.ENDPOINTS.FRIENDS.REMOVE_FRIEND}/${friendId}`),
  
  // Novas funções para notificações
  getNotifications: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.NOTIFICATIONS),
  
  markNotificationAsRead: (notificationId) => 
    api.put(`${API_CONFIG.ENDPOINTS.FRIENDS.NOTIFICATION_READ}/${notificationId}/read`),
  
  markAllNotificationsAsRead: () => 
    api.put(API_CONFIG.ENDPOINTS.FRIENDS.NOTIFICATIONS_READ_ALL),
  
  getUnreadCount: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.NOTIFICATIONS_UNREAD_COUNT),
};


export default api;
