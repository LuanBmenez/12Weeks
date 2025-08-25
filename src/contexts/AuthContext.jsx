import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../config/api';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      if (token) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [token, navigate]);

  const verifyToken = useCallback(async () => {
    try {
      const response = await authAPI.getProfile();
      
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      
      if (error.response?.status === 401) {
        logout();
      } else {
        setLoading(false);
      }
    }
  }, [logout]);

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        await verifyToken();
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [verifyToken]);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      
      
      const { user, token } = response.data;
      
      setUser(user);
      setToken(token);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      const errorMessage = error.response?.data?.message || 'Erro de conexão';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      
      
      const { user, token } = response.data;
      
      setUser(user);
      setToken(token);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Erro no registro:', error);
      const errorMessage = error.response?.data?.message || 'Erro de conexão';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
