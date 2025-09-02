import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Users, 
  Award, 
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import {
  StatsContainer,
  StatCard,
  StatIcon,
  StatContent,
  StatNumber,
  StatLabel,
  StatTrend,
  StatProgress,
  StatBadge
} from './style';

const StatsCards = ({ userStats = {} }) => {
  const {
    totalGoals = 0,
    completedGoals = 0,
    overallProgress = 0,
    currentWeek = 1,
    weeklyStreak = 0,
  } = userStats;

  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  const weekProgress = Math.round((currentWeek / 12) * 100);

  const stats = [
    
    {
      id: 1,
      icon: CheckCircle,
      label: 'Taxa de Conclusão',
      value: completionRate,
      suffix: '%',
      color: '#10b981',
      bgColor: '#ecfdf5',
      trend: completionRate > 80 ? 'Excelente!' : completionRate > 60 ? 'Bom' : 'Melhorar',
      trendUp: completionRate > 60,
      showProgress: true,
      progressValue: completionRate
    },
   
    {
      id: 2,
      icon: Calendar,
      label: 'Progresso 12 Semanas',
      value: currentWeek,
      suffix: '/12',
      color: '#f59e0b',
      bgColor: '#fef3c7',
      trend: `${weekProgress}% completo`,
      trendUp: true,
      showProgress: true,
      progressValue: weekProgress
    },
    {
      id: 3,
      icon: Award,
      label: 'Sequência Semanal',
      value: weeklyStreak,
      suffix: weeklyStreak === 1 ? ' semana' : ' semanas',
      color: '#06b6d4',
      bgColor: '#cffafe',
      trend: weeklyStreak > 3 ? 'Em chamas! 🔥' : weeklyStreak > 0 ? 'Mantendo!' : 'Começar',
      trendUp: weeklyStreak > 0,
      badge: weeklyStreak > 5 ? 'Lendário!' : weeklyStreak > 2 ? 'Consistente' : weeklyStreak > 0 ? 'Iniciando' : 'Novo'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const hoverVariants = {
    hover: { 
      y: -8,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <StatsContainer>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            variants={cardVariants}
            whileHover="hover"
          >
            <StatCard
              variants={hoverVariants}
              whileHover="hover"
              color={stat.color}
              bgColor={stat.bgColor}
            >
              <motion.div variants={iconVariants} whileHover="hover">
                <StatIcon color={stat.color} bgColor={stat.bgColor}>
                  <stat.icon size={28} />
                </StatIcon>
              </motion.div>
              
              <StatContent>
                <StatNumber>
                  <CountUp
                    end={stat.value}
                    duration={2}
                    delay={index * 0.2}
                    preserveValue
                    useEasing={true}
                  />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </StatNumber>
                
                <StatLabel>{stat.label}</StatLabel>
                
                <StatTrend isPositive={stat.trendUp}>
                  {stat.trend}
                </StatTrend>
                
                {stat.showProgress && (
                  <StatProgress>
                    <motion.div
                      className="progress-bar"
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progressValue}%` }}
                      transition={{ 
                        duration: 2, 
                        delay: index * 0.2 + 0.5,
                        ease: "easeOut"
                      }}
                    />
                  </StatProgress>
                )}

                {stat.badge && (
                  <StatBadge color={stat.color}>
                    {stat.badge}
                  </StatBadge>
                )}
              </StatContent>
            </StatCard>
          </motion.div>
        ))}
      </StatsContainer>
    </motion.div>
  );
};

export default StatsCards;
