# 12Weeks - Sistema de Metas de 12 Semanas

Uma plataforma colaborativa para definir, acompanhar e completar metas ao longo de 12 semanas, inspirada na metodologia de "12 Week Year". Conecte-se com amigos, crie salas colaborativas e mantenha-se motivado em sua jornada de crescimento pessoal.

## 🚀 Funcionalidades Principais

### 🎯 Sistema de Metas de 12 Semanas
- **Salas colaborativas**: Crie ou participe de salas com até 5 metas semanais
- **Acompanhamento diário**: Marque suas metas como completas todos os dias
- **Progresso semanal**: Visualize seu desempenho da semana atual
- **Progresso geral**: Acompanhe seu progresso ao longo das 12 semanas
- **Feedback inteligente**: Sistema sugere ajustes baseado no seu desempenho

### 👥 Sistema Social
- **Código de amigo**: Cada usuário possui um código único de 8 caracteres
- **Convites por código**: Adicione amigos usando seus códigos únicos
- **Lista de amigos**: Gerencie suas conexões e veja quem está online
- **Convites para salas**: Convide amigos para participar das suas salas
- **Progresso compartilhado**: Veja o progresso dos participantes da sala

### 🔐 Autenticação e Segurança
- **Registro e login** seguros
- **JWT** para autenticação
- **Senhas criptografadas** com bcrypt
- **Middleware de proteção** de rotas
- **Rate limiting** para prevenir abuso

## 🛠️ Tecnologias

### Backend
- **Node.js** com Express.js
- **MongoDB** com Mongoose ODM
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **express-validator** para validação
- **helmet** para segurança HTTP
- **cors** para controle de acesso

### Frontend
- **React 19** com hooks modernos
- **React Router Dom** para navegação
- **Styled Components** para estilização
- **Axios** para requisições HTTP
- **Lucide React** para ícones
- **Context API** para gerenciamento de estado

### Ferramentas de Desenvolvimento
- **Vite** para build e desenvolvimento
- **ESLint** para linting
- **Nodemon** para desenvolvimento do backend

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **MongoDB** (local ou Atlas)
- **npm** ou **yarn**

## ⚙️ Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd 12Weeks
```

### 2. Instale as dependências do frontend
```bash
npm install
```

### 3. Instale as dependências do backend
```bash
cd server
npm install
cd ..
```

### 4. Configure as variáveis de ambiente
Crie um arquivo `.env` na pasta `server/` baseado no `env.example`:

```env
PORT=3001
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb:

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui_123456789

# Frontend
FRONTEND_URL=
```

### 5. Inicie o MongoDB
```bash
# Se usando MongoDB local
mongod

# Ou configure MongoDB Atlas e use a string de conexão no .env
```

### 6. Inicie o servidor backend
```bash
cd server
npm run dev
```

### 7. Inicie o frontend
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🎮 Como Usar

### Para Usuários

1. **Crie sua conta** na tela de registro
2. **Faça login** com suas credenciais
3. **Acesse o Dashboard** para ver suas opções
4. **Crie uma sala** para suas metas de 12 semanas
5. **Defina suas metas** semanais (até 5 por semana)
6. **Marque diariamente** suas metas como completas
7. **Convide amigos** usando seus códigos únicos
8. **Acompanhe o progresso** individual e da sala

### Fluxo das Metas

1. **Semana 1**: Defina suas 5 metas para a semana
2. **Dias 1-7**: Marque as metas completas diariamente
3. **Final da semana**: Receba feedback sobre seu desempenho
4. **Semana 2**: Continue com as mesmas metas ou ajuste conforme necessário
5. **Repita por 12 semanas** para completar o ciclo

## 🏗️ Arquitetura

### Estrutura do Backend
```
server/
├── models/
│   ├── User.js          # Usuários com sistema de amizades
│   └── Room.js          # Salas com metas e progresso
├── routes/
│   ├── auth.js          # Autenticação (login, registro)
│   ├── friends.js       # Gerenciamento de amizades
│   └── rooms.js         # Gerenciamento de salas e metas
├── middleware/
│   └── auth.js          # Middleware de autenticação JWT
└── index.js             # Servidor principal
```

### Estrutura do Frontend
```
src/
├── components/
│   ├── DashboardHeader/     # Cabeçalho do dashboard
│   ├── CreateRoomModal/     # Modal para criar salas
│   ├── FriendInviteModal/   # Modal para gerenciar amigos
│   ├── QuickActions/        # Ações rápidas no dashboard
│   ├── RecentActivity/      # Atividade recente
│   ├── RoomCard/           # Card de sala
│   ├── RoomsList/          # Lista de salas
│   ├── Toast/              # Sistema de notificações
│   └── ProtectedRoute/     # Proteção de rotas
├── pages/
│   ├── LoginScreen/        # Tela de login
│   ├── RegisterScreen/     # Tela de registro
│   ├── Dashboard/          # Dashboard principal
│   ├── MyRooms/           # Minhas salas
│   └── Room/              # Sala individual
├── hooks/
│   ├── useAuth.js         # Hook de autenticação
│   ├── useRooms.js        # Hook para salas
│   ├── useFriends.js      # Hook para amigos
│   └── useNotifications.js # Hook para notificações
├── contexts/
│   └── AuthContext.jsx    # Contexto de autenticação
└── config/
    └── api.js             # Configuração da API
