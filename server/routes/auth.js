import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import emailService from '../services/emailService.js';

const router = express.Router();


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

    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

   
    const user = new User({ name, email, password });
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

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: user.toJSON(),
      token
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

export default router;
