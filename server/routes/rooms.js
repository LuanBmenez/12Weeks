import express from 'express';
import Room from '../models/Room.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Criar nova sala
router.post('/create', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const room = new Room({
      name,
      description,
      creator: req.user._id,
      participants: [{
        user: req.user._id,
        role: 'admin'
      }]
    });
    
    await room.save();
    
    // Populate creator info
    await room.populate('creator', 'name email');
    
    res.status(201).json({
      success: true,
      room
    });
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Listar salas do usuário
router.get('/my-rooms', auth, async (req, res) => {
  try {
    const rooms = await Room.find({
      'participants.user': req.user._id,
      isActive: true
    })
    .populate('creator', 'name email')
    .populate('participants.user', 'name email')
    .sort({ updatedAt: -1 });
    
    res.json({
      success: true,
      rooms
    });
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Buscar sala por ID
router.get('/:roomId', auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId)
      .populate('creator', 'name email')
      .populate('participants.user', 'name email');
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Sala não encontrada'
      });
    }
    
    // Verificar se usuário é participante
    const isParticipant = room.participants.some(
      p => p.user._id.toString() === req.user._id.toString()
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }
    
    res.json({
      success: true,
      room
    });
  } catch (error) {
    console.error('Erro ao buscar sala:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Definir metas semanais (apenas uma vez por semana)
router.post('/:roomId/weekly-goals', auth, async (req, res) => {
  try {
    const { goals } = req.body;
    const room = await Room.findById(req.params.roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Sala não encontrada'
      });
    }
    
    // Verificar se usuário é participante
    const isParticipant = room.participants.some(
      p => p.user.toString() === req.user._id.toString()
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }
    
    // Verificar se já existem metas para esta semana
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const hasGoalsThisWeek = room.weeklyGoals.some(goal => {
      const goalDate = new Date(goal.createdAt);
      return goalDate >= weekStart && goal.isActive;
    });
    
    if (hasGoalsThisWeek) {
      return res.status(400).json({
        success: false,
        message: 'Metas já foram definidas para esta semana'
      });
    }
    
    // Adicionar novas metas semanais
    const newGoals = goals.slice(0, 5).map(goalText => ({
      text: goalText,
      isActive: true
    }));
    
    room.weeklyGoals.push(...newGoals);
    
    // Inicializar progresso diário para hoje
    const todayProgress = {
      date: today,
      completedGoals: newGoals.map((_, index) => ({
        goalId: room.weeklyGoals[room.weeklyGoals.length - newGoals.length + index]._id,
        completed: false
      })),
      dailyPercentage: 0
    };
    
    room.dailyProgress.push(todayProgress);
    
    await room.save();
    
    res.json({
      success: true,
      weeklyGoals: newGoals,
      todayProgress
    });
  } catch (error) {
    console.error('Erro ao definir metas semanais:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Marcar meta como concluída para o dia
router.put('/:roomId/daily-progress/:goalId', auth, async (req, res) => {
  try {
    const { completed } = req.body;
    const room = await Room.findById(req.params.roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Sala não encontrada'
      });
    }
    
    // Verificar se usuário é participante
    const isParticipant = room.participants.some(
      p => p.user.toString() === req.user._id.toString()
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Encontrar ou criar progresso para hoje
    let todayProgress = room.dailyProgress.find(progress => 
      progress.date.toDateString() === today.toDateString()
    );
    
    if (!todayProgress) {
      // Criar novo progresso para hoje
      todayProgress = {
        date: today,
        completedGoals: room.weeklyGoals.filter(goal => goal.isActive).map(goal => ({
          goalId: goal._id,
          completed: false
        })),
        dailyPercentage: 0
      };
      room.dailyProgress.push(todayProgress);
    }
    
    // Atualizar status da meta
    const goalProgress = todayProgress.completedGoals.find(
      gp => gp.goalId.toString() === req.params.goalId
    );
    
    if (goalProgress) {
      goalProgress.completed = completed;
    }
    
    // Recalcular porcentagem diária
    room.calculateDailyCompletion(today);
    
    // Recalcular progresso semanal
    room.calculateWeeklyProgress();
    
    // Verificar se deve avançar para próxima semana
    room.checkWeekAdvance();
    
    await room.save();
    
    res.json({
      success: true,
      message: 'Progresso atualizado com sucesso',
      todayProgress,
      weeklyProgress: room.weeklyProgress
    });
  } catch (error) {
    console.error('Erro ao atualizar progresso:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Editar sala (nome e descrição)
router.put('/:roomId', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const room = await Room.findById(req.params.roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Sala não encontrada'
      });
    }
    
    // Verificar se usuário é admin
    const isAdmin = room.participants.some(
      p => p.user.toString() === req.user._id.toString() && p.role === 'admin'
    );
    
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Apenas administradores podem editar a sala'
      });
    }
    
    // Atualizar campos se fornecidos
    if (name !== undefined) {
      room.name = name.trim();
    }
    
    if (description !== undefined) {
      room.description = description.trim();
    }
    
    await room.save();
    
    // Populate para retornar dados atualizados
    await room.populate('creator', 'name email');
    await room.populate('participants.user', 'name email');
    
    res.json({
      success: true,
      room
    });
  } catch (error) {
    console.error('Erro ao editar sala:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;

