import styled from 'styled-components';

export const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

export const ChartTitle = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
`;

export const ChartSubtitle = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  
  ${props => props.trend === 'up' ? `
    background: #ecfdf5;
    color: #059669;
  ` : `
    background: #fef2f2;
    color: #dc2626;
  `}
`;

export const ChartContent = styled.div`
  margin-bottom: 1rem;
`;

export const BarContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 0.75rem;
  height: 200px;
  padding: 0 0.5rem;

  .bar-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: relative;
  }
`;

export const BarValue = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  opacity: ${props => props.opacity};
  transition: opacity 0.3s ease;
  min-height: 1rem;
`;

export const Bar = styled.div`
  width: 100%;
  max-width: 32px;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  position: relative;
  
  ${props => {
    const normalizedHeight = (props.percentage / props.maxPercentage) * 100;
    let backgroundColor = '#ef4444'; // Vermelho para baixo progresso
    
    if (props.percentage >= 80) {
      backgroundColor = '#10b981'; // Verde para alta performance
    } else if (props.percentage >= 50) {
      backgroundColor = '#f59e0b'; // Amarelo para performance média
    }
    
    return `
      height: ${Math.max(normalizedHeight, 4)}%;
      background: ${backgroundColor};
      ${props.isToday ? `
        box-shadow: 0 0 0 2px #3b82f6;
        &::after {
          content: '●';
          position: absolute;
          top: -1.5rem;
          left: 50%;
          transform: translateX(-50%);
          color: #3b82f6;
          font-size: 0.75rem;
        }
      ` : ''}
    `;
  }}

  &:hover {
    transform: scaleY(1.05);
    filter: brightness(1.1);
  }
`;

export const BarLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  margin-top: 0.5rem;
  text-align: center;
`;

export const Legend = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.color};
  }
`;
