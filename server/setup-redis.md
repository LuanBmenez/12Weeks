# Configuração do Redis para Cache

## Instalação do Redis

### Windows
1. Baixe o Redis para Windows: https://github.com/microsoftarchive/redis/releases
2. Extraia e execute `redis-server.exe`
3. Ou use Docker: `docker run -d -p 6379:6379 redis:alpine`

### macOS
```bash
# Usando Homebrew
brew install redis
brew services start redis

# Ou usando Docker
docker run -d -p 6379:6379 redis:alpine
```

### Linux (Ubuntu/Debian)
```bash
# Instalar Redis
sudo apt update
sudo apt install redis-server

# Iniciar Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Verificar status
sudo systemctl status redis-server
```

### Docker (Recomendado)
```bash
# Executar Redis em container
docker run -d --name redis-cache -p 6379:6379 redis:alpine

# Verificar se está rodando
docker ps

# Parar Redis
docker stop redis-cache

# Iniciar novamente
docker start redis-cache
```

## Configuração no Projeto

1. **Adicione a variável de ambiente** no arquivo `.env`:
```env
REDIS_URL=redis://localhost:6379
```

2. **Instale as dependências**:
```bash
cd server
npm install
```

3. **Inicie o servidor**:
```bash
npm run dev
```

## Verificação

O sistema irá mostrar no console:
- ✅ Redis conectado com sucesso (se Redis estiver rodando)
- ❌ Erro ao conectar com Redis (se Redis não estiver disponível)

**Nota**: O sistema funciona normalmente mesmo sem Redis - apenas sem cache.

## Comandos Úteis do Redis

```bash
# Conectar ao Redis CLI
redis-cli

# Ver todas as chaves
KEYS *

# Ver informações de memória
INFO memory

# Limpar todo o cache
FLUSHALL

# Ver estatísticas
INFO stats
```

## Monitoramento

O sistema de cache inclui:
- Logs de cache HIT/MISS
- Estatísticas de compressão de imagens
- Invalidação automática de cache
- Fallback gracioso se Redis não estiver disponível

## Performance

Com Redis configurado, você verá:
- ⚡ Respostas mais rápidas para dados frequentemente acessados
- 📦 Logs de "Cache HIT" para dados em cache
- 🗑️ Invalidação automática quando dados são atualizados
- 🖼️ Compressão automática de imagens (até 80% de redução)
