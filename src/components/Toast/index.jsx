import React, { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { ToastContainer, ToastItem, ToastProgress } from './style';

const ToastContext = createContext();

const Toast = ({ message, type = 'info', duration = 3000, onClose, id }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;
      
      if (newProgress <= 0) {
        handleClose();
        return;
      }
      
      setProgress(newProgress);
      requestAnimationFrame(updateProgress);
    };

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    updateProgress();

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); 
  }, [onClose]);

  const handlePause = () => {
   
  };

  const handleResume = () => {
   
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Sucesso';
      case 'error':
        return 'Erro';
      case 'warning':
        return 'Aviso';
      case 'info':
        return 'Informação';
      default:
        return 'Notificação';
    }
  };

  if (!isVisible) return null;

  return (
    <ToastItem type={type} className={isVisible ? 'visible' : 'hidden'}>
      <div className="toast-content">
        <div className="toast-header">
          <span className="icon">{getIcon()}</span>
          <span className="title">{getTitle()}</span>
        </div>
        <span className="message">{message}</span>
      </div>
      
      <div className="toast-actions">
        <button 
          className="pause-btn" 
          onClick={handlePause}
          title="Pausar"
        >
          ⏸️
        </button>
        <button 
          className="close-btn" 
          onClick={handleClose}
          title="Fechar"
        >
          ×
        </button>
      </div>

      <ToastProgress 
        className="progress-bar" 
        style={{ width: `${progress}%` }}
      />
    </ToastItem>
  );
};

export const ToastProvider = ({ children, maxToasts = 5, position = 'top-right' }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => {
      const updated = [...prev, newToast];
      // Limitar o número máximo de toasts
      if (updated.length > maxToasts) {
        return updated.slice(-maxToasts);
      }
      return updated;
    });
    
    return id;
  }, [maxToasts]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showSuccess = useCallback((message, duration) => 
    addToast(message, 'success', duration), [addToast]);
  
  const showError = useCallback((message, duration) => 
    addToast(message, 'error', duration), [addToast]);
  
  const showWarning = useCallback((message, duration) => 
    addToast(message, 'warning', duration), [addToast]);
  
  const showInfo = useCallback((message, duration) => 
    addToast(message, 'info', duration), [addToast]);

  const showCustom = useCallback((message, type, duration) => 
    addToast(message, type, duration), [addToast]);

  const value = {
    addToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCustom,
    removeToast,
    clearAllToasts,
    toasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer position={position}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
        
        {toasts.length > 1 && (
          <div className="toast-controls">
            <button 
              onClick={clearAllToasts}
              className="clear-all-btn"
              title="Limpar todos"
            >
              🗑️ Limpar Todos
            </button>
          </div>
        )}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }
  return context;
};

export default Toast;
