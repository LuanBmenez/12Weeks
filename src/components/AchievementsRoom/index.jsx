import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, Filter, X } from 'lucide-react';
import { useUserStats } from '../../hooks/useUserStats';
import {
  Container,
  Header,
  Title,
  Subtitle,
  FilterContainer,
  FilterButton,
  AchievementsGrid,
  AchievementCard,
  AchievementIcon,
  AchievementInfo,
  AchievementName,
  AchievementDescription,
  LockedOverlay,
  CategorySection,
  CategoryTitle,
  SingleCategoryGrid,
  StatsContainer,
  StatItem,
  CloseButton
} from './style';

const AchievementsRoom = ({ onClose }) => {
  const { achievements } = useUserStats();
  const [selectedCategory, setSelectedCategory] = useState('all');


  console.log('Achievements received:', achievements);

  const categories = [
    { id: 'all', name: 'Todas', icon: '🏆' },
    { id: 'inicio', name: 'Início', icon: '🚀' },
    { id: 'tempo', name: 'Tempo', icon: '⏰' },
    { id: 'streak', name: 'Sequência', icon: '🔥' },
    { id: 'salas', name: 'Salas', icon: '🏠' },
    { id: 'metas', name: 'Metas', icon: '🎯' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'especial', name: 'Especial', icon: '⭐' }
  ];


  const safeAchievements = Array.isArray(achievements) ? achievements : [];
  
  const filteredAchievements = selectedCategory === 'all' 
    ? safeAchievements 
    : safeAchievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = safeAchievements.filter(a => a.unlocked).length;
  const totalCount = safeAchievements.length;
  const completionPercentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  const groupedAchievements = filteredAchievements.reduce((groups, achievement) => {
    const category = achievement.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(achievement);
    return groups;
  }, {});

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Header>
          <div>
            <Title>
              <Award size={28} />
              Sala de Conquistas
            </Title>
            <Subtitle>
              Desbloqueie badges e mostre seu progresso!
            </Subtitle>
          </div>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </Header>

        <StatsContainer>
          <StatItem>
            <span className="stat-number">{unlockedCount}</span>
            <span className="stat-label">Desbloqueadas</span>
          </StatItem>
          <StatItem>
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">Total</span>
          </StatItem>
          <StatItem>
            <span className="stat-number">{completionPercentage}%</span>
            <span className="stat-label">Completado</span>
          </StatItem>
        </StatsContainer>

        <FilterContainer>
          {categories.map(category => (
            <FilterButton
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </FilterButton>
          ))}
        </FilterContainer>

        <AchievementsGrid>
          {totalCount === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              <Award size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>
                Carregando conquistas...
              </h3>
              <p style={{ margin: 0, fontSize: '1rem' }}>
                Aguarde enquanto carregamos suas conquistas.
              </p>
            </div>
          ) : selectedCategory === 'all' ? (
            Object.entries(groupedAchievements).map(([category, achievements]) => (
              <CategorySection key={category}>
                <CategoryTitle>
                  {categories.find(c => c.id === category)?.icon} {categories.find(c => c.id === category)?.name}
                </CategoryTitle>
                <div className="category-grid">
                  {achievements.map(achievement => (
                    <motion.div
                      key={achievement.id}
                      variants={cardVariants}
                    >
                      <AchievementCard unlocked={achievement.unlocked}>
                        <AchievementIcon unlocked={achievement.unlocked}>
                          {achievement.unlocked ? achievement.icon : '🔒'}
                        </AchievementIcon>
                        <AchievementInfo>
                          <AchievementName unlocked={achievement.unlocked}>
                            {achievement.name}
                          </AchievementName>
                          <AchievementDescription unlocked={achievement.unlocked}>
                            {achievement.description}
                          </AchievementDescription>
                        </AchievementInfo>
                        {!achievement.unlocked && (
                          <LockedOverlay>
                            <Lock size={16} />
                          </LockedOverlay>
                        )}
                      </AchievementCard>
                    </motion.div>
                  ))}
                </div>
              </CategorySection>
            ))
          ) : (
            <SingleCategoryGrid>
              {filteredAchievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  variants={cardVariants}
                >
                  <AchievementCard unlocked={achievement.unlocked}>
                    <AchievementIcon unlocked={achievement.unlocked}>
                      {achievement.unlocked ? achievement.icon : '🔒'}
                    </AchievementIcon>
                    <AchievementInfo>
                      <AchievementName unlocked={achievement.unlocked}>
                        {achievement.name}
                      </AchievementName>
                      <AchievementDescription unlocked={achievement.unlocked}>
                        {achievement.description}
                      </AchievementDescription>
                    </AchievementInfo>
                    {!achievement.unlocked && (
                      <LockedOverlay>
                        <Lock size={16} />
                      </LockedOverlay>
                    )}
                  </AchievementCard>
                </motion.div>
              ))}
            </SingleCategoryGrid>
          )}
        </AchievementsGrid>
      </motion.div>
    </Container>
  );
};

export default AchievementsRoom;
