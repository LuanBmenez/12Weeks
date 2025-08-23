import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../config/api';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Declarar logout primeiro
  const logout = useCallback(async () => {
    try {
      // Chamar API de logout se houver token
      if (token) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      // Limpar estado local
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirecionar para login
      navigate('/login');
    }
  }, [token, navigate]);

  // Depois declarar verifyToken que usa logout
  const verifyToken = useCallback(async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.ok) {
        setUser(response.data.user);
      } else {
        // Token inválido, limpar dados
        logout();
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Agora o useEffect pode usar verifyToken
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        
        // Verificar se o token ainda é válido
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
      
      if (response.ok) {
        const { user, token } = response.data;
        
        setUser(user);
        setToken(token);
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        navigate('/dashboard');
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.data.message || 'Erro no login' 
        };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        error: 'Erro de conexão' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      
      if (response.ok) {
        const { user, token } = response.data;
        
        setUser(user);
        setToken(token);
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        navigate('/dashboard');
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.data.message || 'Erro no registro' 
        };
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      return { 
        success: false, 
        error: 'Erro de conexão' 
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
