import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

export const Main = styled.main`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const BackButton = styled.button`
  background: #64748b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background: #475569;
  }
`;

export const RoomInfo = styled.div`
  flex: 1;
  
  h1 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 2rem;
  }
  
  p {
    margin: 0;
    color: #64748b;
    font-size: 1.1rem;
  }



  .title-with-edit, .description-with-edit {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    span {
      flex: 1;
    }
  }

  .edit-icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: all 0.2s;
    opacity: 0.7;
    
    &:hover {
      opacity: 1;
      background: #f1f5f9;
      transform: scale(1.1);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }

  .edit-input-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: white;
    border: 2px solid #3b82f6;
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .edit-input {
    border: none;
    outline: none;
    background: transparent;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    flex: 1;
    
    &.title-input {
      font-size: 2rem;
      font-weight: bold;
      color: #1e293b;
    }
    
    &.description-input {
      font-size: 1.1rem;
      color: #64748b;
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .edit-actions {
    display: flex;
    gap: 0.25rem;
  }

  .save-btn, .cancel-btn {
    border: none;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .save-btn {
    background: #10b981;
    color: white;
    
    &:hover:not(:disabled) {
      background: #059669;
    }
  }

  .cancel-btn {
    background: #ef4444;
    color: white;
    
    &:hover:not(:disabled) {
      background: #dc2626;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const GoalsSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &.modern-goals {
    padding: 1.5rem;
    border: 1px solid #f1f5f9;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }
  }

  .goals-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f1f5f9;
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .goals-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        
        &.room {
          background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
          color: #7c3aed;
        }
        
        &.individual {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #2563eb;
        }
      }
      
      .goals-info {
        h2 {
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .goals-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }
      }
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .progress-badge {
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        font-weight: 600;
        
        &.room {
          background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
          color: #7c3aed;
          border: 1px solid #c4b5fd;
        }
        
        &.individual {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #2563eb;
          border: 1px solid #93c5fd;
        }
      }
      
      .expand-toggle.modern {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 0.5rem;
        transition: all 0.2s ease;
        
        &:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }
        
        .arrow {
          color: #6b7280;
          font-size: 0.875rem;
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
        font-size: 1rem;
        font-weight: 600;
        color: #374151;
      }
      
      .edit-goals-btn.modern {
        background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        color: #374151;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.2s ease;
        
        &:hover {
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .btn-icon {
          font-size: 1rem;
        }
      }
    }
    
    .goals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      
      .goal-card {
        background: #fafafa;
        border: 1px solid #e5e7eb;
        border-radius: 0.75rem;
        padding: 1rem;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
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
        
        // Adiciona um overlay sutil no hover
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
          
          &.room {
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
            border-color: #e9d5ff;
            
            &:hover {
              background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
              border-color: #d8b4fe;
            }
            
            &::before {
              background: rgba(124, 58, 237, 0.05);
            }
          }
        }
        
        &.pending {
          background: #fafafa;
          border-color: #e5e7eb;
          
          &:hover {
            background: #f9fafb;
            border-color: #d1d5db;
          }
          
          &.room {
            background: linear-gradient(135deg, #fefbff 0%, #faf5ff 100%);
            border-color: #f3e8ff;
            
            &:hover {
              background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
              border-color: #e9d5ff;
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
        
        .goal-content {
          flex: 1;
          position: relative;
          
          .goal-text {
            font-size: 0.9rem;
            line-height: 1.5;
            color: #374151;
            font-weight: 500;
            transition: color 0.2s ease;
            
            &.completed {
              text-decoration: line-through;
              color: #6b7280;
            }
          }
          
          // Indicador sutil de que é clicável
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const ProgressCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  
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

  /* Novos estilos modernos */
  &.modern-card {
    padding: 1.5rem;
    border: 1px solid #f1f5f9;
    transition: all 0.3s ease;
    text-align: left;
    
    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    .card-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      
      &.today {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        color: #1e40af;
      }
      
      &.overall {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        color: #166534;
      }
    }
    
    .card-title {
      flex: 1;
      
      h3 {
        margin: 0 0 0.25rem 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
      }
      
      .card-subtitle {
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 500;
      }
    }
    
    .card-percentage {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
    }
  }

  .progress-bar-container {
    margin-bottom: 1.5rem;
    
    .progress-bar {
      width: 100%;
      height: 0.5rem;
      background: #f3f4f6;
      border-radius: 0.25rem;
      overflow: hidden;
      
      .progress-fill {
        height: 100%;
        border-radius: 0.25rem;
        transition: width 0.6s ease;
        
        &.today {
          background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
        }
        
        &.overall {
          background: linear-gradient(90deg, #10b981 0%, #047857 100%);
        }
      }
    }
  }

  .progress-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.5rem;
      transition: background-color 0.2s ease;
      
      &:hover {
        background: #f3f4f6;
      }
      
      .detail-icon {
        font-size: 1rem;
        opacity: 0.8;
      }
      
      .detail-text {
        flex: 1;
        font-size: 0.875rem;
        color: #4b5563;
        font-weight: 500;
      }
      
      .detail-count {
        font-size: 0.875rem;
        font-weight: 600;
        color: #1f2937;
        background: white;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        border: 1px solid #e5e7eb;
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
