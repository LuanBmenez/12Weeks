import styled from 'styled-components';

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 1rem;

  &:hover {
    background-color: #f1f5f9;
    color: #3b82f6;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 0.5rem 0;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    margin: 0;
    font-weight: 500;
  }
`;

export const ProfileSection = styled.section`
  margin-bottom: 2rem;
`;

export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Avatar = styled.div`
  text-align: center;
  position: relative;
  
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      border-color: #3b82f6;
      transform: scale(1.05);
    }
  }

  .avatar-placeholder {
    border: 3px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      border-color: #3b82f6;
      transform: scale(1.05);
    }
  }

  button {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    border: none;
    padding: 0.6rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    margin-top: 0.5rem;
    display: inline-block;
    min-width: 120px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      background: #94a3b8;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
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
`;
