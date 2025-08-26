import express from 'express';
import Room from '../models/Room.js';
import User from '../models/User.js';
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
    
    // Popular dados do criador
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

// Listar minhas salas
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

// Obter detalhes de uma sala
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
    
    // Verificar se o usuário é participante da sala
    const isParticipant = room.participants.some(
      p => p.user._id.toString() === req.user._id.toString()
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }

    // Buscar metas individuais do usuário para esta sala
    const user = await User.findById(req.user._id);
    const userGoals = user.individualGoals.filter(goal => 
      goal.roomId.toString() === room._id.toString() && goal.isActive
    );

    // Buscar progresso diário do usuário para esta sala
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const userTodayProgress = user.dailyProgress.find(progress => 
      progress.roomId.toString() === room._id.toString() &&
      progress.date.toDateString() === today.toDateString()
    );

    // Calcular progresso individual
    const dailyPercentage = user.calculateDailyCompletion(room._id, today);
    const weeklyPercentage = user.calculateWeeklyProgress(room._id);
    const overallPercentage = user.weeklyProgress.overallPercentage;
    const currentWeek = user.weeklyProgress.currentWeek;

    // Criar objeto de resposta com dados da sala e dados individuais do usuário
    const roomData = {
      ...room.toObject(),
      userIndividualGoals: userGoals,
      userTodayProgress: userTodayProgress,
      userProgress: {
        dailyPercentage,
        weeklyPercentage,
        overallPercentage,
        currentWeek
      }
    };

    res.json({
      success: true,
      room: roomData
    });
  } catch (error) {
    console.error('Erro ao buscar sala:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Definir metas semanais individuais
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
    
    // Verificar se o usuário é participante da sala
    const isParticipant = room.participants.some(
      p => p.user.toString() === req.user._id.toString()
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }
    
    // Verificar se o usuário já tem metas para esta semana nesta sala
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const user = await User.findById(req.user._id);
    const hasGoalsThisWeek = user.individualGoals.some(goal => 
      goal.roomId.toString() === room._id.toString() &&
      goal.createdAt >= weekStart && 
      goal.isActive
    );
    
    if (hasGoalsThisWeek) {
      return res.status(400).json({
        success: false,
        message: 'Você já definiu metas para esta semana nesta sala'
      });
    }
    
    // Criar metas individuais para o usuário
    const newGoals = goals.slice(0, 5).map(goalText => ({
      roomId: room._id,
      text: goalText,
      isActive: true
    }));
    
    user.individualGoals.push(...newGoals);
    
    // Criar progresso diário para hoje
    const todayProgress = {
      roomId: room._id,
      date: today,
      completedGoals: newGoals.map((_, index) => ({
        goalId: user.individualGoals[user.individualGoals.length - newGoals.length + index]._id,
        completed: false
      })),
      dailyPercentage: 0
    };
    
    user.dailyProgress.push(todayProgress);
    
    // Calcular progresso diário
    user.calculateDailyCompletion(room._id, today);
    
    await user.save();
    
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

// Atualizar progresso diário individual
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
    
    // Verificar se o usuário é participante da sala
    const isParticipant = room.participants.some(
      p => p.user.toString() === req.user._id.toString()
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }

    const user = await User.findById(req.user._id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Buscar ou criar progresso diário para o usuário nesta sala
    let todayProgress = user.dailyProgress.find(progress => 
      progress.roomId.toString() === room._id.toString() &&
      progress.date.toDateString() === today.toDateString()
    );
    
    if (!todayProgress) {
      // Buscar metas ativas do usuário para esta sala
      const roomGoals = user.individualGoals.filter(goal => 
        goal.roomId.toString() === room._id.toString() && goal.isActive
      );
      
      todayProgress = {
        roomId: room._id,
        date: today,
        completedGoals: roomGoals.map(goal => ({
          goalId: goal._id,
          completed: false
        })),
        dailyPercentage: 0
      };
      user.dailyProgress.push(todayProgress);
    }
    
    // Atualizar o status da meta específica
    const goalProgress = todayProgress.completedGoals.find(
      gp => gp.goalId.toString() === req.params.goalId
    );
    
    if (goalProgress) {
      goalProgress.completed = completed;
    }
    
    // Calcular progresso diário individual
    user.calculateDailyCompletion(room._id, today);
    
    // Calcular progresso semanal individual
    user.calculateWeeklyProgress(room._id);
    
    // Verificar avanço de semana individual
    user.checkWeekAdvance(room._id);
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Progresso atualizado com sucesso',
      todayProgress,
      weeklyProgress: user.weeklyProgress
    });
  } catch (error) {
    console.error('Erro ao atualizar progresso:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Editar sala (apenas admin)
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
    
    // Verificar se o usuário é admin da sala
    const isAdmin = room.participants.some(
      p => p.user.toString() === req.user._id.toString() && p.role === 'admin'
    );
    
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Apenas administradores podem editar a sala'
      });
    }
    
    // Atualizar campos
    if (name !== undefined) {
      room.name = name.trim();
    }
    
    if (description !== undefined) {
      room.description = description.trim();
    }
    
    await room.save();
    
    // Popular dados atualizados
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

// Convidar usuário para sala
router.post('/:roomId/invite', auth, async (req, res) => {
  try {
    const { friendCode, userId } = req.body;
    const room = await Room.findById(req.params.roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Sala não encontrada'
      });
    }
    
    // Verificar se o usuário é participante da sala
    const isParticipant = room.participants.some(
      p => p.user.toString() === req.user._id.toString()
    );
    
    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }
    
    let invitedUser;
    
    // Buscar usuário por código de amigo ou ID
    if (friendCode) {
      invitedUser = await User.findOne({ friendCode });
    } else if (userId) {
      invitedUser = await User.findById(userId);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Forneça friendCode ou userId'
      });
    }
    
    if (!invitedUser) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    // Verificar se já é participante
    const alreadyParticipant = room.participants.some(
      p => p.user.toString() === invitedUser._id.toString()
    );
    
    if (alreadyParticipant) {
      return res.status(400).json({
        success: false,
        message: 'Usuário já é participante da sala'
      });
    }
    
    // Adicionar usuário à sala
    room.participants.push({
      user: invitedUser._id,
      role: 'member'
    });
    
    await room.save();
    
    // Popular dados dos participantes
    await room.populate('participants.user', 'name email profilePicture');
    
    res.json({
      success: true,
      message: 'Usuário convidado com sucesso',
      room
    });
  } catch (error) {
    console.error('Erro ao convidar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
