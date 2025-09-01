import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Message from './models/Message.js';
import authRoutes from './routes/auth.js';
import friendRoutes from './routes/friends.js';
import roomRoutes from './routes/rooms.js';
import emailService from './services/emailService.js';

dotenv.config({ path: './.env' });

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: isProduction 
      ? [process.env.FRONTEND_URL, 'https://12-weeks.vercel.app'].filter(Boolean)
      : (process.env.FRONTEND_URL || "http://localhost:5173"),
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';



app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http://localhost:3001", "http://localhost:5173", "https://12-weeks.vercel.app"],
      fontSrc: ["'self'", "https:"],
      connectSrc: ["'self'", "https:", "http://localhost:3001", "https://one2weeks.onrender.com", "https://12-weeks.vercel.app"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" },
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
      'http://localhost:3000',
      'https://one2weeks.onrender.com',
      'https://12-weeks.vercel.app'
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
  

  req.realIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.use('/uploads', cors(corsOptions), (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  next();
}, express.static('uploads'));


app.get('/api/image/:folder/:filename', cors(corsOptions), (req, res) => {
  const { folder, filename } = req.params;
  const imagePath = path.join(process.cwd(), 'uploads', folder, filename);
  
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'image/*');
  
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'Imagem não encontrada' });
    }
  });
});


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

// Rota estática para imagens - deve vir depois das rotas da API
app.use('/api/image/profile-pictures', express.static(path.join(process.cwd(), 'uploads/profile-pictures')));

io.on('connection', (socket) => {
  console.log(`🔌 Usuário conectado: ${socket.id}`);

  socket.on('join_room', async (roomId) => {
    try {
      socket.join(roomId);
      console.log(`🚪 Usuário ${socket.id} entrou na sala ${roomId}`);


      const history = await Message.find({ room: roomId })
        .sort({ timestamp: 'asc' })
        .limit(50)
        .populate('author', 'username name profilePicture');
      
      socket.emit('load_history', history);

    } catch (error) {
      console.error('Erro ao entrar na sala ou carregar histórico:', error);
    }
  });

  socket.on('send_message', async (data) => {
    try {
      const newMessage = new Message({
        room: data.room,
        author: data.author._id,
        message: data.message,
      });
      await newMessage.save();

      const populatedMessage = await Message.findById(newMessage._id).populate('author', 'username name profilePicture');

      io.to(data.room).emit('receive_message', populatedMessage);
    } catch (error) {
      console.error('Erro ao salvar ou enviar mensagem:', error);
    }
  });

  // Nova funcionalidade: editar mensagem
  socket.on('edit_message', async (data) => {
    try {
      const { messageId, userId, newMessage } = data;
      const message = await Message.findById(messageId);
      
      if (!message) {
        socket.emit('edit_error', { message: 'Mensagem não encontrada' });
        return;
      }

      if (!message.canEdit(userId)) {
        socket.emit('edit_error', { message: 'Você não pode editar esta mensagem' });
        return;
      }

      message.message = newMessage;
      await message.markAsEdited();
      
      const updatedMessage = await Message.findById(messageId).populate('author', 'username name profilePicture');
      io.to(message.room.toString()).emit('message_updated', updatedMessage);
    } catch (error) {
      console.error('Erro ao editar mensagem:', error);
      socket.emit('edit_error', { message: 'Erro ao editar mensagem' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Usuário desconectado: ${socket.id}`);
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'API 12Weeks funcionando!' });
});


app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

httpServer.listen(PORT, () => {
  if (isProduction) {
    console.log(`🚀 Servidor rodando em produção na porta ${PORT}`);
    console.log(`🌐 URL pública: https://one2weeks.onrender.com`);
  } else {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  }
});
