import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  ChartContainer,
  ChartHeader,
  ChartTitle,
  ChartSubtitle,
  ChartContent,
  BarContainer,
  Bar,
  BarLabel,
  BarValue,
  TrendIndicator,
  Legend,
  LegendItem
} from './style';

const ProgressChart = ({ weeklyData = [], title = "Atividade Semanal", className }) => {
  
  const generateWeeklyData = () => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const today = new Date();
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];
      
      
      const existingData = weeklyData.find(d => 
        new Date(d.date).toDateString() === date.toDateString()
      );
      
      data.push({
        day: dayName,
        date: date.toISOString().split('T')[0],
        percentage: existingData?.percentage || Math.floor(Math.random() * 100),
        goalsCompleted: existingData?.goalsCompleted || Math.floor(Math.random() * 8),
        totalGoals: existingData?.totalGoals || 8
      });
    }
    
    return data;
  };

  const data = weeklyData.length > 0 ? weeklyData : generateWeeklyData();
  const maxPercentage = Math.max(...data.map(d => d.percentage));
  const avgPercentage = Math.round(data.reduce((sum, d) => sum + d.percentage, 0) / data.length);
  
 
  const firstHalf = data.slice(0, Math.ceil(data.length / 2));
  const secondHalf = data.slice(Math.floor(data.length / 2));
  const firstAvg = firstHalf.reduce((sum, d) => sum + d.percentage, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, d) => sum + d.percentage, 0) / secondHalf.length;
  const trend = secondAvg > firstAvg ? 'up' : 'down';
  const trendValue = Math.abs(Math.round(secondAvg - firstAvg));

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const barVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: (percentage) => ({
      height: `${percentage}%`,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    })
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <ChartContainer>
        <ChartHeader>
          <div>
            <ChartTitle>{title}</ChartTitle>
            <ChartSubtitle>Últimos 7 dias • Média: {avgPercentage}%</ChartSubtitle>
          </div>
          <TrendIndicator trend={trend}>
            {trend === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span>{trendValue}%</span>
          </TrendIndicator>
        </ChartHeader>

        <ChartContent>
          <BarContainer>
            {data.map((item, index) => (
              <motion.div
                key={item.date}
                className="bar-wrapper"
                variants={barVariants}
                custom={item.percentage}
              >
                <BarValue opacity={item.percentage > 30 ? 1 : 0}>
                  {item.percentage}%
                </BarValue>
                <Bar
                  percentage={item.percentage}
                  maxPercentage={maxPercentage}
                  isToday={item.date === new Date().toISOString().split('T')[0]}
                />
                <BarLabel>{item.day}</BarLabel>
              </motion.div>
            ))}
          </BarContainer>
        </ChartContent>

        <Legend>
          <LegendItem color="#10b981">
            <div className="legend-dot" />
            <span>Meta concluída (≥80%)</span>
          </LegendItem>
          <LegendItem color="#f59e0b">
            <div className="legend-dot" />
            <span>Progresso médio (50-79%)</span>
          </LegendItem>
          <LegendItem color="#ef4444">
            <div className="legend-dot" />
            <span>Baixo progresso (&lt;50%)</span>
          </LegendItem>
        </Legend>
      </ChartContainer>
    </motion.div>
  );
};

export default ProgressChart;
