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
    .populate('creator', 'name email username profilePicture')
    .populate('participants.user', 'name email username profilePicture')
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
      .populate('creator', 'name email username profilePicture')
      .populate('participants.user', 'name email username profilePicture');
    
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

    
    const user = await User.findById(req.user._id);
    const userGoals = user.individualGoals.filter(goal => 
      goal.roomId.toString() === room._id.toString() && goal.isActive
    );

    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let userTodayProgress = user.dailyProgress.find(progress => 
      progress.roomId.toString() === room._id.toString() &&
      progress.date.toDateString() === today.toDateString()
    );

    if (!userTodayProgress && userGoals.length > 0) {
      userTodayProgress = {
        roomId: room._id,
        date: today,
        completedGoals: userGoals.map(goal => ({
          goalId: goal._id,
          completed: false
        })),
        dailyPercentage: 0
      };
      user.dailyProgress.push(userTodayProgress);
      await user.save();
    }
    
    const dailyPercentage = user.calculateDailyCompletion(room._id, today, room);
    const weeklyPercentage = user.calculateWeeklyProgress(room._id);
    const overallPercentage = user.weeklyProgress.overallPercentage;
    const currentWeek = user.weeklyProgress.currentWeek;

    
    const participantsWithProgress = await Promise.all(
      room.participants.map(async (participant) => {
        const participantUser = await User.findById(participant.user._id);
        
        if (!participantUser) {
          return {
            ...participant.toObject(),
            progress: {
              dailyPercentage: 0,
              hasGoals: false,
              goalsCount: 0
            }
          };
        }

        
        const participantGoals = participantUser.individualGoals.filter(goal => 
          goal.roomId.toString() === room._id.toString() && goal.isActive
        );


        const participantTodayProgress = participantUser.dailyProgress.find(progress => 
          progress.roomId.toString() === room._id.toString() &&
          progress.date.toDateString() === today.toDateString()
        );

        
        const participantDailyPercentage = participantUser.calculateDailyCompletion(room._id, today, room);

       
        const goalsWithStatus = participantGoals.map(goal => {
          const goalProgress = participantTodayProgress?.completedGoals?.find(
            gp => gp.goalId.toString() === goal._id.toString()
          );
          return {
            goalId: goal._id,
            text: goal.text,
            completed: goalProgress?.completed || false
          };
        });

        const currentStreak = participantUser.getCurrentStreak();
        
        return {
          ...participant.toObject(),
          user: {
            ...participantUser.toObject(),
            currentStreak: currentStreak,
            streakData: participantUser.streakData,
            lastActivity: participantUser.lastActivity,
            timeSinceLastActivity: participantUser.getTimeSinceLastActivity()
          },
          progress: {
            dailyPercentage: participantDailyPercentage,
            hasGoals: participantGoals.length > 0,
            goalsCount: participantGoals.length,
            goals: goalsWithStatus,
            todayProgress: participantTodayProgress
          }
        };
      })
    );

    
    const activeRoomGoals = room.roomGoals.filter(goal => goal.isActive);
    const todayRoomProgress = room.roomDailyProgress.find(progress => 
      progress.date.toDateString() === today.toDateString()
    );
    
    
    const roomGoalsWithUserProgress = activeRoomGoals.map(goal => {
      const userCompletion = todayRoomProgress?.completedGoals?.find(
        cg => cg.goalId.toString() === goal._id.toString() && 
             cg.userId.toString() === req.user._id.toString()
      );
      
      return {
        ...goal.toObject(),
        userCompleted: userCompletion?.completed || false
      };
    });
    
    
    const roomGoalProgress = room.calculateRoomGoalProgress(today);
    
    const roomData = {
      ...room.toObject(),
      participants: participantsWithProgress,
      userIndividualGoals: userGoals,
      userTodayProgress: userTodayProgress,
      userProgress: {
        dailyPercentage,
        weeklyPercentage,
        overallPercentage,
        currentWeek
      },
      roomGoals: roomGoalsWithUserProgress,
      roomTodayProgress: todayRoomProgress,
      roomGoalProgress: roomGoalProgress
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
    
    const user = await User.findById(req.user._id);
    
    
    user.individualGoals.forEach(goal => {
      if (goal.roomId.toString() === room._id.toString() && goal.isActive) {
        goal.isActive = false;
      }
    });
    
    
    const newGoals = goals.slice(0, 5).map(goalText => ({
      roomId: room._id,
      text: goalText,
      isActive: true
    }));
    
    user.individualGoals.push(...newGoals);
    
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
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
    
    
    user.calculateDailyCompletion(room._id, today, room);
    
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

    const user = await User.findById(req.user._id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    
    let todayProgress = user.dailyProgress.find(progress => 
      progress.roomId.toString() === room._id.toString() &&
      progress.date.toDateString() === today.toDateString()
    );
    
    if (!todayProgress) {

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
    

    const goalProgress = todayProgress.completedGoals.find(
      gp => gp.goalId.toString() === req.params.goalId
    );
    
    if (goalProgress) {
      goalProgress.completed = completed;
    }
    

    user.calculateDailyCompletion(room._id, today, room);
    

    user.calculateWeeklyProgress(room._id);
    

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
    

    await room.populate('creator', 'name email username profilePicture');
    await room.populate('participants.user', 'name email username profilePicture');
    
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
    

    if (!friendCode && !userId) {
      return res.status(400).json({
        success: false,
        message: 'Forneça friendCode ou userId'
      });
    }
    
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
        message: 'Acesso negado - você não é participante desta sala'
      });
    }
    
    let invitedUser;
    

    try {
      if (friendCode) {
        invitedUser = await User.findOne({ friendCode: friendCode.toUpperCase() });
      } else if (userId) {
        invitedUser = await User.findById(userId);
      }
    } catch (searchError) {
      console.error('Erro ao buscar usuário:', searchError);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário'
      });
    }
    
    if (!invitedUser) {
      return res.status(404).json({
        success: false,
        message: friendCode ? 'Código de amigo não encontrado' : 'Usuário não encontrado'
      });
    }
    

    if (invitedUser._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode convidar a si mesmo'
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
    

    if (room.participants.length >= 10) {
      return res.status(400).json({
        success: false,
        message: 'Sala atingiu o limite máximo de participantes'
      });
    }
    

    room.participants.push({
      user: invitedUser._id,
      role: 'member',
      joinedAt: new Date()
    });
    
    await room.save();
    

    await room.populate('participants.user', 'name email username profilePicture');
    
    res.json({
      success: true,
      message: `${invitedUser.name} foi convidado com sucesso para a sala`,
      room
    });
  } catch (error) {
    console.error('Erro ao convidar usuário:', error);
    

    let errorMessage = 'Erro interno do servidor';
    
    if (error.name === 'ValidationError') {
      errorMessage = 'Dados inválidos para convite';
    } else if (error.name === 'CastError') {
      errorMessage = 'ID de sala inválido';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
});


