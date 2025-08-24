# 12Weeks - Sistema de Código de Amigo

Um sistema completo de gerenciamento de amizades usando códigos únicos para cada usuário.

## 🚀 Funcionalidades

### Sistema de Código de Amigo
- **Código único**: Cada usuário recebe automaticamente um código de 8 caracteres
- **Busca por código**: Encontre amigos digitando seu código único
- **Solicitações de amizade**: Sistema completo de envio e resposta
- **Gerenciamento de amigos**: Lista de amigos e solicitações pendentes
- **Compartilhamento**: Copie e compartilhe seu código facilmente

### Autenticação
- Registro e login de usuários
- JWT para autenticação segura
- Middleware de proteção de rotas

## 🛠️ Tecnologias

### Backend
- **Node.js** com Express
- **MongoDB** com Mongoose
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **express-validator** para validação

### Frontend
- **React** com hooks personalizados
- **Styled Components** para estilização
- **Axios** para requisições HTTP
- **Lucide React** para ícones

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB rodando localmente
- npm ou yarn

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
MONGODB_URI=mongodb://localhost:27017/12weeks
JWT_SECRET=sua_chave_secreta_muito_segura_aqui_123456789
FRONTEND_URL=http://localhost:5173
```

### 5. Inicie o MongoDB
Certifique-se de que o MongoDB está rodando na porta padrão (27017).

### 6. Inicie o servidor backend
```bash
cd server
npm run dev
```

### 7. Inicie o frontend
```bash
npm run dev
```

## 🔧 Como Usar

### Para Usuários

1. **Registre-se** na plataforma
2. **Faça login** com suas credenciais
3. **Clique em "Convidar Amigo"** no Dashboard
4. **Compartilhe seu código** com amigos
5. **Busque amigos** pelo código deles
6. **Gerencie solicitações** de amizade

### Para Desenvolvedores

#### Estrutura do Backend
```
server/
├── models/
│   └── User.js          # Modelo de usuário com sistema de amizade
├── routes/
│   ├── auth.js          # Rotas de autenticação
│   └── friends.js       # Rotas de gerenciamento de amizades
├── middleware/
│   └── auth.js          # Middleware de autenticação JWT
└── index.js             # Servidor principal
```

#### Estrutura do Frontend
```
src/
├── components/
│   ├── FriendInviteModal/    # Modal completo de gerenciamento
│   └── QuickActions/         # Botões de ação rápida
├── hooks/
│   └── useFriends.js         # Hook personalizado para amizades
└── config/
    └── api.js               # Configuração da API com axios
```

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Obter perfil do usuário
- `POST /api/auth/logout` - Fazer logout

### Amizades
- `GET /api/friends/my-code` - Obter código de amigo
- `GET /api/friends/search/:friendCode` - Buscar usuário por código
- `POST /api/friends/request` - Enviar solicitação de amizade
- `POST /api/friends/respond` - Responder a solicitação
- `GET /api/friends/requests` - Listar solicitações pendentes
- `GET /api/friends/list` - Listar amigos

## 🔐 Segurança

- **Senhas hasheadas** com bcrypt
- **JWT** para autenticação
- **Validação** de dados com express-validator
- **Rate limiting** para prevenir abuso
- **Helmet** para headers de segurança
- **CORS** configurado adequadamente

## 🎯 Características do Código de Amigo

- **8 caracteres** alfanuméricos
- **Único** para cada usuário
- **Gerado automaticamente** na criação da conta
- **Formato**: A1B2C3D4 (exemplo)
- **Case insensitive** na busca

## 🚨 Tratamento de Erros

- **Validação** de dados de entrada
- **Mensagens de erro** claras e em português
- **Logs** detalhados no servidor
- **Fallbacks** para situações inesperadas

## 🔄 Fluxo de Amizade

1. **Usuário A** compartilha seu código
2. **Usuário B** digita o código no sistema
3. **Sistema** valida e busca o usuário
4. **Usuário B** envia solicitação de amizade
5. **Usuário A** recebe e responde à solicitação
6. **Amizade** é estabelecida ou rejeitada

## 🎨 Interface

- **Design responsivo** e moderno
- **Tabs organizadas** para diferentes funcionalidades
- **Feedback visual** para todas as ações
- **Estados de loading** e erro
- **Animações suaves** com CSS

## 🧪 Testando

1. **Crie duas contas** diferentes
2. **Copie o código** de uma conta
3. **Use o código** na outra conta para buscar
4. **Envie uma solicitação** de amizade
5. **Aceite a solicitação** na primeira conta
6. **Verifique** se aparecem na lista de amigos

## 📝 Notas de Desenvolvimento

- **Código limpo** e bem documentado
- **Hooks personalizados** para lógica reutilizável
- **Componentes modulares** e reutilizáveis
- **Estados gerenciados** com React hooks
- **API RESTful** seguindo boas práticas

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para facilitar conexões entre usuários!**