```

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Obter perfil do usuário logado
- `POST /api/auth/logout` - Fazer logout

### Amizades
- `GET /api/friends/my-code` - Obter meu código de amigo
- `GET /api/friends/search/:friendCode` - Buscar usuário por código
- `POST /api/friends/request` - Enviar solicitação de amizade
- `POST /api/friends/respond` - Responder solicitação de amizade
- `GET /api/friends/requests` - Listar solicitações pendentes
- `GET /api/friends/list` - Listar meus amigos

### Salas e Metas
- `POST /api/rooms/create` - Criar nova sala
- `GET /api/rooms/my-rooms` - Listar minhas salas
- `GET /api/rooms/:roomId` - Obter detalhes de uma sala
- `PUT /api/rooms/:roomId` - Editar sala (apenas admin)
- `POST /api/rooms/:roomId/weekly-goals` - Definir metas semanais
- `PUT /api/rooms/:roomId/daily-progress/:goalId` - Atualizar progresso diário
- `POST /api/rooms/:roomId/invite` - Convidar usuário para sala

## 🧮 Sistema de Cálculo de Progresso

### Progresso Diário
- **Calculado**: (Metas completas / Total de metas) × 100
- **Atualizado**: Em tempo real quando metas são marcadas
- **Armazenado**: Para cada dia individualmente

### Progresso Semanal
- **Calculado**: Média dos progressos diários da semana
- **Período**: Domingo a sábado
- **Reset**: Automático no início de cada semana

### Progresso Geral (12 Semanas)
- **Calculado**: Média de todas as semanas completadas
- **Usado para**: Feedback e sugestões de ajuste
- **Categorias**: 
  - < 80%: Metas muito difíceis
  - 80-90%: Nível adequado
  - > 90%: Metas muito fáceis

## 🎯 Características do Sistema

### Códigos de Amigo
- **Formato**: 8 caracteres alfanuméricos (ex: A1B2C3D4)
- **Únicos**: Cada usuário tem um código exclusivo
- **Geração**: Automática no registro
- **Case-insensitive**: Busca funciona com maiúsculas/minúsculas

### Feedback Inteligente
- **Fins de semana**: Sistema analisa progresso da semana
- **Sugestões automáticas**: Baseadas no desempenho
- **Ajuste de metas**: Recomenda aumentar/diminuir dificuldade

### Sistema de Salas
- **Roles**: Admin (criador) e Member (convidado)
- **Limite**: 5 metas por semana
- **Persistência**: Metas continuam automaticamente
- **Colaborativo**: Veja progresso de todos os participantes

## 🔐 Segurança

- **Senhas criptografadas** com bcrypt (salt rounds: 12)
- **JWT** com expiração configurável
- **Validação** rigorosa de dados de entrada
- **Rate limiting** (100 requisições por 15 minutos)
- **Headers de segurança** com Helmet
- **CORS** configurado para frontend específico
- **Proteção de rotas** com middleware de autenticação

## 🎨 Interface e UX

- **Design responsivo** para desktop e mobile
- **Estados de loading** em todas as operações
- **Sistema de Toast** para feedback ao usuário
- **Navegação intuitiva** com React Router
- **Animações suaves** com Styled Components
- **Temas consistentes** em toda a aplicação

## 🧪 Testando o Sistema

### Teste Básico
1. **Registre duas contas** diferentes
2. **Anote o código de amigo** de uma conta
3. **Use o código** na outra conta para adicionar amigo
4. **Crie uma sala** e defina metas
5. **Convide o amigo** para a sala
6. **Marque metas** como completas
7. **Observe o progresso** em tempo real

### Teste de 12 Semanas (Simulado)
1. **Crie uma sala** com metas realistas
2. **Marque metas diariamente** por uma semana
3. **Observe o feedback** no final de semana
4. **Ajuste as metas** conforme sugerido
5. **Continue o ciclo** por 12 semanas

## 🚀 Deploy

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy da pasta dist/
```

### Backend (Railway/Heroku)
```bash
# Configure as variáveis de ambiente
# Deploy da pasta server/
```

### MongoDB Atlas
- Configure cluster na nuvem
- Atualize MONGODB_URI no .env

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

## 📝 Roadmap

- [ ] **Sistema de notificações** push
- [ ] **Relatórios** de progresso detalhados
- [ ] **Gamificação** com badges e conquistas
- [ ] **Integração** com calendário
- [ ] **App mobile** nativo
- [ ] **Backup** e exportação de dados

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para ajudar você a alcançar suas metas em 12 semanas!**
