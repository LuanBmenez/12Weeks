import React, { createContext, useContext, useCallback } from 'react';

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents deve ser usado dentro de um EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const listeners = new Map();

  const emit = useCallback((event, data) => {
    const eventListeners = listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }, []);

  const on = useCallback((event, callback) => {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    listeners.get(event).add(callback);

    // Retorna função para remover o listener
    return () => {
      const eventListeners = listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
        if (eventListeners.size === 0) {
          listeners.delete(event);
        }
      }
    };
  }, []);

  const off = useCallback((event, callback) => {
    const eventListeners = listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        listeners.delete(event);
      }
    }
  }, []);

  return (
    <EventContext.Provider value={{ emit, on, off }}>
      {children}
    </EventContext.Provider>
  );
};

