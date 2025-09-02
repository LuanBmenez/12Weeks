import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0.5rem 0 0 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  padding: 1.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 800;
    color: white;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .stat-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    
    .stat-number {
      font-size: 1.5rem;
    }
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

export const FilterButton = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  .category-icon {
    font-size: 1.1rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  ${props => props.active && `
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  `}
`;

export const AchievementsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const CategorySection = styled.div`
  margin-bottom: 4rem;

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
    padding: 0 1rem;
  }
`;

export const SingleCategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CategoryTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0 0 2rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
`;

export const AchievementCard = styled.div`
  background: ${props => props.unlocked 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  border: 1px solid ${props => props.unlocked 
    ? 'rgba(255, 255, 255, 0.3)' 
    : 'rgba(255, 255, 255, 0.1)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${props => props.unlocked 
    ? '0 8px 25px rgba(0, 0, 0, 0.1)' 
    : '0 4px 15px rgba(0, 0, 0, 0.05)'};
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.unlocked 
      ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)' 
      : 'rgba(255, 255, 255, 0.2)'};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.unlocked 
      ? '0 12px 35px rgba(0, 0, 0, 0.15)' 
      : '0 8px 25px rgba(0, 0, 0, 0.1)'};
  }

  ${props => !props.unlocked && `
    filter: grayscale(100%);
    opacity: 0.6;
  `}
`;

export const AchievementIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-align: center;
  filter: ${props => props.unlocked ? 'none' : 'grayscale(100%)'};
  opacity: ${props => props.unlocked ? '1' : '0.5'};
  line-height: 1;
`;

export const AchievementInfo = styled.div`
  text-align: center;
`;

export const AchievementName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: ${props => props.unlocked ? '#1e293b' : 'rgba(255, 255, 255, 0.7)'};
  line-height: 1.3;
`;

export const AchievementDescription = styled.p`
  font-size: 1rem;
  margin: 0;
  color: ${props => props.unlocked ? '#64748b' : 'rgba(255, 255, 255, 0.5)'};
  line-height: 1.5;
  font-weight: 500;
`;

export const LockedOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${AchievementCard}:hover & {
    opacity: 1;
  }
`;
