import styled, { keyframes, css } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const wave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

const getVariantStyles = (variant) => {
  switch (variant) {
    case 'dark':
      return css`
        background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
        color: #374151;
      `;
    case 'light':
      return css`
        background: linear-gradient(90deg, #f9fafb 25%, #f3f4f6 50%, #f9fafb 75%);
        color: #f9fafb;
      `;
    case 'blue':
      return css`
        background: linear-gradient(90deg, #dbeafe 25%, #bfdbfe 50%, #dbeafe 75%);
        color: #dbeafe;
      `;
    case 'green':
      return css`
        background: linear-gradient(90deg, #d1fae5 25%, #a7f3d0 50%, #d1fae5 75%);
        color: #d1fae5;
      `;
    case 'purple':
      return css`
        background: linear-gradient(90deg, #e9d5ff 25%, #c4b5fd 50%, #e9d5ff 75%);
        color: #e9d5ff;
      `;
    case 'orange':
      return css`
        background: linear-gradient(90deg, #fed7aa 25%, #fdba74 50%, #fed7aa 75%);
        color: #fed7aa;
      `;
    default:
      return css`
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        color: #f0f0f0;
      `;
  }
};

const getAnimation = (animated, variant) => {
  if (!animated) return '';
  
  switch (variant) {
    case 'pulse':
      return css`animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;`;
    case 'wave':
      return css`
        position: relative;
        overflow: hidden;
        
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: ${wave} 1.5s infinite;
        }
      `;
    case 'bounce':
      return css`animation: ${bounce} 1s infinite;`;
    default:
      return css`
        background-size: 200px 100%;
        animation: ${shimmer} 1.5s infinite;
      `;
  }
};

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SkeletonItem = styled.div`
  ${({ variant = 'default' }) => getVariantStyles(variant)}
  ${({ animated = true, variant: animVariant = 'default' }) => getAnimation(animated, animVariant)}
  border-radius: ${({ rounded, type }) => {
    if (rounded) return '12px';
    if (type === 'circle') return '50%';
    if (type === 'avatar') return '8px';
    if (type === 'button') return '8px';
    if (type === 'input') return '8px';
    if (type === 'card') return '8px';
    return '4px';
  }};
  
  ${({ style }) => style && css`
    width: ${style.width || '100%'};
    height: ${style.height || '16px'};
    margin-bottom: ${style.marginBottom || '0'};
    margin-top: ${style.marginTop || '0'};
    margin-left: ${style.marginLeft || '0'};
    margin-right: ${style.marginRight || '0'};
  `}
  
  ${({ type }) => {
    switch (type) {
      case 'circle':
        return css`
          border-radius: 50%;
          flex-shrink: 0;
        `;
      case 'avatar':
        return css`
          border-radius: 8px;
          flex-shrink: 0;
        `;
      case 'button':
        return css`
          border-radius: 8px;
          cursor: pointer;
          
          &:hover {
            opacity: 0.8;
          }
        `;
      case 'input':
        return css`
          border-radius: 8px;
          border: 1px solid transparent;
        `;
      case 'card':
        return css`
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        `;
      default:
        return css`
          border-radius: 4px;
        `;
    }
  }}
  
  /* Responsividade */
  @media (max-width: 768px) {
    ${({ style }) => style && css`
      width: ${style.width === '100%' ? '100%' : 'auto'};
      min-width: ${style.width === '100%' ? '100%' : '60px'};
    `}
  }
  
  /* Estados de foco para acessibilidade */
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  /* Transições suaves */
  transition: all 0.2s ease;
  
  /* Melhorias para modo escuro */
  @media (prefers-color-scheme: dark) {
    ${({ variant }) => variant === 'default' && css`
      background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
      color: #374151;
    `}
  }
  
  /* Melhorias para usuários com preferência de movimento reduzido */
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    
    &::after {
      animation: none !important;
    }
  }
`;

// Componentes específicos com estilos customizados
export const SkeletonText = styled(SkeletonItem)`
  height: 1em;
  line-height: 1;
  vertical-align: middle;
  
  ${({ lines = 1 }) => lines > 1 && css`
    &:not(:last-child) {
      margin-bottom: 0.5em;
    }
  `}
`;

export const SkeletonImage = styled(SkeletonItem)`
  aspect-ratio: 16/9;
  width: 100%;
  height: auto;
  min-height: 120px;
`;

export const SkeletonVideo = styled(SkeletonItem)`
  aspect-ratio: 16/9;
  width: 100%;
  height: auto;
  min-height: 200px;
  position: relative;
  
  &::before {
    content: '▶';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.8);
    z-index: 1;
  }
`;

export const SkeletonCode = styled(SkeletonItem)`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  padding: 1rem;
  border-radius: 8px;
  background: #1f2937;
  color: #f9fafb;
  
  &::before {
    content: '// ...';
    color: #6b7280;
    font-style: italic;
  }
`;

export const SkeletonBadge = styled(SkeletonItem)`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  min-width: 60px;
  text-align: center;
`;

export const SkeletonChip = styled(SkeletonItem)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  min-width: 80px;
  justify-content: center;
  
  &::before {
    content: '●';
    margin-right: 0.5rem;
    font-size: 0.75rem;
  }
`;

export const SkeletonDivider = styled(SkeletonItem)`
  height: 1px;
  width: 100%;
  margin: 1rem 0;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
`;

export const SkeletonSpacer = styled.div`
  height: ${({ size = '1rem' }) => size};
  width: 100%;
`;

// Utilitários para layouts
export const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ gap = '1rem' }) => gap};
  width: 100%;
`;

export const SkeletonColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap = '1rem' }) => gap};
  width: 100%;
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${({ minWidth = '200px' }) => minWidth}, 1fr));
  gap: ${({ gap = '1rem' }) => gap};
  width: 100%;
`;

export const SkeletonFlexbox = styled.div`
  display: flex;
  flex-wrap: ${({ wrap = 'nowrap' }) => wrap};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  gap: ${({ gap = '1rem' }) => gap};
  width: 100%;
`;
