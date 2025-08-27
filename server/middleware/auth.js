import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Token de acesso necessário',
        code: 'TOKEN_MISSING'
      });
    }

    // Verificar formato do token
    if (!/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token)) {
      return res.status(401).json({ 
        message: 'Formato de token inválido',
        code: 'TOKEN_INVALID_FORMAT'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: '12Weeks-API',
      audience: '12Weeks-Users'
    });

    // Validações adicionais
    if (!decoded.userId || !decoded.type || decoded.type !== 'access') {
      return res.status(401).json({ 
        message: 'Token malformado',
        code: 'TOKEN_MALFORMED'
      });
    }

    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Usuário não encontrado',
        code: 'USER_NOT_FOUND'
      });
    }

    // Verificar se o usuário está ativo
    if (user.deletedAt) {
      return res.status(401).json({ 
        message: 'Conta desativada',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }

    req.user = user;
    req.token = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Token inválido',
        code: 'TOKEN_INVALID'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expirado',
        code: 'TOKEN_EXPIRED'
      });
    }
    if (error.name === 'NotBeforeError') {
      return res.status(401).json({ 
        message: 'Token ainda não válido',
        code: 'TOKEN_NOT_ACTIVE'
      });
    }
    
    console.error('Erro na autenticação:', error);
    res.status(500).json({ 
      message: 'Erro interno na autenticação',
      code: 'AUTH_ERROR'
    });
  }
};
