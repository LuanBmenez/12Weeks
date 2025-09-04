import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 24px;
  margin: -24px;
  padding: 48px 24px 24px 24px;
  border-radius: 18px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  .back-button {
    background: #64748b;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      background: #475569;
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

export const CreateButton = styled.button`
  background: #3b82f6;
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
    background: #2563eb;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  .room-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid #e5e7eb;
    position: relative;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-color: #3b82f6;
      
      .room-header h3 {
        color: #3b82f6;
      }
      
      .participant-count {
        background: #dbeafe;
        color: #1e40af;
      }
    }
    
    &:active {
      transform: translateY(-2px);
      transition: all 0.1s ease;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
    
    .room-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      
      .room-title-section {
        flex: 1;
        
        h3 {
          margin: 0 0 0.5rem 0;
          color: #1f2937;
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .status-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          
          .status-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 0.75rem;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            
            &.new {
              background: #dbeafe;
              color: #1e40af;
            }
            
            &.active {
              background: #dcfce7;
              color: #166534;
            }
            
            &.archived {
              background: #f3f4f6;
              color: #6b7280;
            }
          }
        }
      }
      
      .room-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        .participant-count {
          background: #f3f4f6;
          color: #6b7280;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .favorite-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          font-size: 1rem;
          transition: all 0.2s;
          opacity: 0.7;
          
          &:hover {
            opacity: 1;
            transform: scale(1.2);
          }
          
          &:active {
            transform: scale(0.9);
          }
        }
        
        .quick-actions-menu {
          position: relative;
          
          .menu-trigger {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 0.25rem;
            font-size: 1.2rem;
            color: #6b7280;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            
            &:hover {
              background: #f3f4f6;
              color: #374151;
            }
          }
          
          .menu-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid #e5e7eb;
            padding: 0.5rem 0;
            min-width: 150px;
            z-index: 10;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease;
            
            &.open {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }
            
            .menu-item {
              width: 100%;
              background: none;
              border: none;
              padding: 0.5rem 1rem;
              text-align: left;
              cursor: pointer;
              font-size: 0.875rem;
              color: #374151;
              transition: background-color 0.2s;
              display: flex;
              align-items: center;
              gap: 0.5rem;
              
              &:hover {
                background: #f3f4f6;
              }
              
              &.delete {
                color: #dc2626;
                
                &:hover {
                  background: #fee2e2;
                }
              }
            }
          }
        }
      }
    }
    
    .room-description {
      color: #6b7280;
      margin: 0 0 1rem 0;
      line-height: 1.5;
      font-size: 0.9rem;
    }
    
    .progress-section {
      margin-bottom: 1rem;
      
      .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        
        .progress-label {
          color: #374151;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .progress-percentage {
          color: #3b82f6;
          font-size: 0.8rem;
          font-weight: 600;
        }
      }
      
      .progress-bar {
        width: 100%;
        height: 6px;
        background: #e5e7eb;
        border-radius: 3px;
        overflow: hidden;
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          border-radius: 3px;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 2s infinite;
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        }
      }
    }
    
    .room-additional-info {
      margin-bottom: 1.5rem;
      
      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
        gap: 1rem;
        flex-wrap: wrap;
        
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          
          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            
            &.online {
              background: #10b981;
              box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
            }
            
            &.offline {
              background: #6b7280;
            }
            
            &.away {
              background: #f59e0b;
            }
          }
          
          .status-text {
            color: #374151;
            font-size: 0.8rem;
            font-weight: 500;
          }
        }
        
        .last-activity {
          color: #6b7280;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        

      }
      
      .upcoming-goals {
        background: #f8fafc;
        border-radius: 0.5rem;
        padding: 0.75rem;
        border-left: 3px solid #3b82f6;
        
        .goals-label {
          color: #374151;
          font-size: 0.8rem;
          font-weight: 600;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .goals-preview {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          
          span {
            color: #6b7280;
            font-size: 0.75rem;
            line-height: 1.3;
            
            &:last-child {
              color: #9ca3af;
              font-style: italic;
            }
          }
        }
      }
    }
    
    .room-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .footer-left {
        .creation-date {
          color: #9ca3af;
          font-size: 0.875rem;
        }
      }
      
      .footer-right {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        
        .notification-badge {
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
          cursor: pointer;
          transition: all 0.2s ease;
          
          &:hover {
            background: #dc2626;
            transform: scale(1.1);
          }
          
          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
            }
            50% {
              box-shadow: 0 0 0 4px rgba(239, 68, 68, 0);
            }
          }
        }
      }
      
      .enter-button {
        background: #10b981;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        font-size: 0.875rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;
        
        &:hover {
          background: #059669;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        &:active {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2);
        }
        
        .button-icon {
          font-size: 1rem;
          font-weight: bold;
          transition: transform 0.2s ease;
        }
      }
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #1f2937;
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }
  
  p {
    color: #6b7280;
    margin: 0 0 2rem 0;
    font-size: 1.1rem;
  }
  
  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.2s;
    
    &:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  
  &::after {
    content: '';
    width: 3rem;
    height: 3rem;
    border: 3px solid #e5e7eb;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ResponsiveContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`;


export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

export const Input = styled.input`
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
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const CancelButton = styled.button`
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
`;

export const SubmitButton = styled.button`
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
`;
