import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
    maxlength: [50, 'Nome deve ter no máximo 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  profilePicture: {
    type: String,
    default: null,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres']
  },
  friendCode: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      return this.generateFriendCode();
    }
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  friendRequests: [{
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  notifications: [{
    type: {
      type: String,
      enum: ['friend_request', 'friend_accepted', 'friend_rejected', 'friend_removed'],
      required: true
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Metas individuais do usuário
  individualGoals: [{
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  // Progresso diário individual
  dailyProgress: [{
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    completedGoals: [{
      goalId: {
        type: mongoose.Schema.Types.ObjectId
      },
      completed: {
        type: Boolean,
        default: false
      }
    }],
    dailyPercentage: {
      type: Number,
      default: 0
    }
  }],
  // Progresso semanal individual
  weeklyProgress: {
    currentWeek: {
      type: Number,
      default: 1
    },
    totalWeeks: {
      type: Number,
      default: 12
    },
    weeklyPercentages: [{
      week: Number,
      percentage: Number,
      date: Date
    }],
    overallPercentage: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Método para gerar código de amigo único
userSchema.methods.generateFriendCode = function() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

// Middleware para hash de senha e geração de código de amigo
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') && !this.isNew) return next();
  
  try {
    // Hash da senha
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    }
    
    // Geração de código de amigo único
    if (this.isNew || this.isModified('friendCode')) {
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 10;
      
      while (!isUnique && attempts < maxAttempts) {
        this.friendCode = this.generateFriendCode();
        const existingUser = await mongoose.model('User').findOne({ friendCode: this.friendCode });
        if (!existingUser) {
          isUnique = true;
        }
        attempts++;
      }
      
      if (!isUnique) {
        throw new Error('Não foi possível gerar um código único de amigo');
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Método para remover senha do JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Método para calcular progresso diário individual
userSchema.methods.calculateDailyCompletion = function(roomId, date) {
  const dailyProgress = this.dailyProgress.find(progress => 
    progress.roomId.toString() === roomId.toString() &&
    progress.date.toDateString() === date.toDateString()
  );
  
  if (dailyProgress) {
    const roomGoals = this.individualGoals.filter(goal => 
      goal.roomId.toString() === roomId.toString() && goal.isActive
    );
    
    if (roomGoals.length > 0) {
      const completed = dailyProgress.completedGoals.filter(goal => goal.completed).length;
      dailyProgress.dailyPercentage = (completed / roomGoals.length) * 100;
    }
  }
  
  return dailyProgress?.dailyPercentage || 0;
};

// Método para calcular progresso semanal individual
userSchema.methods.calculateWeeklyProgress = function(roomId) {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  const weekProgress = this.dailyProgress.filter(progress => 
    progress.roomId.toString() === roomId.toString() &&
    progress.date >= weekStart && 
    progress.date <= today
  );
  
  if (weekProgress.length > 0) {
    const totalPercentage = weekProgress.reduce((sum, progress) => sum + progress.dailyPercentage, 0);
    const weeklyPercentage = totalPercentage / weekProgress.length;
    
    const existingWeekIndex = this.weeklyProgress.weeklyPercentages.findIndex(
      wp => wp.week === this.weeklyProgress.currentWeek
    );
    
    if (existingWeekIndex >= 0) {
      this.weeklyProgress.weeklyPercentages[existingWeekIndex].percentage = weeklyPercentage;
      this.weeklyProgress.weeklyPercentages[existingWeekIndex].date = today;
    } else {
      this.weeklyProgress.weeklyPercentages.push({
        week: this.weeklyProgress.currentWeek,
        percentage: weeklyPercentage,
        date: today
      });
    }
    
    if (this.weeklyProgress.weeklyPercentages.length > 0) {
      const totalOverall = this.weeklyProgress.weeklyPercentages.reduce((sum, wp) => sum + wp.percentage, 0);
      this.weeklyProgress.overallPercentage = totalOverall / this.weeklyProgress.weeklyPercentages.length;
    }
    
    return weeklyPercentage;
  }
  
  return 0;
};

// Método para verificar avanço de semana individual
userSchema.methods.checkWeekAdvance = function(roomId) {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  if (today.getDay() === 0 && this.weeklyProgress.currentWeek < 12) {
    const lastWeekProgress = this.dailyProgress.filter(progress => 
      progress.roomId.toString() === roomId.toString() &&
      progress.date >= weekStart && 
      progress.date <= today
    );
    
    if (lastWeekProgress.length >= 7) {
      this.weeklyProgress.currentWeek += 1;
      return true;
    }
  }
  
  return false;
};

export default mongoose.model('User', userSchema);
