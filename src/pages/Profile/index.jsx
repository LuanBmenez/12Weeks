import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useUserStats } from '../../hooks/useUserStats.js';
import { useToast } from '../../components/Toast/index.jsx';
import config from '../../config/config';
import StatsCards from '../../components/StatsCards';
import ProgressChart from '../../components/ProgressChart';
import EditableField from '../../components/EditableField';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Mail, Edit3, Camera, TrendingUp, Target, Award } from 'lucide-react';
import { 
  Container, 
  Header, 
  ProfileSection,
  ProfileCard, 
  Avatar, 
  UserInfo,
  ChartSection,
  BackButton,
  StatsGrid,
  StatsCard
} from './style';
import ImageWithFallback from '../../components/ImageWithFallback';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const userStats = useUserStats();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);



  if (!user) {
    return (
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', padding: '2rem' }}
        >
          <p>Carregando perfil...</p>
        </motion.div>
      </Container>
    );
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  const canEdit = () => {
    if (!user?.lastProfileEdit) return true;
    
    const now = new Date();
    const lastEdit = new Date(user.lastProfileEdit);
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    
    return (now.getTime() - lastEdit.getTime()) >= oneWeekInMs;
  };
  
  const getDaysLeft = () => {
    if (!user?.lastProfileEdit) return 0;
    
    const now = new Date();
    const lastEdit = new Date(user.lastProfileEdit);
    const nextEditDate = new Date(lastEdit.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return Math.ceil((nextEditDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
  };

  const handleSaveField = async (fieldName, value) => {
    if (!canEdit()) {
      const daysLeft = getDaysLeft();
      showError(`Você só pode editar seu perfil uma vez por semana. Próxima edição disponível em ${daysLeft} dia(s).`);
      return;
    }

   
    const finalValue = fieldName === 'username' ? String(value).replace(/^@+/, '') : value;

   
    if (user[fieldName] === finalValue) return;

    const payload = { [fieldName]: finalValue };

    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.daysLeft) {
          showError(`Você só pode editar seu perfil uma vez por semana. Próxima edição disponível em ${data.daysLeft} dia(s).`);
        } else {
          showError(data.message || 'Erro ao atualizar perfil');
        }
        return;
      }

      updateUser(data.user);
      const label = fieldName === 'name' ? 'Nome' : fieldName === 'username' ? 'Usuário' : 'Email';
      showSuccess(`${label} atualizado com sucesso! 🎉`);

    } catch (error) {
      console.error(`Erro ao atualizar ${fieldName}:`, error);
      showError('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  const testServerConnection = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Server connection test:', response.ok ? 'SUCCESS' : 'FAILED');
      return response.ok;
    } catch (error) {
      console.log('Server connection test FAILED:', error.message);
      return false;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showError('Por favor, selecione apenas arquivos de imagem (JPG, PNG, GIF).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showError('A imagem deve ter no máximo 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    
    try {
      setUploading(true);
      setUploadProgress(0);
      console.log('Starting upload for file:', file.name, 'Size:', file.size);
      
      
      const serverOk = await testServerConnection();
      if (!serverOk) {
        throw new Error('Servidor não está respondendo. Verifique se o backend está rodando.');
      }
      
      const formData = new FormData();
      formData.append('profilePicture', file);

      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      console.log('Sending request to server...');
      const response = await fetch(`${config.API_BASE_URL}/auth/upload-profile-picture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Server error response:', errorText);
        throw new Error(`Erro ao fazer upload da imagem: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      console.log('Updated user from server:', data.user);
      
      
      updateUser(data.user);
      
      showSuccess('Foto do perfil atualizada com sucesso! 🎉');
      
      
      setTimeout(() => {
        setPreviewImage(null);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Erro no upload:', error);
      showError('Erro ao atualizar foto do perfil. Tente novamente.');
      setPreviewImage(null);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

 
  const calculateWeeklyData = () => {
    if (!user?.dailyProgress) {
      return [];
    }

    const today = new Date();
    const weeklyData = [];
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayName = daysOfWeek[date.getDay()];
      
      const dayProgress = user.dailyProgress.filter(progress => {
        const progressDate = new Date(progress.date);
        progressDate.setHours(0, 0, 0, 0);
        return progressDate.getTime() === date.getTime();
      });
      
      let totalGoals = 0;
      let completedGoals = 0;
      let averagePercentage = 0;
      
      if (dayProgress.length > 0) {
        dayProgress.forEach(progress => {
          const roomGoals = user.individualGoals?.filter(goal => 
            goal.roomId?.toString() === progress.roomId?.toString() && goal.isActive
          ) || [];
          
          totalGoals += roomGoals.length;
          completedGoals += progress.completedGoals?.filter(g => g.completed).length || 0;
        });
        

        const totalPercentage = dayProgress.reduce((sum, progress) => sum + (progress.dailyPercentage || 0), 0);
        averagePercentage = dayProgress.length > 0 ? totalPercentage / dayProgress.length : 0;
      }
      
      weeklyData.push({
        day: dayName,
        percentage: Math.round(averagePercentage),
        goalsCompleted: completedGoals,
        totalGoals: totalGoals
      });
    }
    
    return weeklyData;
  };


  const weeklyData = calculateWeeklyData();


  const fallbackWeeklyData = [
    { day: 'Dom', percentage: 85, goalsCompleted: 6, totalGoals: 7 },
    { day: 'Seg', percentage: 92, goalsCompleted: 7, totalGoals: 8 },
    { day: 'Ter', percentage: 78, goalsCompleted: 5, totalGoals: 6 },
    { day: 'Qua', percentage: 95, goalsCompleted: 8, totalGoals: 8 },
    { day: 'Qui', percentage: 67, goalsCompleted: 4, totalGoals: 6 },
    { day: 'Sex', percentage: 89, goalsCompleted: 6, totalGoals: 7 },
    { day: 'Sáb', percentage: 73, goalsCompleted: 5, totalGoals: 7 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
          <motion.div 
            variants={sectionVariants}
            style={{ textAlign: 'left' }}
          >
            <BackButton onClick={handleBackToDashboard}>
              <ArrowLeft size={20} />
              Voltar ao Dashboard
            </BackButton>
          </motion.div>
          <motion.h1 variants={sectionVariants}>
            Painel de Controle
          </motion.h1>
          <motion.p variants={sectionVariants}>
            Acompanhe seu progresso e conquistas
          </motion.p>
        </Header>

        <ProfileSection>
          <motion.div variants={sectionVariants}>
            <ProfileCard>
              <Avatar>
                <div className="avatar-container">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview da Foto"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                  ) : (
                    <ImageWithFallback
                      src={user.profilePicture}
                      alt="Foto do Perfil"
                      fallbackText={user.username?.charAt(0)?.toUpperCase() || 'U'}
                      onLoad={() => console.log('Image loaded successfully')}
                      onError={() => console.log('Image failed to load, showing placeholder')}
                    />
                  )}
                  
                  {!uploading && (
                    <div className="upload-overlay" onClick={handlePhotoClick}>
                      <Camera className="upload-icon" />
                    </div>
                  )}
                  
                  {uploading && (
                    <div className="upload-progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                
                <button 
                  type="button"
                  onClick={handlePhotoClick}
                  disabled={uploading}
                  className="change-photo-btn"
                >
                  {uploading ? (
                    <>
                      <Camera size={16} style={{ marginRight: '8px' }} />
                      Enviando... {Math.round(uploadProgress)}%
                    </>
                  ) : (
                    <>
                      <Camera size={16} style={{ marginRight: '8px' }} />
                      Mudar Foto
                    </>
                  )}
                </button>
              </Avatar>
              <UserInfo>
                <EditableField
                  label="Nome"
                  value={user.name}
                  onSave={handleSaveField}
                  isEditable={canEdit()}
                  fieldName="name"
                />
                <EditableField
                  label="Usuário"
                  value={user.username}
                  onSave={handleSaveField}
                  isEditable={canEdit()}
                  fieldName="username"
                />
                <EditableField
                  label="Email"
                  value={user.email}
                  onSave={handleSaveField}
                  isEditable={false} 
                  fieldName="email"
                  inputType="email"
                />
              </UserInfo>
            </ProfileCard>
          </motion.div>
        </ProfileSection>

        <StatsGrid>
          <motion.div variants={sectionVariants}>
            <StatsCard gradient="linear-gradient(90deg, #10b981 0%, #059669 100%)">
              <h3>
                <TrendingUp />
                Tempo Total de Foco
              </h3>
              <div className="stat-value">
                {userStats?.totalFocusTime ? 
                  `${Math.floor(userStats.totalFocusTime / 60)}h ${String(userStats.totalFocusTime % 60).padStart(2, '0')}m` : 
                  '0h 00m'
                }
              </div>
              <p className="stat-label">Tempo dedicado aos estudos</p>
            </StatsCard>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <StatsCard gradient="linear-gradient(90deg, #f59e0b 0%, #d97706 100%)">
              <h3>
                <Target />
                Streak Atual
              </h3>
              <div className="stat-value">
                {userStats?.currentStreak || 0}
              </div>
              <p className="stat-label">Dias consecutivos de atividade</p>
            </StatsCard>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <StatsCard 
              gradient="linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)"
            >
              <h3>
                <Award />
                Conquistas
              </h3>
              <div className="stat-value">
                {userStats?.achievements?.filter(a => a.unlocked).length || 0}
              </div>
              <p className="stat-label">Badges conquistados</p>
            </StatsCard>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <StatsCard gradient="linear-gradient(90deg, #ef4444 0%, #dc2626 100%)">
              <h3>
                <Calendar />
                Meta Semanal
              </h3>
              <div className="stat-value">
                {userStats?.weeklyGoalProgress || 0}%
              </div>
              <p className="stat-label">Progresso da meta semanal</p>
            </StatsCard>
          </motion.div>
        </StatsGrid>

        <ChartSection>
          <motion.div variants={sectionVariants}>
            <div className="chart-card">
              <ProgressChart 
                weeklyData={weeklyData.length > 0 ? weeklyData : fallbackWeeklyData} 
                title="Atividade Semanal"
              />
            </div>
          </motion.div>
        </ChartSection>
      </motion.div>
      

    </Container>
  );
};

export default Profile;
