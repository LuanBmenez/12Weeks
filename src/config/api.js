import axios from 'axios';
import config from './config.js';

const API_CONFIG = {
  BASE_URL: config.API_BASE_URL,
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      ME: '/auth/me',
      LOGOUT: '/auth/logout',
      FORGOT_PASSWORD: '/auth/forgot-password',
      VERIFY_RESET_TOKEN: '/auth/verify-reset-token',
      RESET_PASSWORD: '/auth/reset-password'
    },
    FRIENDS: {
      SEARCH: '/friends/search',
      REQUEST: '/friends/request',
      RESPOND: '/friends/respond',
      REQUESTS: '/friends/requests',
      LIST: '/friends/list',
      MY_CODE: '/friends/my-code',
      NOTIFICATIONS: '/friends/notifications',
      MARK_READ: '/friends/notifications',
      NOTIFICATIONS_READ_ALL: '/friends/notifications/read-all',
      NOTIFICATIONS_UNREAD_COUNT: '/friends/notifications/unread-count'
    },
    ROOMS: {
      CREATE: '/rooms/create',
      MY_ROOMS: '/rooms/my-rooms',
      GET_ROOM: '/rooms',
      ADD_GOALS: '/rooms',
      COMPLETE_GOAL: '/rooms',
      INVITE_USER: '/rooms',
      UNREAD_MESSAGES: '/rooms/unread-messages'
    }
  }
};


const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});


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
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
    
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);


export const friendsAPI = {
  searchByCode: (friendCode) => 
    api.get(`${API_CONFIG.ENDPOINTS.FRIENDS.SEARCH}/${friendCode}`),
  
  sendRequest: (friendCode) => 
    api.post(API_CONFIG.ENDPOINTS.FRIENDS.REQUEST, { friendCode }),
  
  respondToRequest: (fromUserId, status) => 
    api.post(API_CONFIG.ENDPOINTS.FRIENDS.RESPOND, { fromUserId, status }),
  
  getRequests: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.REQUESTS),
  
  getFriendsList: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.LIST),
  
  getMyCode: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.MY_CODE),
  
  getNotifications: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.NOTIFICATIONS),
  
  markNotificationAsRead: (notificationId) => 
    api.put(`${API_CONFIG.ENDPOINTS.FRIENDS.MARK_READ}/${notificationId}/read`),
  
  markAllNotificationsAsRead: () => 
    api.put(API_CONFIG.ENDPOINTS.FRIENDS.NOTIFICATIONS_READ_ALL),
  
  getUnreadCount: () => 
    api.get(API_CONFIG.ENDPOINTS.FRIENDS.NOTIFICATIONS_UNREAD_COUNT),
  
  cleanupOldRequests: () =>
    api.post('/friends/cleanup-old-requests'),
};


export const authAPI = {
  register: (userData) => 
    api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData),
  
  login: (credentials) => 
    api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials),
  
  logout: () => 
    api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT),
  
  getProfile: () => 
    api.get(API_CONFIG.ENDPOINTS.AUTH.ME),

  forgotPassword: (email) => 
    api.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),

  verifyResetToken: (token) => 
    api.get(`${API_CONFIG.ENDPOINTS.AUTH.VERIFY_RESET_TOKEN}/${token}`),

  resetPassword: (token, password) => 
    api.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, { token, password })
};


export const roomsAPI = {
  createRoom: (roomData) => 
    api.post(API_CONFIG.ENDPOINTS.ROOMS.CREATE, roomData),
  
  getMyRooms: () => 
    api.get(API_CONFIG.ENDPOINTS.ROOMS.MY_ROOMS),
  
  getRoom: (roomId) => 
    api.get(`${API_CONFIG.ENDPOINTS.ROOMS.GET_ROOM}/${roomId}`),
  
  editRoom: (roomId, updates) => 
    api.put(`${API_CONFIG.ENDPOINTS.ROOMS.GET_ROOM}/${roomId}`, updates),
  
  setWeeklyGoals: (roomId, goals) => 
    api.post(`${API_CONFIG.ENDPOINTS.ROOMS.GET_ROOM}/${roomId}/weekly-goals`, { goals }),
  
  updateDailyProgress: (roomId, goalId, completed) => 
    api.put(`${API_CONFIG.ENDPOINTS.ROOMS.GET_ROOM}/${roomId}/daily-progress/${goalId}`, { completed }),
  
  inviteUser: (roomId, data) => 
    api.post(`${API_CONFIG.ENDPOINTS.ROOMS.GET_ROOM}/${roomId}/invite`, data),
  
  deleteRoom: (roomId) => 
    api.delete(`${API_CONFIG.ENDPOINTS.ROOMS.GET_ROOM}/${roomId}`),
  
  setRoomGoals: (roomId, goals) => 
    api.post(`${API_CONFIG.ENDPOINTS.ROOMS.GET_ROOM}/${roomId}/room-goals`, { goals }),
  
  updateRoomGoalProgress: (roomId, goalId, completed) => 
    api.put(`${API_CONFIG.ENDPOINTS.ROOMS.GET_ROOM}/${roomId}/room-goals/${goalId}`, { completed }),
  
  getUnreadMessages: () => 
    api.get(API_CONFIG.ENDPOINTS.ROOMS.UNREAD_MESSAGES),
};

export default api;
