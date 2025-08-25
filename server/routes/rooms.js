import express from 'express';
import Room from '../models/Room.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();


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
    
    
    const newGoals = goals.slice(0, 5).map(goalText => ({
      text: goalText,
      isActive: true
    }));
    
    room.weeklyGoals.push(...newGoals);
    
    
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
    
    
    let todayProgress = room.dailyProgress.find(progress => 
      progress.date.toDateString() === today.toDateString()
    );
    
    if (!todayProgress) {

      todayProgress = {
        date: today,
        completedGoals: room.weeklyGoals.filter(goal => goal.isActive).map(goal => ({
          goalId: goal._id,
          userId: req.user._id,
          completed: false
        })),
        dailyPercentage: 0
      };
      room.dailyProgress.push(todayProgress);
    }
    
    
    const goalProgress = todayProgress.completedGoals.find(
      gp => gp.goalId.toString() === req.params.goalId
    );
    
    if (goalProgress) {
      goalProgress.completed = completed;
    }
    
    
    room.calculateDailyCompletion(today);
    
    
    room.calculateWeeklyProgress();
    
    
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
    
    
    const isAdmin = room.participants.some(
      p => p.user.toString() === req.user._id.toString() && p.role === 'admin'
    );
    
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Apenas administradores podem editar a sala'
      });
    }
    
    
    if (name !== undefined) {
      room.name = name.trim();
    }
    
    if (description !== undefined) {
      room.description = description.trim();
    }
    
    await room.save();
    
    
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
    
    
    const alreadyParticipant = room.participants.some(
      p => p.user.toString() === invitedUser._id.toString()
    );
    
    if (alreadyParticipant) {
      return res.status(400).json({
        success: false,
        message: 'Usuário já é participante da sala'
      });
    }
    
    
    room.participants.push({
      user: invitedUser._id,
      role: 'member'
    });
    
    await room.save();
    
    
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

