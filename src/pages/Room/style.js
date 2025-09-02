import styled from 'styled-components';


const colors = {

  primary: '#6366f1',     
  primaryDark: '#4f46e5', 
  primaryLight: '#818cf8', 
  

  secondary: '#10b981',   
  secondaryDark: '#059669',
  secondaryLight: '#34d399', 
  

  success: '#22c55e',    
  warning: '#f59e0b',    
  error: '#ef4444',       
  info: '#3b82f6',       
  

  accent: {
    purple: '#8b5cf6',    
    pink: '#ec4899',     
    orange: '#f97316',    
    cyan: '#06b6d4',     
  },

  gray: {
    50: '#f8fafc',
    100: '#f1f5f9', 
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  },
  

  light: {
    background: '#fafbfc',
    surface: '#ffffff',
    surfaceHover: '#f8fafc',
    text: '#0f172a',
    textSecondary: '#475569'
  },
  

  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    surfaceHover: '#334155',
    text: '#f8fafc',
    textSecondary: '#cbd5e1'
  }
};


const typography = {
  fontFamily: {
    sans: '"Inter", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
  },
  fontSize: {
    xs: '0.75rem',    
    sm: '0.875rem',   
    base: '1rem',     
    lg: '1.125rem',   
    xl: '1.25rem',    
    '2xl': '1.5rem',  
    '3xl': '1.875rem', 
    '4xl': '2.25rem', 
    '5xl': '3rem',   
    '6xl': '3.75rem'  
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },
  lineHeight: {
    tight: '1.1',
    snug: '1.2',
    normal: '1.5',
    relaxed: '1.6',
    loose: '2'
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
};

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  font-family: ${typography.fontFamily.sans};
  color: ${colors.gray[800]};
  line-height: ${typography.lineHeight.normal};
  
  
  border: 1px solid transparent;
`;

export const Main = styled.main`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem 2rem 10rem;
  position: relative;
`;

export const BackButton = styled.button`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #374151;
  border: 2px solid #e2e8f0;
  padding: 0.875rem 1.75rem;
  border-radius: 1rem;
  cursor: pointer;
  font-family: ${typography.fontFamily.sans};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.4), 
      transparent
    );
    transition: left 0.6s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    color: #1f2937;
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const RoomInfo = styled.div`
  flex: 1;
  width: 100%;
  margin: 0;
  
  .room-title-section {
    margin-bottom: 1.5rem;
    
    .room-title-enhanced {
      .title-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        
        .main-title {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          
          .room-icon {
            font-size: 2.5rem;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
            transition: all 0.3s ease;
            
            &:hover {
              transform: scale(1.1) rotate(5deg);
              filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
            }
          }
          
          .title-text {
            color: #111827;
            font-size: ${typography.fontSize['4xl']};
            font-weight: ${typography.fontWeight.extrabold};
            line-height: ${typography.lineHeight.tight};
            font-family: ${typography.fontFamily.sans};
            letter-spacing: ${typography.letterSpacing.tight};
          }
        }
        
        .edit-title-btn {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.75rem;
          cursor: pointer;
          font-size: 1.125rem;
          transition: all 0.3s ease;
          opacity: 0.7;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          
          &:hover {
            opacity: 1;
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          &:active {
            transform: scale(0.95);
          }
        }
      }
      
      .title-badges {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        
        .room-status-badge {
          padding: 0.5rem 1rem;
          border-radius: 1.5rem;
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.semibold};
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          
          &.active {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            color: #059669;
            border: 2px solid #22c55e;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
            }
          }
          
          &.medium {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            color: #d97706;
            border: 2px solid #f59e0b;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
            }
          }
          
          &.inactive {
            background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
            color: #dc2626;
            border: 2px solid #ef4444;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
            }
          }
        }
        
        .participants-count {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #1d4ed8;
          border: 2px solid #3b82f6;
          border-radius: 1.5rem;
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.semibold};
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
        }
      }
      
      .room-meta-info {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          transition: all 0.3s ease;
          
          &:hover {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .meta-icon {
            font-size: 1.125rem;
            opacity: 0.8;
          }
          
          .meta-text {
            color: ${colors.gray[600]};
            font-size: ${typography.fontSize.sm};
            font-weight: ${typography.fontWeight.medium};
            font-family: ${typography.fontFamily.sans};
          }
        }
      }
    }
  }
  
  .room-description-section {
    margin-bottom: 2rem;
    
    .room-description-enhanced {
      .description-content {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        
        .description-text {
          flex: 1;
          margin: 0;
          color: ${colors.gray[700]};
          font-size: ${typography.fontSize.lg};
          font-weight: ${typography.fontWeight.medium};
          line-height: ${typography.lineHeight.relaxed};
          font-family: ${typography.fontFamily.sans};
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          transition: all 0.3s ease;
          
          &:hover {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border-color: #cbd5e1;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        }
        
        .edit-description-btn {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.75rem;
          cursor: pointer;
          font-size: 1.125rem;
          transition: all 0.3s ease;
          opacity: 0.7;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          
          &:hover {
            opacity: 1;
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          &:active {
            transform: scale(0.95);
          }
        }
      }
      
      .no-description-state {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem 2rem;
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border: 2px dashed #f59e0b;
        border-radius: 1rem;
        transition: all 0.3s ease;
        
        &:hover {
          background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
          border-color: #d97706;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
        }
        
        .no-desc-icon {
          font-size: 1.5rem;
          opacity: 0.8;
        }
        
        .no-desc-text {
          flex: 1;
          color: #92400e;
          font-size: ${typography.fontSize.base};
          font-weight: ${typography.fontWeight.medium};
          font-family: ${typography.fontFamily.sans};
        }
        
        .add-description-btn {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          border: none;
          border-radius: 0.75rem;
          padding: 0.75rem 1.5rem;
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.semibold};
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
          }
          
          &:active {
            transform: translateY(0);
          }
        }
      }
    }
  }
  
  .room-stats-header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
    
    .stat-card {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      border: 2px solid #e2e8f0;
      border-radius: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
          transparent, 
          rgba(255, 255, 255, 0.4), 
          transparent
        );
        transition: left 0.6s ease;
      }
      
      &:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        border-color: #cbd5e1;
        
        &::before {
          left: 100%;
        }
      }
      
      &:active {
        transform: translateY(-2px) scale(1.01);
      }
      
      .stat-icon {
        font-size: 1.5rem;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        transition: all 0.3s ease;
      }
      
      &:hover .stat-icon {
        transform: scale(1.1) rotate(5deg);
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
      }
      
      .stat-content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        
        .stat-value {
          font-size: ${typography.fontSize['2xl']};
          font-weight: ${typography.fontWeight.extrabold};
          color: #111827;
          font-family: ${typography.fontFamily.sans};
          line-height: ${typography.lineHeight.tight};
          letter-spacing: ${typography.letterSpacing.tight};
        }
        
        .stat-label {
          font-size: ${typography.fontSize.xs};
          font-weight: ${typography.fontWeight.medium};
          color: ${colors.gray[600]};
          font-family: ${typography.fontFamily.sans};
          text-transform: uppercase;
          letter-spacing: ${typography.letterSpacing.wide};
        }
      }
    }
  }

  .edit-input-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: white;
    border: 2px solid #3b82f6;
    border-radius: 1rem;
    padding: 1rem 1.5rem;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    transition: all 0.3s ease;
    
    &:focus-within {
      border-color: #1d4ed8;
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
    }
  }

  .edit-input {
    border: none;
    outline: none;
    background: transparent;
    font-family: ${typography.fontFamily.sans};
    flex: 1;
    min-width: 0;
    
    &.title-input {
      font-size: ${typography.fontSize['3xl']};
      font-weight: ${typography.fontWeight.bold};
      color: #1e293b;
      line-height: ${typography.lineHeight.tight};
      
      &::placeholder {
        color: #9ca3af;
        font-weight: ${typography.fontWeight.normal};
      }
    }
    
    &.description-input {
      font-size: ${typography.fontSize.lg};
      font-weight: ${typography.fontWeight.medium};
      color: #374151;
      line-height: ${typography.lineHeight.relaxed};
      
      &::placeholder {
        color: #9ca3af;
        font-weight: ${typography.fontWeight.normal};
      }
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .edit-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .save-btn, .cancel-btn {
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: ${typography.fontWeight.semibold};
    font-family: ${typography.fontFamily.sans};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
  }

  .save-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  .cancel-btn {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin-bottom: 2rem;
  padding: 1rem 0;
  position: relative;
  
  ${BackButton} {
    position: absolute;
    left: -8rem;
    top: 0.5rem;
    flex-shrink: 0;
    z-index: 10;
  }
  
  ${RoomInfo} {
    width: 100%;
    margin-left: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  margin: 0;
  
  .goals-section-divider {
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      #e2e8f0 20%, 
      #cbd5e1 50%, 
      #e2e8f0 80%, 
      transparent 100%
    );
    margin: 1rem 0;
    border-radius: 1px;
  }
`;

