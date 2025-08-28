import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import PendingUser from '../models/PendingUser.js';
import { auth } from '../middleware/auth.js';
import emailService from '../services/emailService.js';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/profile-pictures';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, req.user._id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
  }
});


const customEmailValidation = (value) => {
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(value)) {
    throw new Error('Formato de email inválido');
  }
  
 
  const domain = value.split('@')[1];
  if (!domain || domain.split('.').length < 2 || domain.split('.')[1].length < 2) {
    throw new Error('Domínio de email inválido');
  }
  
  
  if (/[<>()[\]\\,;:\s"]/.test(value)) {
    throw new Error('Email contém caracteres inválidos');
  }
  
  return true;
};

const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nome deve ter entre 2 e 50 caracteres'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Nome de usuário deve ter entre 3 e 30 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Nome de usuário pode conter apenas letras, números e underscores'),
  body('email')
    .trim()
    .toLowerCase()
    .custom(customEmailValidation)
    .normalizeEmail()
    .withMessage('Email inválido')
    .isLength({ min: 5, max: 254 })
    .withMessage('Email deve ter entre 5 e 254 caracteres'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
];

const loginValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .custom(customEmailValidation)
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('password')
    .notEmpty()
    .withMessage('Senha é obrigatória')
];

const resetPasswordValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .custom(customEmailValidation)
    .normalizeEmail()
    .withMessage('Email inválido')
];

