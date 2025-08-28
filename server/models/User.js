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
  username: {
    type: String,
    required: [true, 'Nome de usuário é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Nome de usuário deve ter pelo menos 3 caracteres'],
    maxlength: [30, 'Nome de usuário deve ter no máximo 30 caracteres'],
    match: [/^[a-zA-Z0-9_]+$/, 'Nome de usuário pode conter apenas letras, números e underscores']
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
  lastProfileEdit: {
    type: Date,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationCode: {
    type: String,
    default: null
  },
  emailVerificationExpires: {
    type: Date,
    default: null
  },
  pendingEmail: {
    type: String,
    default: null
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
  },
  resetPasswordToken: {
    type: String,
    default: undefined
  },
  resetPasswordExpires: {
    type: Date,
    default: undefined
  }
}, {
  timestamps: true
});


userSchema.methods.generateFriendCode = function() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

// Método para gerar código de verificação de email
userSchema.methods.generateEmailVerificationCode = function() {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
  
  this.emailVerificationCode = code;
  this.emailVerificationExpires = expiresAt;
  
  return code;
};

// Método para verificar código de email
userSchema.methods.verifyEmailCode = function(code) {
  if (!this.emailVerificationCode || !this.emailVerificationExpires) {
    return { success: false, message: 'Nenhum código de verificação encontrado' };
  }
  
  if (Date.now() > this.emailVerificationExpires.getTime()) {
    return { success: false, message: 'Código de verificação expirado' };
  }
  
  if (this.emailVerificationCode !== code) {
    return { success: false, message: 'Código de verificação inválido' };
  }
  
  return { success: true, message: 'Código válido' };
};


userSchema.pre('save', async function(next) {
  if (!this.isModified('password') && !this.isNew) return next();
  
  try {
    
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    }
    
    
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


userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};


userSchema.methods.calculateDailyCompletion = function(roomId, date, roomData = null) {
  const dailyProgress = this.dailyProgress.find(progress => 
    progress.roomId.toString() === roomId.toString() &&
    progress.date.toDateString() === date.toDateString()
  );
  
  if (dailyProgress) {
    
    const individualGoals = this.individualGoals.filter(goal => 
      goal.roomId.toString() === roomId.toString() && goal.isActive
    );
    
    const completedIndividualGoals = dailyProgress.completedGoals.filter(goal => goal.completed).length;
    
    
    let completedRoomGoals = 0;
    let totalRoomGoals = 0;
    
    if (roomData && roomData.roomGoals) {
      const activeRoomGoals = roomData.roomGoals.filter(goal => goal.isActive);
      totalRoomGoals = activeRoomGoals.length;
      
      const roomTodayProgress = roomData.roomDailyProgress?.find(progress => 
        progress.date.toDateString() === date.toDateString()
      );
      
      if (roomTodayProgress) {
        completedRoomGoals = roomTodayProgress.completedGoals.filter(
          cg => cg.userId.toString() === this._id.toString() && cg.completed
        ).length;
      }
    }
    
    
    const totalGoals = individualGoals.length + totalRoomGoals;
    const totalCompleted = completedIndividualGoals + completedRoomGoals;
    
    if (totalGoals > 0) {
      dailyProgress.dailyPercentage = (totalCompleted / totalGoals) * 100;
    } else {
      dailyProgress.dailyPercentage = 0;
    }
  }
  
  return dailyProgress?.dailyPercentage || 0;
};


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
