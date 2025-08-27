
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import friendRoutes from './routes/friends.js';
import roomRoutes from './routes/rooms.js';
import emailService from './services/emailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;



app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:"],
      connectSrc: ["'self'", "https:"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    },
  },
  hsts: {
    maxAge: 31536000, 
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'deny' },
  xssFilter: true,
  hidePoweredBy: true
}));

const corsOptions = {
  origin: function (origin, callback) {
   
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://localhost:3000'
    ].filter(Boolean);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin não permitida pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400 
};

app.use(cors(corsOptions));



const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1000, 
  message: {
    error: 'Muitas requisições. Tente novamente em alguns segundos.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, 
  skipFailedRequests: false
});


app.use('/api', limiter);



app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  
  // Adicionar IP real para rate limiting (sem modificar req.ip)
  req.realIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/12weeks')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));


if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
  emailService.testConnection()
    .then(success => {
      if (success) {
        console.log('✅ Serviço de email configurado e funcionando');
      } else {
        console.log('⚠️ Serviço de email com problemas - verifique as configurações');
      }
    })
    .catch(err => {
      console.log('⚠️ Erro ao testar serviço de email:', err.message);
    });
} else {
  console.log('⚠️ Serviço de email não configurado - configure EMAIL_USER e EMAIL_APP_PASSWORD');
}


app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/rooms', roomRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API 12Weeks funcionando!' });
});


app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