export const FloatingChatButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${colors.primary};
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1000;

  &:hover {
    background: ${colors.primaryDark};
    transform: scale(1.1);
  }

  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    animation: pulse 2s infinite;
    border: 2px solid white;
    
    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
      }
      50% {
        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0);
      }
    }
  }
`;

export const GoalsSection = styled.div`
  background: #f8fafc;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.modern-goals {
    padding: 2rem;
    background: #ffffff;
    border: 2px solid #e2e8f0;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.12);
    border-radius: 1.5rem;
    
    &:hover {
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.16);
      transform: translateY(-4px);
      border-color: #cbd5e1;
    }
  }

  .goals-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #f1f5f9;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 2px;
      background: linear-gradient(90deg, 
        #10b981 0%, 
        #059669 50%, 
        #10b981 100%
      );
      border-radius: 1px;
      transition: width 0.8s ease;
    }
    
    &.room-progress::after {
      background: linear-gradient(90deg, 
        #7c3aed 0%, 
        #5b21b6 50%, 
        #7c3aed 100%
      );
    }
    
    &.individual-progress::after {
      background: linear-gradient(90deg, 
        #2563eb 0%, 
        #1d4ed8 50%, 
        #2563eb 100%
      );
    }
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .goals-icon {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        
        &.room {
          background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
          color: #7c3aed;
          border: 3px solid rgba(124, 58, 237, 0.3);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.2);
          
          &:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 30px rgba(124, 58, 237, 0.3);
            border-color: rgba(124, 58, 237, 0.5);
          }
        }
        
        &.individual {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #2563eb;
          border: 3px solid rgba(37, 99, 235, 0.3);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2);
          
          &:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 30px rgba(37, 99, 235, 0.3);
            border-color: rgba(37, 99, 235, 0.5);
          }
        }
      }
      
      .goals-info {
        h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          font-family: ${typography.fontFamily.sans};
          line-height: ${typography.lineHeight.tight};
          letter-spacing: ${typography.letterSpacing.tight};
        }
        
        .goals-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
          font-family: ${typography.fontFamily.sans};
          line-height: ${typography.lineHeight.normal};
          letter-spacing: ${typography.letterSpacing.normal};
        }
      }
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .progress-badge {
        padding: 0.75rem 1.25rem;
        border-radius: 1.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;
        
        &.room {
          background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
          color: #7c3aed;
          border: 3px solid rgba(124, 58, 237, 0.4);
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.2);
          
          &:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
            border-color: rgba(124, 58, 237, 0.6);
          }
        }
        
        &.individual {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #2563eb;
          border: 3px solid rgba(37, 99, 235, 0.4);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.2);
          
          &:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
            border-color: rgba(37, 99, 235, 0.6);
          }
        }
      }
      
      .expand-toggle.modern {
        background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
        border: 2px solid #e5e7eb;
        border-radius: 0.75rem;
        padding: 0.75rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        
        &:hover {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }
        
        &:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }
        
        .arrow {
          color: #6b7280;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }
        
        &:hover .arrow {
          color: #374151;
          transform: scale(1.1);
        }
      }
    }
  }

  .modern-goals-container {
    .goals-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      
      h3 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
        font-family: ${typography.fontFamily.sans};
        line-height: ${typography.lineHeight.snug};
        letter-spacing: ${typography.letterSpacing.tight};
      }
      
      .edit-goals-btn.modern {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        color: #64748b;
        border: 2px solid #e2e8f0;
        border-radius: 1rem;
        padding: 0.875rem 1.75rem;
        font-size: ${typography.fontSize.sm};
        font-weight: ${typography.fontWeight.semibold};
        font-family: ${typography.fontFamily.sans};
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
        position: relative;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            transparent
          );
          transition: left 0.5s ease;
        }
        
        &:hover {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          border-color: #cbd5e1;
          color: #475569;
          
          &::before {
            left: 100%;
          }
        }
        
        &:active {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
        }
        
        .btn-icon {
          font-size: 1.125rem;
          transition: all 0.3s ease;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }
        
        &:hover .btn-icon {
          transform: scale(1.15) rotate(5deg);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
      }
    }
    
    .goals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      
      .goal-card {
        background: #ffffff;
        border: 3px solid #e2e8f0;
        border-radius: 1.25rem;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        user-select: none;
        position: relative;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
          border-color: #cbd5e1;
        }
        
        &:active {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(37, 99, 235, 0.02);
          border-radius: 0.75rem;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        &:hover::before {
          opacity: 1;
        }
        
        &.completed {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-color: rgba(34, 197, 94, 0.3);
          animation: goalCompleted 0.8s ease-out;
          position: relative;
          
          &::after {
            content: '🎉';
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 1.5rem;
            animation: confetti-celebration 1.5s ease-out;
            z-index: 10;
          }
          
          &:hover {
            background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
            border-color: rgba(34, 197, 94, 0.4);
            box-shadow: 0 16px 32px rgba(34, 197, 94, 0.15);
            transform: translateY(-5px) scale(1.02);
          }
          
          &::before {
            background: rgba(34, 197, 94, 0.08);
          }
          
          &.room {
            background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
            border-color: rgba(124, 58, 237, 0.3);
            
            &::after {
              content: '✨';
            }
            
            &:hover {
              background: linear-gradient(135deg, #e9d5ff 0%, #ddd6fe 100%);
              border-color: rgba(124, 58, 237, 0.4);
              box-shadow: 0 16px 32px rgba(124, 58, 237, 0.15);
            }
            
            &::before {
              background: rgba(124, 58, 237, 0.08);
            }
          }
        }
        
        &.pending {
          background: #ffffff;
          border-color: #f1f5f9;
          
          &:hover {
            background: #f8fafc;
            border-color: #e2e8f0;
          }
          
          &.room {
            background: linear-gradient(135deg, #fefbff 0%, #faf5ff 100%);
            border-color: rgba(124, 58, 237, 0.1);
            
            &:hover {
              background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
              border-color: rgba(124, 58, 237, 0.2);
            }
          }
        }
        
        .goal-status {
          position: relative;
          
          .goal-checkbox {
            opacity: 0;
            position: absolute;
            cursor: pointer;
            width: 1.5rem;
            height: 1.5rem;
          }
          
          .status-indicator {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.125rem;
            font-weight: 700;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            
            &::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: linear-gradient(45deg, 
                transparent, 
                rgba(255, 255, 255, 0.3), 
                transparent
              );
              transform: rotate(45deg);
              transition: all 0.6s ease;
              opacity: 0;
            }
            
            &.completed {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              border: 3px solid rgba(16, 185, 129, 0.3);
              animation: pulse-success 2s ease-in-out infinite;
              
              &:hover {
                transform: scale(1.15);
                box-shadow: 0 8px 16px rgba(16, 185, 129, 0.4);
                border-color: rgba(16, 185, 129, 0.5);
                
                &::before {
                  opacity: 1;
                  animation: shine 0.8s ease-in-out;
                }
              }
            }
            
            &.pending {
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              color: #94a3b8;
              border: 3px solid #e2e8f0;
              
              &:hover {
                transform: scale(1.1);
                background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                border-color: #cbd5e1;
                color: #64748b;
              }
            }
          }
        }
        
        .goal-content {
          flex: 1;
          position: relative;
          
          .goal-text {
            font-size: ${typography.fontSize.base};
            line-height: ${typography.lineHeight.relaxed};
            color: #374151;
            font-weight: ${typography.fontWeight.medium};
            font-family: ${typography.fontFamily.sans};
            transition: all 0.3s ease;
            
            &.completed {
              text-decoration: line-through;
              color: #6b7280;
              opacity: 0.8;
            }
          }
          
          
          &::after {
            content: '👆';
            position: absolute;
            top: 0;
            right: 0;
            font-size: 0.75rem;
            opacity: 0;
            transition: opacity 0.2s ease;
          }
        }
        
        &:hover .goal-content::after {
          opacity: 0.3;
        }
      }
    }
  }
  
  @keyframes goalCompleted {
    0% {
      transform: scale(1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    50% {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(34, 197, 94, 0.2);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
  }
  
  @keyframes goalPending {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes pulse-success {
    0%, 100% {
      box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
    }
    50% {
      box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
    }
  }
  
  @keyframes shine {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }
  
  @keyframes confetti-celebration {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: scale(1.2) rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: scale(1.5) rotate(360deg);
      opacity: 0;
    }
  }
`;

export const GoalsHeader = styled.div`
  margin-bottom: 2rem;
  
  .goals-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  h2 {
    margin: 0;
    color: #1e293b;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .expand-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #f3f4f6;
    }

    .arrow {
      font-size: 1rem;
      color: #6b7280;
      transition: transform 0.2s ease;
      transform: rotate(-90deg);

      &.expanded {
        transform: rotate(0deg);
      }
    }
  }
  
  .week-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f1f5f9;
    padding: 1rem;
    border-radius: 0.5rem;
    
    .week {
      font-weight: 600;
      color: #0f172a;
      font-size: 1.1rem;
    }
    
    .date {
      color: #64748b;
      font-size: 0.9rem;
    }
  }
`;

export const GoalsForm = styled.div`
  h3 {
    margin: 0 0 1rem 0;
    color: #1e293b;
  }
  
  .info {
    background: #eff6ff;
    border: 1px solid #3b82f6;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
    color: #1e40af;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
  
  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 1rem;
    transition: background-color 0.2s;
    
    &:hover {
      background: #2563eb;
    }
  }
`;

export const GoalsList = styled.div`
  .goals-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    h3 {
      margin: 0;
      color: #1e293b;
    }
    
    .edit-goals-btn {
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &:hover {
        background: #2563eb;
        transform: translateY(-1px);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
  
  h3 {
    margin: 0 0 1.5rem 0;
    color: #1e293b;
  }
`;

export const GoalItem = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background: #f1f5f9;
    }
    
    input[type="checkbox"] {
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }
    
    span {
      flex: 1;
      font-size: 1rem;
      color: #1e293b;
      
      &.completed {
        text-decoration: line-through;
        color: #64748b;
      }
    }
  }
`;

export const ProgressSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin: 2rem 0;
`;

export const ProgressCard = styled.div`
  background: linear-gradient(135deg, 
    ${colors.light.surface} 0%, 
    ${colors.gray[50]} 100%
  );
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05), 
    0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  text-align: left;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  
  animation: cardEntrance 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${colors.primary} 0%, 
      ${colors.accent.purple} 25%,
      ${colors.secondary} 50%, 
      ${colors.accent.cyan} 75%,
      ${colors.primary} 100%
    );
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 25px rgba(0, 0, 0, 0.1),
      0 10px 10px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    
    &::before {
      opacity: 1;
      height: 6px;
    }
  }
  
  &.progress-excellent {
    background: linear-gradient(135deg, 
      #f0fdf4 0%, 
      #dcfce7 50%, 
      #bbf7d0 100%
    );
    border-color: rgba(34, 197, 94, 0.2);
    
    &::before {
      background: linear-gradient(90deg, 
        ${colors.success} 0%, 
        ${colors.secondary} 50%, 
        ${colors.success} 100%
      );
    }
  }
  
  &.progress-good {
    background: linear-gradient(135deg, 
      #fef3c7 0%, 
      #fde68a 50%, 
      #fcd34d 100%
    );
    border-color: rgba(245, 158, 11, 0.2);
    
    &::before {
      background: linear-gradient(90deg, 
        ${colors.warning} 0%, 
        ${colors.accent.orange} 50%, 
        ${colors.warning} 100%
      );
    }
  }
  
  &.progress-average {
    background: linear-gradient(135deg, 
      #dbeafe 0%, 
      #bfdbfe 50%, 
      #93c5fd 100%
    );
    border-color: rgba(59, 130, 246, 0.2);
    
    &::before {
      background: linear-gradient(90deg, 
        ${colors.info} 0%, 
        ${colors.primary} 50%, 
        ${colors.info} 100%
      );
    }
  }
  
  &.progress-poor {
    background: linear-gradient(135deg, 
      #fef2f2 0%, 
      #fecaca 50%, 
      #fca5a5 100%
    );
    border-color: rgba(239, 68, 68, 0.2);
    
    &::before {
      background: linear-gradient(90deg, 
        ${colors.error} 0%, 
        ${colors.accent.pink} 50%, 
        ${colors.error} 100%
      );
    }
  }
  
  &.dark-theme {
    background: linear-gradient(135deg, 
      ${colors.dark.surface} 0%, 
      ${colors.gray[800]} 100%
    );
    border-color: rgba(255, 255, 255, 0.1);
    color: ${colors.dark.text};
    
    &:hover {
      background: linear-gradient(135deg, 
        ${colors.dark.surfaceHover} 0%, 
        ${colors.gray[700]} 100%
      );
    }
  }
  
  @keyframes cardEntrance {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  h3 {
    margin: 0 0 1.5rem 0;
    color: #1e293b;
    font-size: 1.25rem;
  }
  
  .progress-circle {
    margin-bottom: 1.5rem;
    
    .percentage {
      font-size: 3rem;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 0.5rem;
    }
    
    .label {
      color: #64748b;
      font-size: 1rem;
      font-weight: 500;
    }
  }
  
  .stats {
    span {
      background: #f1f5f9;
      color: #475569;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }

 
  &.modern-card {
    padding: 1.5rem;
    border: 2px solid #e2e8f0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.2), 
        transparent
      );
      transition: left 0.6s ease;
    }
    
    &:hover {
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
      transform: translateY(-4px) scale(1.02);
      border-color: #cbd5e1;
      
      &::before {
        left: 100%;
      }
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 0.5rem 0;
    
    .card-icon {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &.today {
        background: linear-gradient(135deg, 
          ${colors.primary} 0%, 
          ${colors.accent.purple} 25%, 
          ${colors.info} 50%, 
          ${colors.accent.cyan} 75%, 
          ${colors.primaryDark} 100%
        );
        color: ${colors.light.surface};
        box-shadow: 
          0 8px 25px rgba(99, 102, 241, 0.4),
          0 4px 12px rgba(79, 70, 229, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
        
        &:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 
            0 12px 35px rgba(99, 102, 241, 0.5),
            0 8px 20px rgba(79, 70, 229, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
      }
      
      &.overall {
        background: linear-gradient(135deg, 
          ${colors.warning} 0%, 
          ${colors.accent.orange} 25%, 
          ${colors.secondary} 50%, 
          ${colors.accent.pink} 75%, 
          ${colors.error} 100%
        );
        color: ${colors.light.surface};
        box-shadow: 
          0 8px 25px rgba(245, 158, 11, 0.4),
          0 4px 12px rgba(249, 115, 22, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
        
        &:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 
            0 12px 35px rgba(245, 158, 11, 0.5),
            0 8px 20px rgba(249, 115, 22, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
      }
      
      &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, 
          transparent, 
          rgba(255, 255, 255, 0.1), 
          transparent
        );
        transform: rotate(45deg);
        transition: all 0.6s ease;
        opacity: 0;
      }
      
      &:hover::before {
        opacity: 1;
        animation: shine 0.8s ease-in-out;
      }
      
      @keyframes shine {
        0% {
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
        }
        100% {
          transform: translateX(100%) translateY(100%) rotate(45deg);
        }
      }
    }
    
    .modern-icon {
      .icon-emoji {
        position: relative;
        z-index: 2;
        font-size: 1.75rem;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        transition: all 0.3s ease;
      }
      
      .icon-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120%;
        height: 120%;
        background: radial-gradient(circle, 
          rgba(255, 255, 255, 0.3) 0%, 
          transparent 70%
        );
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1;
      }
      
      &:hover {
        .icon-emoji {
          transform: scale(1.1) rotate(5deg);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }
        
        .icon-glow {
          opacity: 1;
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
      }
      
      @keyframes pulse-glow {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.3;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.2);
          opacity: 0.6;
        }
      }
      
      &.perfect-progress {
        animation: perfect-glow 2s ease-in-out infinite;
        
        .icon-emoji {
          animation: bounce 1s ease-in-out infinite;
        }
        
        .icon-glow {
          opacity: 1;
          animation: perfect-pulse 1.5s ease-in-out infinite;
        }
      }
      
      @keyframes perfect-glow {
        0%, 100% {
          box-shadow: 
            0 8px 25px rgba(59, 130, 246, 0.4),
            0 4px 12px rgba(30, 64, 175, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        50% {
          box-shadow: 
            0 12px 35px rgba(59, 130, 246, 0.6),
            0 8px 20px rgba(30, 64, 175, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: scale(1) rotate(0deg);
        }
        50% {
          transform: scale(1.1) rotate(5deg);
        }
      }
      
      @keyframes perfect-pulse {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.4;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.3);
          opacity: 0.8;
        }
      }
    }
    
    .card-title {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      h3 {
        margin: 0;
        font-size: ${typography.fontSize['2xl']};
        font-weight: ${typography.fontWeight.bold};
        color: #111827;
        font-family: ${typography.fontFamily.sans};
        line-height: ${typography.lineHeight.tight};
        letter-spacing: ${typography.letterSpacing.tight};
      }
      
      .card-subtitle {
        font-size: ${typography.fontSize.base};
        color: #6b7280;
        font-weight: ${typography.fontWeight.medium};
        font-family: ${typography.fontFamily.sans};
        line-height: ${typography.lineHeight.normal};
        letter-spacing: ${typography.letterSpacing.normal};
      }
    }
    
    .card-percentage {
      font-size: ${typography.fontSize['4xl']};
      font-weight: ${typography.fontWeight.extrabold};
      color: ${colors.gray[900]};
      font-family: ${typography.fontFamily.sans};
      line-height: ${typography.lineHeight.tight};
      letter-spacing: ${typography.letterSpacing.tighter};
      text-align: right;
      min-width: 4rem;
    }
  }

  .progress-bar-container {
    margin-bottom: 1.5rem;
    
    .progress-bar {
      width: 100%;
      height: 0.875rem;
      background: linear-gradient(135deg, 
        #f8fafc 0%, 
        #f1f5f9 25%, 
        #e2e8f0 50%, 
        #cbd5e1 75%, 
        #94a3b8 100%
      );
      border-radius: 1rem;
      overflow: hidden;
      position: relative;
      box-shadow: 
        inset 0 2px 4px rgba(0, 0, 0, 0.1),
        inset 0 1px 2px rgba(0, 0, 0, 0.05),
        0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
          radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
          radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
          radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
        background-size: 15px 15px, 20px 20px, 12px 12px, 18px 18px;
        animation: float-particles 8s ease-in-out infinite;
        opacity: 0.6;
      }
      
      .progress-fill {
        height: 100%;
        border-radius: 1rem;
        transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        
        &.today {
          background: linear-gradient(135deg, 
            ${colors.primary} 0%, 
            ${colors.accent.purple} 15%, 
            ${colors.info} 30%, 
            ${colors.accent.cyan} 45%, 
            ${colors.primaryDark} 60%, 
            ${colors.accent.purple} 75%, 
            ${colors.primary} 90%, 
            ${colors.primaryDark} 100%
          );
          box-shadow: 
            0 2px 8px rgba(99, 102, 241, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.6), 
              transparent
            );
            animation: shimmer-progress 3s ease-in-out infinite;
          }
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 25% 40%, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 75% 60%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.35) 1px, transparent 1px);
            background-size: 12px 12px, 16px 16px, 14px 14px;
            animation: float-progress 6s ease-in-out infinite;
            opacity: 0.8;
          }
        }
        
        &.overall {
          background: linear-gradient(135deg, 
            ${colors.warning} 0%, 
            ${colors.accent.orange} 15%, 
            ${colors.secondary} 30%, 
            ${colors.accent.pink} 45%, 
            ${colors.error} 60%, 
            ${colors.accent.orange} 75%, 
            ${colors.warning} 90%, 
            ${colors.error} 100%
          );
          box-shadow: 
            0 2px 8px rgba(245, 158, 11, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.6), 
              transparent
            );
            animation: shimmer-progress 3s ease-in-out infinite;
          }
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.35) 1px, transparent 1px);
            background-size: 10px 10px, 14px 14px, 12px 12px;
            animation: float-progress 7s ease-in-out infinite;
            opacity: 0.8;
          }
        }
      }
    }
  }
  
  @keyframes shimmer-progress {
    0% {
      left: -100%;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      left: 100%;
      opacity: 0;
    }
  }
  
  @keyframes float-particles {
    0%, 100% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(-1px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(1px);
    }
  }
  
  @keyframes float-progress {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
    }
    33% {
      transform: translateY(-1px) translateX(1px);
    }
    66% {
      transform: translateY(1px) translateX(-1px);
    }
  }

  .progress-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: linear-gradient(135deg, ${colors.gray[50]} 0%, ${colors.gray[100]} 100%);
      border-radius: 0.75rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid ${colors.gray[200]};
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:hover {
        background: linear-gradient(135deg, ${colors.gray[100]} 0%, ${colors.gray[200]} 100%);
        transform: translateX(4px) translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: ${colors.gray[300]};
        
        &::before {
          opacity: 1;
        }
      }
      
      .detail-icon {
        font-size: 1.25rem;
        opacity: 0.9;
        color: ${colors.gray[700]};
        transition: all 0.2s ease;
      }
      
      &:hover .detail-icon {
        transform: scale(1.1);
        opacity: 1;
      }
      
      .detail-text {
        flex: 1;
        font-size: ${typography.fontSize.base};
        color: #374151;
        font-weight: ${typography.fontWeight.medium};
        font-family: ${typography.fontFamily.sans};
        line-height: ${typography.lineHeight.normal};
        letter-spacing: ${typography.letterSpacing.normal};
      }
      
      .detail-count {
        font-size: ${typography.fontSize.sm};
        font-weight: ${typography.fontWeight.semibold};
        color: #111827;
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        padding: 0.5rem 1rem;
        border-radius: 1.5rem;
        border: 2px solid #e2e8f0;
        font-family: ${typography.fontFamily.sans};
        line-height: ${typography.lineHeight.tight};
        letter-spacing: ${typography.letterSpacing.tight};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        &:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }
      }
    }
  }

  .progress-breakdown {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
    
    .progress-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
      
      &.individual {
        background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
        border: 1px solid #81d4fa;
        
        .progress-icon {
          color: #0277bd;
        }
        
        .progress-label {
          color: #01579b;
          font-weight: 600;
        }
        
        .progress-count {
          background: #0288d1;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-weight: 600;
          font-size: 0.875rem;
        }
      }
      
      &.room {
        background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
        border: 1px solid #ce93d8;
        
        .progress-icon {
          color: #7b1fa2;
        }
        
        .progress-label {
          color: #4a148c;
          font-weight: 600;
        }
        
        .progress-count {
          background: #8e24aa;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-weight: 600;
          font-size: 0.875rem;
        }
      }
      
      .progress-icon {
        font-size: 1.25rem;
        margin-right: 0.5rem;
      }
      
      .progress-label {
        flex: 1;
        font-size: 0.9rem;
      }
    }
  }

  .combined-info {
    text-align: center;
    padding: 0.5rem;
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
    border: 1px solid #ffcc02;
    border-radius: 0.5rem;
    
    span {
      color: #e65100;
      font-weight: 600;
      font-size: 0.85rem;
    }
  }

  .weekly-info {
    text-align: center;
    padding: 0.5rem;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border: 1px solid #38bdf8;
    border-radius: 0.5rem;
    margin-top: 0.75rem;
    
    span {
      color: #0369a1;
      font-weight: 500;
      font-size: 0.85rem;
    }
  }
