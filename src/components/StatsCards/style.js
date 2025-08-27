import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const StatCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}80);
    border-radius: 20px 20px 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, ${props => props.color}08, transparent);
    transform: rotate(45deg);
    transition: all 0.5s ease;
    opacity: 0;
  }

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: ${props => props.color}40;
    
    &::after {
      opacity: 1;
      top: -10%;
      right: -10%;
    }
  }

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.25rem;
  }
`;

export const StatIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, ${props => props.color}20, ${props => props.color}05);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${StatCard}:hover &::before {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 18px;
    background: linear-gradient(135deg, transparent, ${props => props.color}10, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${StatCard}:hover &::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const StatContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 0.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.02em;

  span {
    font-size: 1.5rem;
    color: #64748b;
    font-weight: 600;
    margin-left: 0.25rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    
    span {
      font-size: 1.25rem;
    }
  }
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const StatTrend = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.isPositive ? '#10b981' : '#ef4444'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  &::before {
    content: ${props => props.isPositive ? '"↗"' : '"↘"'};
    font-size: 1rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const StatProgress = styled.div`
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  overflow: hidden;
  position: relative;

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
    border-radius: 4px;
    position: relative;
    min-width: 2px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: shimmer 2.5s infinite;
    }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @media (max-width: 768px) {
    height: 6px;
  }
`;

export const StatBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  background: ${props => props.color}15;
  color: ${props => props.color};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid ${props => props.color}30;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, ${props => props.color}10, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${StatCard}:hover &::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }
`;
