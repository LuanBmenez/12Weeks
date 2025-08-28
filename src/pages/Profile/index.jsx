import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useUserStats } from '../../hooks/useUserStats.js';
import { useToast } from '../../components/Toast/index.jsx';
import StatsCards from '../../components/StatsCards';
import ProgressChart from '../../components/ProgressChart';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Check, X } from 'lucide-react';
import { 
  Container, 
  Header, 
  ProfileSection,
  ProfileCard, 
  Avatar, 
  UserInfo,
  ChartSection,
  BackButton
} from './style';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const userStats = useUserStats();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Estados para edição inline
  const [editingField, setEditingField] = useState(null);
  const [editValues, setEditValues] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || ''
  });
  const [updating, setUpdating] = useState(false);

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

  // Função para verificar se pode editar
  const canEdit = () => {
    if (!user?.lastProfileEdit) return true;
    
    const now = new Date();
    const lastEdit = new Date(user.lastProfileEdit);
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    
    return (now.getTime() - lastEdit.getTime()) >= oneWeekInMs;
  };

  // Função para calcular dias restantes
  const getDaysLeft = () => {
    if (!user?.lastProfileEdit) return 0;
    
    const now = new Date();
    const lastEdit = new Date(user.lastProfileEdit);
    const nextEditDate = new Date(lastEdit.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return Math.ceil((nextEditDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
  };

  // Iniciar edição
  const startEditing = (field) => {
    if (!canEdit()) {
      const daysLeft = getDaysLeft();
      showError(`Você só pode editar seu perfil uma vez por semana. Próxima edição disponível em ${daysLeft} dia(s).`);
      return;
    }
    
    setEditingField(field);
    setEditValues({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || ''
    });
  };

  // Cancelar edição
  const cancelEditing = () => {
    setEditingField(null);
    setEditValues({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || ''
    });
  };

  // Salvar edição
  const saveEdit = async () => {
    if (!editingField) return;
    
    try {
      setUpdating(true);
      
      const response = await fetch('http://localhost:3001/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: editValues.name,
          username: editValues.username,
          email: editValues.email
        })
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

      // Atualizar contexto do usuário
      updateUser(data.user);
      setEditingField(null);
      showSuccess('Perfil atualizado com sucesso! 🎉');

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      showError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setUpdating(false);
    }
  };

  const testServerConnection = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/me', {
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
      showError('Por favor, selecione apenas arquivos de imagem.');
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
      console.log('Starting upload for file:', file.name, 'Size:', file.size);
      
      
      const serverOk = await testServerConnection();
      if (!serverOk) {
        throw new Error('Servidor não está respondendo. Verifique se o backend está rodando.');
      }
      
      const formData = new FormData();
      formData.append('profilePicture', file);

      console.log('Sending request to server...');
      const response = await fetch('http://localhost:3001/api/auth/upload-profile-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

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
      }, 500);
    } catch (error) {
      console.error('Erro no upload:', error);
      showError('Erro ao atualizar foto do perfil. Tente novamente.');
      setPreviewImage(null);
    } finally {
      setUploading(false);
    }
  };

  // Função para calcular dados semanais reais
  const calculateWeeklyData = () => {
    if (!user?.dailyProgress) {
      return [];
    }

    const today = new Date();
    const weeklyData = [];
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    // Calcular os últimos 7 dias
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayName = daysOfWeek[date.getDay()];
      
      // Buscar progresso do dia em todas as salas
      const dayProgress = user.dailyProgress.filter(progress => {
        const progressDate = new Date(progress.date);
        progressDate.setHours(0, 0, 0, 0);
        return progressDate.getTime() === date.getTime();
      });
      
      let totalGoals = 0;
      let completedGoals = 0;
      let averagePercentage = 0;
      
      if (dayProgress.length > 0) {
        // Calcular total de metas e concluídas
        dayProgress.forEach(progress => {
          const roomGoals = user.individualGoals?.filter(goal => 
            goal.roomId?.toString() === progress.roomId?.toString() && goal.isActive
          ) || [];
          
          totalGoals += roomGoals.length;
          completedGoals += progress.completedGoals?.filter(g => g.completed).length || 0;
        });
        
        // Calcular média de percentual do dia
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

  // Dados semanais reais
  const weeklyData = calculateWeeklyData();

  // Fallback para dados simulados se não houver dados reais
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
                  {(previewImage || user.profilePicture) ? (
                    <img 
                      src={previewImage || user.profilePicture} 
                      alt="Foto do Perfil"
                      onError={(e) => {
                        console.log('Image failed to load, showing placeholder');
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully');
                      }}
                    />
                  ) : null}
                  <div 
                    className="avatar-placeholder"
                    style={{
                      display: (previewImage || user.profilePicture) ? 'none' : 'flex',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: 'white',
                      margin: '0 auto 1rem auto'
                    }}
                  >
                    {user.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
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
                  {uploading ? 'Enviando...' : 'Mudar Foto'}
                </button>
              </Avatar>
              <UserInfo>
                {/* Nome editável */}
                <div className="editable-field">
                  {editingField === 'name' ? (
                    <div className="edit-mode">
                      <input
                        type="text"
                        value={editValues.name}
                        onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        disabled={updating}
                        autoFocus
                      />
                      <div className="edit-actions">
                        <button onClick={saveEdit} disabled={updating}>
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEditing} disabled={updating}>
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="display-mode" onClick={() => startEditing('name')}>
                      <h2>{user.name}</h2>
                      <Edit3 size={16} className="edit-icon" />
                    </div>
                  )}
                </div>

                {/* Username editável */}
                <div className="editable-field">
                  {editingField === 'username' ? (
                    <div className="edit-mode">
                      <input
                        type="text"
                        value={editValues.username}
                        onChange={(e) => setEditValues(prev => ({ ...prev, username: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        disabled={updating}
                        autoFocus
                      />
                      <div className="edit-actions">
                        <button onClick={saveEdit} disabled={updating}>
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEditing} disabled={updating}>
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="display-mode username" onClick={() => startEditing('username')}>
                      <p>@{user.username}</p>
                      <Edit3 size={14} className="edit-icon" />
                    </div>
                  )}
                </div>

                {/* Email editável */}
                <div className="editable-field">
                  {editingField === 'email' ? (
                    <div className="edit-mode">
                      <input
                        type="email"
                        value={editValues.email}
                        onChange={(e) => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        disabled={updating}
                        autoFocus
                      />
                      <div className="edit-actions">
                        <button onClick={saveEdit} disabled={updating}>
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEditing} disabled={updating}>
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="display-mode" onClick={() => startEditing('email')}>
                      <p>{user.email}</p>
                      <Edit3 size={14} className="edit-icon" />
                    </div>
                  )}
                </div>
              </UserInfo>
            </ProfileCard>
          </motion.div>
        </ProfileSection>

        <motion.div variants={sectionVariants}>
          <StatsCards userStats={userStats} />
        </motion.div>

        <ChartSection>
          <motion.div variants={sectionVariants}>
            <ProgressChart 
              weeklyData={weeklyData.length > 0 ? weeklyData : fallbackWeeklyData} 
              title="Atividade Semanal"
            />
          </motion.div>
        </ChartSection>
      </motion.div>
    </Container>
  );
};

export default Profile;
