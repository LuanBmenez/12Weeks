import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member'
    }
  }],
  weeklyGoals: [{
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
  roomGoals: [{
    text: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
  roomDailyProgress: [{
    date: {
      type: Date,
      required: true
    },
    completedGoals: [{
      goalId: {
        type: mongoose.Schema.Types.ObjectId
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
  dailyProgress: [{
    date: {
      type: Date,
      required: true
    },
    completedGoals: [{
      goalId: {
        type: mongoose.Schema.Types.ObjectId
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


roomSchema.methods.calculateDailyCompletion = function(date) {
  const dailyProgress = this.dailyProgress.find(progress => 
    progress.date.toDateString() === date.toDateString()
  );
  
  if (dailyProgress && this.weeklyGoals.length > 0) {
    const completed = dailyProgress.completedGoals.filter(goal => goal.completed).length;
    dailyProgress.dailyPercentage = (completed / this.weeklyGoals.length) * 100;
  }
  
  return dailyProgress?.dailyPercentage || 0;
};


roomSchema.methods.calculateWeeklyProgress = function() {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  const weekProgress = this.dailyProgress.filter(progress => {
    const progressDate = new Date(progress.date);
    return progressDate >= weekStart && progressDate <= today;
  });
  
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


roomSchema.methods.checkWeekAdvance = function() {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  
  if (today.getDay() === 0 && this.weeklyProgress.currentWeek < 12) {
    const lastWeekProgress = this.dailyProgress.filter(progress => {
      const progressDate = new Date(progress.date);
      return progressDate >= weekStart && progressDate <= today;
    });
    
    if (lastWeekProgress.length >= 7) {
      this.weeklyProgress.currentWeek += 1;
      return true;
    }
  }
  
  return false;
};


roomSchema.methods.calculateRoomGoalProgress = function(date) {
  const todayStr = date.toDateString();
  let roomProgressEntry = this.roomDailyProgress.find(progress => 
    progress.date.toDateString() === todayStr
  );
  
  if (!roomProgressEntry) {
    roomProgressEntry = {
      date: date,
      completedGoals: [],
      dailyPercentage: 0
    };
    this.roomDailyProgress.push(roomProgressEntry);
  }
  
  const activeRoomGoals = this.roomGoals.filter(goal => goal.isActive);
  if (activeRoomGoals.length === 0) return 0;
  
  
  const participants = this.participants;
  let totalCompletions = 0;
  let totalPossibleCompletions = activeRoomGoals.length * participants.length;
  
  activeRoomGoals.forEach(goal => {
    participants.forEach(participant => {
      const completion = roomProgressEntry.completedGoals.find(
        cg => cg.goalId.toString() === goal._id.toString() && 
             cg.userId.toString() === participant.user.toString()
      );
      
      if (completion && completion.completed) {
        totalCompletions++;
      }
    });
  });
  
  const percentage = totalPossibleCompletions > 0 ? (totalCompletions / totalPossibleCompletions) * 100 : 0;
  roomProgressEntry.dailyPercentage = percentage;
  
  return percentage;
};


roomSchema.methods.toggleRoomGoalForUser = function(goalId, userId, completed, date) {
  const todayStr = date.toDateString();
  let roomProgressEntry = this.roomDailyProgress.find(progress => 
    progress.date.toDateString() === todayStr
  );
  
  if (!roomProgressEntry) {
    roomProgressEntry = {
      date: date,
      completedGoals: [],
      dailyPercentage: 0
    };
    this.roomDailyProgress.push(roomProgressEntry);
  }
  
  
  let goalCompletion = roomProgressEntry.completedGoals.find(
    cg => cg.goalId.toString() === goalId.toString() && 
         cg.userId.toString() === userId.toString()
  );
  
  if (goalCompletion) {
    goalCompletion.completed = completed;
  } else {
    roomProgressEntry.completedGoals.push({
      goalId: goalId,
      userId: userId,
      completed: completed
    });
  }
  
  
  this.calculateRoomGoalProgress(date);
  
  return roomProgressEntry;
};

export default mongoose.model('Room', roomSchema);