`;

export const FeedbackSection = styled.div`
  margin-top: 1rem;
`;

export const FeedbackCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-left: 4px solid;
  
  &.difficult {
    border-left-color: #ef4444;
    background: #fef2f2;
  }
  
  &.medium {
    border-left-color: #f59e0b;
    background: #fffbeb;
  }
  
  &.easy {
    border-left-color: #10b981;
    background: #f0fdf4;
  }
  
  h3 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.5rem;
  }
  
  p {
    margin: 0 0 1.5rem 0;
    color: #64748b;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    margin-right: 1rem;
    transition: background-color 0.2s;
    
    &:hover {
      background: #2563eb;
    }
    
    &.close-feedback {
      background: #64748b;
      
      &:hover {
        background: #475569;
      }
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
  
  h3 {
    margin: 0 0 1rem 0;
    color: #1e293b;
  }
  
  p {
    margin: 0 0 1.5rem 0;
    font-size: 1.1rem;
  }
`;


export const ParticipantsSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &.modern-participants {
    padding: 1.5rem;
    border: 1px solid #f1f5f9;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }
  }

  .participants-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f1f5f9;
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .participants-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        color: #d97706;
      }
      
      .participants-info {
        h2 {
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .participants-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }
      }
    }
    
    .header-right {
      .invite-button.modern {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border: none;
        border-radius: 0.75rem;
        padding: 0.75rem 1.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
        
        &:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
        }
        
        .btn-icon {
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }
  }

  .modern-participants-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    
    .participant-card-modern {
      background: #fafafa;
      border: 1px solid #e5e7eb;
      border-radius: 1rem;
      padding: 1.25rem;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &.progress-excellent {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%);
        border: 2px solid #22c55e;
        box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      &.progress-good {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%);
        border: 2px solid #f59e0b;
        box-shadow: 0 8px 25px rgba(245, 158, 11, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      &.progress-average {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%);
        border: 2px solid #3b82f6;
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      &.progress-poor {
        background: linear-gradient(135deg, #fef2f2 0%, #fecaca 50%, #fca5a5 100%);
        border: 2px solid #ef4444;
        box-shadow: 0 8px 25px rgba(239, 68, 68, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      &:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1);
        border-color: #d1d5db;
      }
      
      &.celebration::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: 
          radial-gradient(circle at 20% 20%, #ffd700 2px, transparent 2px),
          radial-gradient(circle at 80% 20%, #ff6b6b 2px, transparent 2px),
          radial-gradient(circle at 20% 80%, #4ecdc4 2px, transparent 2px),
          radial-gradient(circle at 80% 80%, #45b7d1 2px, transparent 2px),
          radial-gradient(circle at 50% 50%, #96ceb4 2px, transparent 2px);
        background-size: 20px 20px;
        animation: confetti 2s ease-out;
        pointer-events: none;
        z-index: 1;
      }
      
      @keyframes confetti {
        0% {
          opacity: 0;
          transform: scale(0.5) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: scale(1.1) rotate(180deg);
        }
        100% {
          opacity: 0;
          transform: scale(1.2) rotate(360deg);
        }
      }
      
      &.stars::after {
        content: '⭐✨🌟';
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.2rem;
        animation: twinkle 1.5s ease-in-out infinite;
        z-index: 2;
      }
      
      @keyframes twinkle {
        0%, 100% {
          opacity: 0.7;
          transform: scale(1) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: scale(1.2) rotate(10deg);
        }
      }
      
      &.updating {
        animation: progressUpdate 0.6s ease-out;
      }
      
      @keyframes progressUpdate {
        0% {
          transform: scale(1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        50% {
          transform: scale(1.02);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.2);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
      }
      
      .participant-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        
        .participant-avatar {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1rem;
          overflow: hidden;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .initials {
            color: white;
            font-weight: 700;
            font-size: 1rem;
          }
        }
        
        .participant-info {
          flex: 1;
          
          h4 {
            margin: 0 0 0.5rem 0;
            color: #1f2937;
            font-size: 1.125rem;
            font-weight: 600;
          }
          
          .participant-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            
            .role-badge {
              padding: 0.25rem 0.75rem;
              border-radius: 1rem;
              font-size: 0.75rem;
              font-weight: 600;
              
              &.admin {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                color: #d97706;
                border: 1px solid #f59e0b;
              }
              
              &.member {
                background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
                color: #0369a1;
                border: 1px solid #0ea5e9;
              }
            }
            
            .hot-streak-badge {
              padding: 0.25rem 0.75rem;
              border-radius: 1rem;
              font-size: 0.75rem;
              font-weight: 600;
              background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
              color: #dc2626;
              border: 1px solid #f87171;
              animation: pulse 2s ease-in-out infinite;
              
              &.streak-3 {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                color: #d97706;
                border: 1px solid #f59e0b;
              }
              
              &.streak-5 {
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                color: #059669;
                border: 1px solid #22c55e;
              }
              
              &.streak-7 {
                background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
                color: #7c3aed;
                border: 1px solid #a78bfa;
                animation: glow 2s ease-in-out infinite;
              }
            }
            
            .activity-badge {
              padding: 0.25rem 0.75rem;
              border-radius: 1rem;
              font-size: 0.75rem;
              font-weight: 500;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              color: #64748b;
              border: 1px solid #e2e8f0;
              
              &.active {
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                color: #059669;
                border: 1px solid #22c55e;
              }
              
              &.inactive {
                background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
                color: #dc2626;
                border: 1px solid #f87171;
              }
            }
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(124, 58, 237, 0.3);
          }
          50% {
            box-shadow: 0 0 15px rgba(124, 58, 237, 0.6);
          }
        }
      }
      
      .participant-progress {
        .progress-section {
          cursor: pointer;
          padding: 0.75rem;
          background: #f9fafb;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          
          &:hover {
            background: #f3f4f6;
          }
          
          .progress-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
            
            .progress-label {
              font-size: 0.875rem;
              color: #6b7280;
              font-weight: 500;
            }
            
            .progress-value {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              
              .percentage {
                font-size: 0.875rem;
                font-weight: 600;
                color: #1f2937;
              }
              
              .expand-arrow {
                font-size: 0.75rem;
                color: #9ca3af;
                transition: transform 0.2s ease;
                
                &.expanded {
                  transform: rotate(180deg);
                }
              }
            }
          }
          
          .progress-bar-modern {
            width: 100%;
            height: 0.75rem;
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            border-radius: 1rem;
            overflow: hidden;
            position: relative;
            box-shadow: 
              inset 0 2px 4px rgba(0, 0, 0, 0.1),
              0 1px 2px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            
            .progress-fill-modern {
              height: 100%;
              background: linear-gradient(135deg, 
                #10b981 0%, 
                #059669 25%, 
                #047857 50%, 
                #065f46 75%, 
                #064e3b 100%
              );
              border-radius: 1rem;
              transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
              box-shadow: 
                0 2px 8px rgba(16, 185, 129, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
              
              &::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, 
                  transparent, 
                  rgba(255, 255, 255, 0.6), 
                  transparent
                );
                animation: shimmer 3s ease-in-out infinite;
              }
              
              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                  radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                  radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                  radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.25) 1px, transparent 1px);
                background-size: 20px 20px, 15px 15px, 25px 25px;
                animation: float 4s ease-in-out infinite;
                opacity: 0.7;
              }
            }
          }
          
          @keyframes shimmer {
            0% {
              left: -100%;
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              left: 100%;
              opacity: 0;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-2px);
            }
          }
        }
        
        .no-progress {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f9fafb;
          border-radius: 0.5rem;
          
          .no-progress-icon {
            font-size: 1.25rem;
            opacity: 0.7;
          }
          
          .no-progress-text {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

export const ParticipantsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 {
    margin: 0;
    color: #1e293b;
    font-size: 1.5rem;
  }
  
  .invite-button {
    background: #10b981;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      background: #059669;
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;

export const InviteSection = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  .invite-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    
    .tab {
      background: #e2e8f0;
      color: #64748b;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
      
      &:hover {
        background: #cbd5e1;
      }
      
      &.active {
        background: #3b82f6;
        color: white;
      }
    }
  }
`;

export const InviteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }
    
    input {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.2s;
      
      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    
    .cancel-button {
      background: #f3f4f6;
      color: #374151;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
      
      &:hover {
        background: #e5e7eb;
      }
    }
    
    .submit-button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
      
      &:hover:not(:disabled) {
        background: #2563eb;
      }
      
      &:disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }
    }
  }
`;

export const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ParticipantCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  
  .participant-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .participant-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      overflow: hidden;
      background: #3b82f6;
      display: flex;
      align-items: center;
      justify-content: center;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .initials {
        color: white;
        font-weight: 600;
        font-size: 1rem;
      }
    }
    
    .details {
      h4 {
        margin: 0 0 0.25rem 0;
        color: #1e293b;
        font-size: 1rem;
        font-weight: 600;
      }
      
      .role {
        background: #e0e7ff;
        color: #3730a3;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
      }
    }
  }
  
  .progress-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.2s ease;
    
    &.clickable {
      cursor: pointer;
      border-radius: 0.25rem;
      padding: 0.25rem;
      margin: -0.25rem;
      
      &:hover {
        background: rgba(59, 130, 246, 0.1);
      }
    }
    
    .progress-bar {
      width: 100px;
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
      
      .progress-fill {
        height: 100%;
        background: #10b981;
        transition: width 0.3s ease;
      }
    }
    
    .progress-text-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .progress-text {
        color: #374151;
        font-weight: 600;
        font-size: 0.875rem;
        min-width: 3rem;
        text-align: right;
      }
      
      .expand-arrow {
        color: #6b7280;
        font-size: 0.75rem;
        transition: transform 0.2s ease;
        
        &.expanded {
          transform: rotate(180deg);
        }
      }
    }
    
    .progress-text {
      color: #374151;
      font-weight: 600;
      font-size: 0.875rem;
      min-width: 3rem;
      text-align: right;
    }
  }
  

  .participant-goals-expanded {
    margin-top: 1rem;
    padding: 1rem;
    background: #ffffff;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    animation: slideDown 0.3s ease-out;
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    h5 {
      margin: 0 0 0.75rem 0;
      color: #374151;
      font-size: 0.9rem;
      font-weight: 600;
    }
    
    .goals-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      
      .goal-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s ease;
        
        &.completed {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          
          .goal-text {
            text-decoration: line-through;
            color: #16a34a;
          }
        }
        
        &.pending {
          background: #fef3c7;
          border: 1px solid #fde68a;
          
          .goal-text {
            color: #92400e;
          }
        }
        
        .goal-status {
          font-size: 1rem;
          flex-shrink: 0;
        }
        
        .goal-text {
          font-size: 0.875rem;
          font-weight: 500;
          flex: 1;
        }
      }
      
      .no-goals-data {
        text-align: center;
        padding: 1rem;
        color: #6b7280;
        font-style: italic;
        font-size: 0.875rem;
      }
    }
    
    .goals-summary {
      display: flex;
      justify-content: center;
      padding-top: 0.5rem;
      border-top: 1px solid #f3f4f6;
      
      .completed-count {
        color: #6b7280;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
  }

  .participant-goals-modern {
    margin-top: 1rem;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid #e2e8f0;
    animation: slideDown 0.4s ease-out;
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-15px);
        scale: 0.98;
      }
      to {
        opacity: 1;
        transform: translateY(0);
        scale: 1;
      }
    }
    
    .goals-header-simple {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      
      h5 {
        margin: 0;
        color: #1f2937;
        font-size: 1rem;
        font-weight: 600;
      }
      
      .progress-counter {
        color: #6b7280;
        font-size: 0.875rem;
        font-weight: 500;
      }
    }
    
    .goals-grid-modern {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
      
      .goal-card-mini {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background: #fafafa;
        border-radius: 0.75rem;
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
        cursor: pointer;
        user-select: none;
        position: relative;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          border-color: #d1d5db;
        }
        
        &:active {
          transform: translateY(0px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(59, 130, 246, 0.02);
          border-radius: 0.75rem;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        &:hover::before {
          opacity: 1;
        }
        
        &.completed {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-color: #bbf7d0;
          
          &:hover {
            background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
            border-color: #86efac;
          }
          
          &::before {
            background: rgba(16, 185, 129, 0.05);
          }
        }
        
        &.pending {
          background: #fafafa;
          border-color: #e5e7eb;
          
          &:hover {
            background: #f9fafb;
            border-color: #d1d5db;
          }
        }
        
        .goal-status-modern {
          position: relative;
          
          .status-circle {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            font-weight: 600;
            transition: all 0.2s ease;
            
            &.completed {
              background: #10b981;
              color: white;
            }
            
            &.pending {
              background: #f3f4f6;
              color: #9ca3af;
              border: 2px solid #e5e7eb;
            }
          }
        }
        
        .goal-content-modern {
          flex: 1;
          position: relative;
          
          .goal-text-modern {
            display: block;
            font-size: 0.9rem;
            font-weight: 500;
            color: #374151;
            line-height: 1.5;
            margin-bottom: 0.25rem;
            transition: color 0.2s ease;
            
            &.completed {
              text-decoration: line-through;
              color: #6b7280;
            }
          }
          
          .goal-status-text {
            font-size: 0.75rem;
            font-weight: 500;
            color: #6b7280;
            
            .completed & {
              color: #059669;
            }
            
            .pending & {
              color: #6b7280;
            }
          }
          
         
        }
      }
      
      .no-goals-modern {
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        background: #fafafa;
        border-radius: 0.75rem;
        border: 2px dashed #d1d5db;
        
        .no-goals-icon {
          font-size: 2.5rem;
          opacity: 0.4;
        }
        
        .no-goals-text {
          color: #6b7280;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
        }
      }
    }
    
    .goals-summary-modern {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #fafafa;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
      
      .summary-progress-bar {
        flex: 1;
        height: 0.5rem;
        background: #f3f4f6;
        border-radius: 0.25rem;
        overflow: hidden;
        
        .summary-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981 0%, #059669 100%);
          border-radius: 0.25rem;
          transition: width 0.6s ease;
        }
      }
      
      .summary-text {
        font-size: 0.875rem;
        font-weight: 600;
        color: #374151;
        white-space: nowrap;
      }
    }
  }
`;


export const FriendsList = styled.div`
  h4 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.1rem;
  }
  
  .no-friends {
    text-align: center;
    color: #64748b;
    font-style: italic;
    padding: 1rem;
  }
`;

export const FriendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  margin-bottom: 0.5rem;
  
  .friend-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      overflow: hidden;
      background: #3b82f6;
      display: flex;
      align-items: center;
      justify-content: center;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .initials {
        color: white;
        font-weight: 600;
        font-size: 0.875rem;
      }
    }
    
    .name {
      color: #1e293b;
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
  
  .invite-friend-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
      background: #059669;
    }
    
    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
    
    &.already-in {
      background: #6b7280;
      cursor: not-allowed;
    }
  }
`;
