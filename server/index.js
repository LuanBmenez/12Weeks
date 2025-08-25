
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import friendRoutes from './routes/friends.js';
import roomRoutes from './routes/rooms.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/12weeks')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));


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
