import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  .enter-room-button {
    background: #3b82f6;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;

    &:hover {
      background: #2563eb;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    flex: 1;
    text-align: center;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;

  &:hover {
    color: #374151;
  }

  span {
    line-height: 1;
  }
`;

export const ProfilePicture = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 20px;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border: 3px solid #e5e7eb;

  &:hover {
    transform: scale(1.05);
  }

  .participants-avatar {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .participant {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid white;
    overflow: hidden;
    background: #3b82f6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 18px;

    &.overlap {
      top: 30px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .initials {
      font-size: 20px;
      font-weight: 700;
    }
  }

  .default-avatar {
    font-size: 48px;
  }
`;

export const RoomName = styled.div`
  text-align: center;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  span {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
  }

  .edit-name {
    input {
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      border: 2px solid #3b82f6;
      border-radius: 8px;
      padding: 8px 12px;
      outline: none;
      background: white;
      color: #1f2937;
      width: 200px;
    }
  }
`;

export const MemberCount = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const Description = styled.div`
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;

  .add-description {
    color: #10b981;
    cursor: pointer;
    font-size: 14px;
    transition: color 0.2s;

    &:hover {
      color: #059669;
      text-decoration: underline;
    }
  }

  .has-description {
    color: #374151;
    font-size: 14px;
    line-height: 1.4;
    max-width: 300px;
  }

  .edit-description {
    width: 100%;

    textarea {
      width: 100%;
      border: 2px solid #3b82f6;
      border-radius: 8px;
      padding: 8px 12px;
      outline: none;
      background: white;
      color: #1f2937;
      font-size: 14px;
      resize: vertical;
      min-height: 80px;
      font-family: inherit;
    }

    .edit-actions {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-top: 8px;

      button {
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s;

        &:first-child {
          background: #3b82f6;
          color: white;

          &:hover {
            background: #2563eb;
          }
        }

        &:last-child {
          background: #e5e7eb;
          color: #374151;

          &:hover {
            background: #d1d5db;
          }
        }
      }
    }
  }
`;

export const CreationInfo = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 12px;
  margin-bottom: 20px;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
  font-size: 14px;

  &:hover {
    background: #f3f4f6;
  }
`;
