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
`;

export const GoalsHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.5rem;
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