const newPasswordValidation = [
  body('token')
    .notEmpty()
    .withMessage('Token é obrigatório'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Nova senha deve ter pelo menos 6 caracteres')
];


router.post('/register', registerValidation, async (req, res) => {
  try {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos',
        errors: errors.array() 
      });
    }

    const { name, email, password, username } = req.body;

    
    // Verificar se usuário já existe (incluindo pendentes)
    const [existingUser, existingPendingUser] = await Promise.all([
      User.findOne({ $or: [{ email }, { username }] }),
      PendingUser.findOne({ $or: [{ email }, { username }] })
    ]);

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }
      return res.status(400).json({ message: 'Nome de usuário já está em uso' });
    }

    if (existingPendingUser) {
      if (existingPendingUser.email === email) {
        return res.status(400).json({ message: 'Email já tem registro pendente. Verifique seu email.' });
      }
      return res.status(400).json({ message: 'Nome de usuário já tem registro pendente' });
    }

    // Criar usuário pendente (não criar conta ainda)
    const pendingUser = new PendingUser({ name, email, password, username });
    const verificationCode = pendingUser.generateVerificationCode();
    await pendingUser.save();

    // Enviar email de verificação
    const emailResult = await emailService.sendEmailVerification(
      pendingUser.email,
      verificationCode,
      pendingUser.name,
      false // não é mudança de email
    );

    if (!emailResult.success) {
      console.error('Erro ao enviar email de verificação:', emailResult.error);
      return res.status(500).json({ message: 'Erro ao enviar email de verificação. Tente novamente.' });
    }

    res.status(201).json({
      message: 'Código de verificação enviado! Verifique seu email para criar a conta.',
      requiresEmailVerification: true,
      email: pendingUser.email,
      tempUserId: pendingUser._id
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.post('/login', loginValidation, async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos',
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }


    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }


    user.lastLogin = new Date();
    await user.save();


    const token = jwt.sign(
      { 
        userId: user._id,
        type: 'access',
        iat: Math.floor(Date.now() / 1000)
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: process.env.NODE_ENV === 'production' ? '1d' : '7d',
        issuer: '12Weeks-API',
        audience: '12Weeks-Users'
      }
    );

    res.json({
      message: 'Login realizado com sucesso',
      user: user.toJSON(),
      token
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: req.user.toJSON()
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.post('/logout', auth, async (req, res) => {
  try {
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.post('/forgot-password', resetPasswordValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos',
        errors: errors.array() 
      });
    }

    const { email } = req.body;
    
    
    const user = await User.findOne({ email });
    if (!user) {
      
      return res.json({ 
        message: 'Se o email estiver cadastrado, você receberá instruções de recuperação' 
      });
    }

    
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); 

    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    
    const emailResult = await emailService.sendPasswordResetEmail(
      user.email, 
      resetToken, 
      user.name
    );

    if (emailResult.success) {
      res.json({ 
        message: 'Instruções de recuperação enviadas para seu email. Verifique sua caixa de entrada e pasta de spam.' 
      });
    } else {
      
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      
      console.error('Erro no envio do email:', emailResult.error);
      res.status(500).json({ 
        message: 'Erro ao enviar email. Tente novamente em alguns minutos.' 
      });
    }

  } catch (error) {
    console.error('Erro na recuperação de senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.get('/verify-reset-token/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Token inválido ou expirado' 
      });
    }

    res.json({ 
      message: 'Token válido',
      email: user.email 
    });

  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.get('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Token inválido ou expirado' 
      });
    }

    res.json({ 
      message: 'Token válido',
      email: user.email 
    });

  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.post('/reset-password', newPasswordValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos',
        errors: errors.array() 
      });
    }

    const { token, password } = req.body;
    
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Token inválido ou expirado' 
      });
    }

    
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ 
      message: 'Senha redefinida com sucesso' 
    });

  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.post('/upload-profile-picture', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem foi enviada' });
    }

    
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const profilePictureUrl = `${baseUrl}/api/image/profile-pictures/${req.file.filename}`;

    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture: profilePictureUrl },
      { new: true }
    ).select('-password -resetPasswordToken -resetPasswordExpires');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      message: 'Foto do perfil atualizada com sucesso',
      profilePicture: profilePictureUrl,
      user: user
    });

  } catch (error) {
    console.error('Erro no upload da foto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Atualizar dados do perfil (com limite semanal)
router.put('/update-profile', auth, async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se pode editar (limite semanal)
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    if (user.lastProfileEdit && user.lastProfileEdit > oneWeekAgo) {
      const timeLeft = new Date(user.lastProfileEdit.getTime() + 7 * 24 * 60 * 60 * 1000);
      const daysLeft = Math.ceil((timeLeft - now) / (24 * 60 * 60 * 1000));
      
      return res.status(400).json({ 
        message: 'Limite de edição atingido',
        daysLeft,
        nextEditDate: timeLeft
      });
    }

    // Validar username único se foi alterado
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Nome de usuário já existe' });
      }
    }

    // Validar email único se foi alterado
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }
    }

    // Atualizar dados
    const updateData = {};
    if (name && name !== user.name) updateData.name = name;
    if (username && username !== user.username) updateData.username = username;
    
    let emailChangeRequired = false;
    if (email && email !== user.email) {
      // Para mudança de email, armazenar como pendente
      updateData.pendingEmail = email;
      updateData.isEmailVerified = false;
      emailChangeRequired = true;
    }
    
    // Se houve alterações, atualizar timestamp
    if (Object.keys(updateData).length > 0) {
      updateData.lastProfileEdit = now;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    // Se há mudança de email, enviar código de verificação
    if (emailChangeRequired) {
      const verificationCode = updatedUser.generateEmailVerificationCode();
      await updatedUser.save();

      const emailResult = await emailService.sendEmailVerification(
        email, // enviar para o novo email
        verificationCode,
        updatedUser.name,
        true // é mudança de email
      );

      if (!emailResult.success) {
        console.error('Erro ao enviar email de verificação:', emailResult.error);
      }

      return res.json({
        message: 'Dados atualizados! Verifique seu novo email para confirmar a mudança.',
        user: updatedUser,
        requiresEmailVerification: true,
        pendingEmail: email
      });
    }

    res.json({
      message: 'Perfil atualizado com sucesso',
      user: updatedUser
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Dados inválidos',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// Verificar código de email e criar conta
router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email e código são obrigatórios' });
    }

    // Buscar usuário pendente
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return res.status(404).json({ message: 'Registro pendente não encontrado' });
    }

    const verification = pendingUser.verifyCode(code);
    if (!verification.success) {
      return res.status(400).json({ message: verification.message });
    }

    // Verificar se já não existe usuário com esse email/username
    const existingUser = await User.findOne({
      $or: [{ email: pendingUser.email }, { username: pendingUser.username }]
    });

    if (existingUser) {
      await PendingUser.findByIdAndDelete(pendingUser._id);
      return res.status(400).json({ message: 'Email ou username já cadastrado' });
    }

    // Criar conta real
    const user = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password, // já está hasheada
      username: pendingUser.username,
      isEmailVerified: true
    });

    await user.save();

    // Remover registro pendente
    await PendingUser.findByIdAndDelete(pendingUser._id);

    // Gerar token de acesso
    const token = jwt.sign(
      { 
        userId: user._id,
        type: 'access',
        iat: Math.floor(Date.now() / 1000)
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: process.env.NODE_ENV === 'production' ? '1d' : '7d',
        issuer: '12Weeks-API',
        audience: '12Weeks-Users'
      }
    );

    res.json({
      message: 'Conta criada com sucesso! Bem-vindo ao 12Weeks!',
      user: user.toJSON(),
      token
    });

  } catch (error) {
    console.error('Erro na verificação de email:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Reenviar código de verificação
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório' });
    }

    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return res.status(404).json({ message: 'Registro pendente não encontrado' });
    }

    // Gerar novo código
    const verificationCode = pendingUser.generateVerificationCode();
    await pendingUser.save();

    // Enviar email
    const emailResult = await emailService.sendEmailVerification(
      pendingUser.email,
      verificationCode,
      pendingUser.name,
      false
    );

    if (!emailResult.success) {
      return res.status(500).json({ message: 'Erro ao enviar email. Tente novamente.' });
    }

    res.json({
      message: 'Código de verificação reenviado com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao reenviar verificação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Verificar mudança de email
router.post('/verify-email-change', auth, async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;

    if (!code) {
      return res.status(400).json({ message: 'Código é obrigatório' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const verification = user.verifyEmailCode(code);
    if (!verification.success) {
      return res.status(400).json({ message: verification.message });
    }

    // Aplicar mudança de email
    if (user.pendingEmail) {
      user.email = user.pendingEmail;
      user.pendingEmail = null;
      user.isEmailVerified = true;
    }
    
    user.emailVerificationCode = null;
    user.emailVerificationExpires = null;
    await user.save();

    res.json({
      message: 'Email atualizado com sucesso!',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Erro na verificação de mudança de email:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

export default router;
