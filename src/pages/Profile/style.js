import styled from 'styled-components';

export const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 0.5rem 0;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-weight: 500;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ProfileSection = styled.section`
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

export const ProfileCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 32px 64px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
    gap: 2rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

export const StatsCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.gradient || 'linear-gradient(90deg, #10b981 0%, #059669 100%)'};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.3);
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0.5rem 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0;
  }
`;

export const Avatar = styled.div`
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .avatar-container {
    position: relative;
    display: inline-block;
    margin-bottom: 1.5rem;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

    &:hover {
      border-color: #667eea;
      transform: scale(1.05);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
    }
  }

  .avatar-placeholder {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      border-color: #667eea;
      transform: scale(1.05);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
    }
  }

  .upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    .upload-icon {
      color: white;
      font-size: 1.5rem;
    }
  }

  .upload-progress {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #10b981 0%, #059669 100%);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }

  button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    margin-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
      background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      background: #94a3b8;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;

      &::before {
        display: none;
      }
    }
  }
`;

export const UserInfo = styled.div`
  flex: 1;

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  p {
    margin: 0 0 0.5rem 0;
    color: #64748b;
    line-height: 1.6;
    font-size: 0.95rem;

    &:first-of-type {
      color: #3b82f6;
      font-weight: 600;
      font-size: 0.9rem;
    }

    &:last-child {
      color: #475569;
      font-size: 0.875rem;
      margin-bottom: 0;
    }
  }

  .editable-field {
    margin-bottom: 0.75rem;
    position: relative;

    .display-mode {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: all 0.2s ease;
      position: relative;

      &:hover {
        background-color: #f8fafc;
        
        .edit-icon {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .edit-icon {
        opacity: 0;
        transform: translateX(-5px);
        transition: all 0.2s ease;
        color: #94a3b8;
        flex-shrink: 0;
      }

      h2, p {
        margin: 0;
        flex: 1;
      }

      &.username p {
        color: #3b82f6;
        font-weight: 600;
      }
    }

    .edit-mode {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      input {
        flex: 1;
        padding: 0.5rem;
        border: 2px solid #3b82f6;
        border-radius: 6px;
        font-size: 0.95rem;
        font-family: inherit;
        background: white;
        transition: all 0.2s ease;

        &:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        &:disabled {
          background: #f1f5f9;
          cursor: not-allowed;
        }
      }

      .edit-actions {
        display: flex;
        gap: 0.25rem;

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;

          &:first-child {
            background: #10b981;
            color: white;

            &:hover:not(:disabled) {
              background: #059669;
            }
          }

          &:last-child {
            background: #ef4444;
            color: white;

            &:hover:not(:disabled) {
              background: #dc2626;
            }
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }
    }
  }
`;

export const ChartSection = styled.section`
  margin-top: 2rem;
  position: relative;
  z-index: 1;

  .chart-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 2.5rem;
    border-radius: 24px;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 32px 64px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.3);
    }
  }
`;
