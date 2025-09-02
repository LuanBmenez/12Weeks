import styled from 'styled-components';

export const ChartContainer = styled.div`
  background: transparent;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  border: none;
  transition: all 0.3s ease;
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
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const BarContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 1.2rem;
  height: 200px;
  padding: 0 1rem;
  justify-content: space-between;
  min-width: 500px;
  max-width: 100%;

  .bar-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: relative;
    min-width: 50px;
  }
`;

export const BarValue = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  opacity: ${props => props.opacity};
  transition: opacity 0.3s ease;
  min-height: 1.2rem;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

export const Bar = styled.div`
  width: 100%;
  max-width: 28px;
  border-radius: 6px 6px 0 0;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  ${props => {
    const normalizedHeight = (props.percentage / props.maxPercentage) * 100;
    let gradient = 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)';
    
    if (props.percentage >= 80) {
      gradient = 'linear-gradient(180deg, #10b981 0%, #059669 100%)';
    } else if (props.percentage >= 50) {
      gradient = 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)';
    }
    
    return `
      height: ${Math.max(normalizedHeight, 8)}%;
      background: ${gradient};
      ${props.isToday ? `
        box-shadow: 0 0 0 3px #3b82f6, 0 4px 12px rgba(59, 130, 246, 0.3);
        &::after {
          content: '●';
          position: absolute;
          top: -1.5rem;
          left: 50%;
          transform: translateX(-50%);
          color: #3b82f6;
          font-size: 0.75rem;
          font-weight: bold;
        }
      ` : ''}
    `;
  }}

  &:hover {
    transform: scaleY(1.05) scaleX(1.1);
    filter: brightness(1.1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const BarLabel = styled.div`
  font-size: 0.7rem;
  color: #6b7280;
  font-weight: 600;
  margin-top: 0.5rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 40px;
`;

export const Legend = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 1rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.color};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;