router.delete('/:roomId', auth, async (req, res) => {
  try {
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
        message: 'Apenas administradores podem deletar a sala'
      });
    }
    

    await User.updateMany(
      { 'individualGoals.roomId': room._id },
      { $pull: { individualGoals: { roomId: room._id } } }
    );
    

    await User.updateMany(
      { 'dailyProgress.roomId': room._id },
      { $pull: { dailyProgress: { roomId: room._id } } }
    );
    

    await Room.findByIdAndDelete(req.params.roomId);
    
    res.json({
      success: true,
      message: 'Sala deletada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar sala:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});


router.post('/:roomId/room-goals', auth, async (req, res) => {
  try {
    const { goals } = req.body;
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
        message: 'Apenas administradores podem definir metas da sala'
      });
    }
    

    room.roomGoals.forEach(goal => {
      if (goal.isActive) {
        goal.isActive = false;
      }
    });
    

    const newRoomGoals = goals.slice(0, 5).map(goalText => ({
      text: goalText,
      createdBy: req.user._id,
      isActive: true
    }));
    
    room.roomGoals.push(...newRoomGoals);
    

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    
    let todayRoomProgress = room.roomDailyProgress.find(progress => 
      progress.date.toDateString() === today.toDateString()
    );
    
    if (!todayRoomProgress) {
      todayRoomProgress = {
        date: today,
        completedGoals: [],
        dailyPercentage: 0
      };
      room.roomDailyProgress.push(todayRoomProgress);
    }
    

    room.participants.forEach(participant => {
      newRoomGoals.forEach(goal => {
        const goalId = room.roomGoals[room.roomGoals.length - newRoomGoals.length + newRoomGoals.indexOf(goal)]._id;
        const existingCompletion = todayRoomProgress.completedGoals.find(
          cg => cg.goalId.toString() === goalId.toString() && 
               cg.userId.toString() === participant.user.toString()
        );
        
        if (!existingCompletion) {
          todayRoomProgress.completedGoals.push({
            goalId: goalId,
            userId: participant.user,
            completed: false
          });
        }
      });
    });
    
    
    room.calculateRoomGoalProgress(today);
    
    await room.save();
    
    
    for (const participant of room.participants) {
      const user = await User.findById(participant.user);
      if (user) {
        user.calculateDailyCompletion(room._id, today, room);
        user.calculateWeeklyProgress(room._id);
        await user.save();
      }
    }
    
    res.json({
      success: true,
      roomGoals: newRoomGoals,
      todayRoomProgress
    });
  } catch (error) {
    console.error('Erro ao definir metas da sala:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});


router.put('/:roomId/room-goals/:goalId', auth, async (req, res) => {
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
    

    const updatedProgress = room.toggleRoomGoalForUser(
      req.params.goalId, 
      req.user._id, 
      completed, 
      today
    );
    
    await room.save();
    
   
    const user = await User.findById(req.user._id);
    user.calculateDailyCompletion(room._id, today, room);
    user.calculateWeeklyProgress(room._id);
    await user.save();
    
   
    const todayProgress = user.dailyProgress.find(progress => 
      progress.roomId.toString() === room._id.toString() &&
      progress.date.toDateString() === today.toDateString()
    );
    
    res.json({
      success: true,
      message: 'Progresso da meta da sala atualizado com sucesso',
      roomProgress: updatedProgress,
      todayProgress: todayProgress,
      weeklyProgress: user.weeklyProgress
    });
  } catch (error) {
    console.error('Erro ao atualizar progresso da meta da sala:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota para buscar mensagens não lidas
router.get('/unread-messages', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Buscar todas as salas do usuário
    const rooms = await Room.find({
      'participants.user': req.user._id,
      isActive: true
    }).select('_id');

    const roomIds = rooms.map(room => room._id);

    // Para simplificar, vamos retornar 0 para todas as salas por enquanto
    // Isso evita o erro 500 e permite que a aplicação funcione
    // TODO: Implementar sistema de rastreamento de mensagens lidas
    const unreadMessages = roomIds.map(roomId => ({
      roomId: roomId.toString(),
      count: 0
    }));

    res.json({
      success: true,
      unreadMessages
    });
  } catch (error) {
    console.error('Erro ao buscar mensagens não lidas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
