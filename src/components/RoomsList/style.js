import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  .error {
    text-align: center;
    padding: 40px;
    color: #dc2626;

    button {
      background: #dc2626;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 16px;
      font-weight: 500;

      &:hover {
        background: #b91c1c;
      }
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .modal {
      background: white;
      padding: 24px;
      border-radius: 12px;
      max-width: 400px;
      width: 90%;
      text-align: center;

      h3 {
        margin: 0 0 16px 0;
        color: #1f2937;
      }

      p {
        margin: 0 0 20px 0;
        color: #6b7280;
      }

      button {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;

        &:hover {
          background: #2563eb;
        }
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

export const CreateButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;

  .room-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s;
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-color: #3b82f6;
    }

    .room-avatar {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      position: relative;

      .participants-preview {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .participant {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 3px solid white;
        overflow: hidden;
        background: #3b82f6;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 16px;

        &.overlap {
          top: 15px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .initials {
          font-size: 18px;
          font-weight: 700;
        }
      }

      .default-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #f3f4f6;
        border: 3px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
      }
    }

    .room-info {
      text-align: center;
      margin-bottom: 20px;

      .room-name {
        font-size: 20px;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 8px 0;
        line-height: 1.3;
      }

      .room-description {
        color: #6b7280;
        font-size: 14px;
        line-height: 1.4;
        margin: 0 0 16px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .room-meta {
        display: flex;
        justify-content: center;
        gap: 16px;
        font-size: 12px;
        color: #9ca3af;

        .member-count {
          display: flex;
          align-items: center;
          gap: 4px;

          &::before {
            content: '👥';
            font-size: 14px;
          }
        }

        .room-date {
          display: flex;
          align-items: center;
          gap: 4px;

          &::before {
            content: '📅';
            font-size: 14px;
          }
        }
      }
    }

    .room-actions {
      text-align: center;

      .enter-room {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        transition: background-color 0.2s;
        width: 100%;

        &:hover {
          background: #2563eb;
        }
      }
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #6b7280;

  .empty-icon {
    font-size: 64px;
    margin-bottom: 24px;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: #374151;
    margin: 0 0 12px 0;
  }

  p {
    font-size: 16px;
    margin: 0 0 32px 0;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.2s;

    &:hover {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
  }
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #6b7280;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
  }

  p {
    font-size: 16px;
    margin: 0;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Responsividade
export const ResponsiveContainer = styled(Container)`
  @media (max-width: 768px) {
    padding: 16px;

    ${Header} {
      flex-direction: column;
      align-items: stretch;
      text-align: center;
    }

    ${Title} {
      font-size: 24px;
    }

    ${CreateButton} {
      width: 100%;
      justify-content: center;
    }

    ${RoomsGrid} {
      grid-template-columns: 1fr;
      gap: 16px;

      .room-card {
        padding: 20px;

        .room-avatar {
          width: 60px;
          height: 60px;

          .participant {
            width: 40px;
            height: 40px;
            font-size: 14px;

            .initials {
              font-size: 16px;
            }
          }

          .default-avatar {
            font-size: 24px;
          }
        }

        .room-info .room-name {
          font-size: 18px;
        }
      }
    }
  }
`;
