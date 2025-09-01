import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const pendingUserSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres']
  },
  verificationCode: {
    type: String,
    required: true
  },
  verificationExpires: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 
  }
}, {
  timestamps: true
});


pendingUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


pendingUserSchema.methods.generateVerificationCode = function() {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); 
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 
  
  this.verificationCode = code;
  this.verificationExpires = expiresAt;
  
  return code;
};


pendingUserSchema.methods.verifyCode = function(code) {
  if (!this.verificationCode || !this.verificationExpires) {
    return { success: false, message: 'Nenhum código de verificação encontrado' };
  }
  
  if (Date.now() > this.verificationExpires.getTime()) {
    return { success: false, message: 'Código de verificação expirado' };
  }
  
  if (this.verificationCode !== code) {
    return { success: false, message: 'Código de verificação inválido' };
  }
  
  return { success: true, message: 'Código válido' };
};

export default mongoose.model('PendingUser', pendingUserSchema);

