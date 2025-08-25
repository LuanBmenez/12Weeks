import styled, { keyframes, css } from 'styled-components';

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInTop = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const getPositionStyles = (position) => {
  switch (position) {
    case 'top-left':
      return css`
        top: 20px;
        left: 20px;
        right: auto;
        bottom: auto;
      `;
    case 'top-center':
      return css`
        top: 20px;
        left: 50%;
        right: auto;
        bottom: auto;
        transform: translateX(-50%);
      `;
    case 'top-right':
      return css`
        top: 20px;
        right: 20px;
        left: auto;
        bottom: auto;
      `;
    case 'bottom-left':
      return css`
        bottom: 20px;
        left: 20px;
        right: auto;
        top: auto;
      `;
    case 'bottom-center':
      return css`
        bottom: 20px;
        left: 50%;
        right: auto;
        top: auto;
        transform: translateX(-50%);
      `;
    case 'bottom-right':
      return css`
        bottom: 20px;
        right: 20px;
        left: auto;
        top: auto;
      `;
    default:
      return css`
        top: 20px;
        right: 20px;
        left: auto;
        bottom: auto;
      `;
  }
};

const getAnimation = (position) => {
  switch (position) {
    case 'top-left':
    case 'bottom-left':
      return slideInLeft;
    case 'top-right':
    case 'bottom-right':
      return slideInRight;
    case 'top-center':
      return slideInTop;
    case 'bottom-center':
      return slideInBottom;
    default:
      return slideInRight;
  }
};

export const ToastContainer = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 420px;
  pointer-events: none;
  
  ${({ position }) => getPositionStyles(position)}
  
  @media (max-width: 768px) {
    max-width: calc(100vw - 40px);
    ${({ position }) => {
      if (position.includes('left') || position.includes('right')) {
        return css`
          left: 20px !important;
          right: 20px !important;
          transform: none !important;
        `;
      }
      return '';
    }}
  }
`;

export const ToastItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-left: 4px solid;
  position: relative;
  overflow: hidden;
  pointer-events: auto;
  min-width: 320px;
  max-width: 420px;
  animation: ${({ position = 'top-right' }) => getAnimation(position)} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return css`
          border-left-color: #10b981;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.15);
        `;
      case 'error':
        return css`
          border-left-color: #ef4444;
          background: linear-gradient(135deg, #fef2f2 0%, #fef2f2 100%);
          box-shadow: 0 8px 32px rgba(239, 68, 68, 0.15);
        `;
      case 'warning':
        return css`
          border-left-color: #f59e0b;
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          box-shadow: 0 8px 32px rgba(245, 158, 11, 0.15);
        `;
      case 'info':
        return css`
          border-left-color: #3b82f6;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
        `;
      default:
        return css`
          border-left-color: #6b7280;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          box-shadow: 0 8px 32px rgba(107, 114, 128, 0.15);
        `;
    }
  }}
  
  &.hidden {
    animation: ${slideOut} 0.3s ease-in forwards;
  }
  
  .toast-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    .toast-header {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .icon {
        font-size: 20px;
        flex-shrink: 0;
      }
      
      .title {
        font-weight: 600;
        font-size: 14px;
        color: #374151;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
    
    .message {
      color: #1f2937;
      font-size: 14px;
      line-height: 1.5;
      font-weight: 500;
    }
  }
  
  .toast-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    
    button {
      background: none;
      border: none;
      padding: 6px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: rgba(0, 0, 0, 0.1);
        transform: scale(1.1);
      }
      
      &.pause-btn {
        color: #6b7280;
        
        &:hover {
          color: #374151;
        }
      }
      
      &.close-btn {
        color: #9ca3af;
        font-weight: bold;
        
        &:hover {
          color: #6b7280;
          background: rgba(239, 68, 68, 0.1);
        }
      }
    }
  }
  
  .toast-controls {
    display: flex;
    justify-content: center;
    margin-top: 8px;
    
    .clear-all-btn {
      background: rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      padding: 8px 16px;
      font-size: 12px;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;
      pointer-events: auto;
      
      &:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #374151;
        transform: translateY(-1px);
      }
    }
  }
  
  @media (max-width: 768px) {
    min-width: auto;
    max-width: 100%;
    
    .toast-content .message {
      font-size: 13px;
    }
    
    .toast-actions {
      margin-top: 10px;
    }
  }
`;

export const ToastProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${({ type }) => {
    switch (type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  transition: width 0.1s linear;
  border-radius: 0 0 12px 12px;
`;
