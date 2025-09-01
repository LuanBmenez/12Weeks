import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../config/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

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

 
  const loginWithToken = (user, token) => {
    console.log('loginWithToken chamado para usuário:', user?.username);
    
    setUser(user);
    setToken(token);
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    console.log('Navegando para dashboard...');
    navigate('/dashboard');
    return { success: true };
  };

    const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      
      
      if (response.data.requiresEmailVerification) {
        navigate('/verify-email', {
          state: {
            email: response.data.email,
            tempUserId: response.data.tempUserId
          }
        });
        return { 
          success: true, 
          requiresVerification: true,
          message: response.data.message 
        };
      }
      
    
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

  const updateUser = useCallback((updatedUser) => {
    console.log('AuthContext - updateUser called with:', updatedUser);
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    console.log('AuthContext - user updated in state and localStorage');
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    loginWithToken,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
