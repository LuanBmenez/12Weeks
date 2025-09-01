import cacheService from '../services/cacheService.js';

/**
 * Middleware de cache para rotas GET
 * @param {number} ttlSeconds - Tempo de vida do cache em segundos
 * @param {function} keyGenerator - Função para gerar chave única do cache
 */
export const cacheMiddleware = (ttlSeconds = 300, keyGenerator = null) => {
  return async (req, res, next) => {
    // Só aplica cache em requisições GET
    if (req.method !== 'GET') {
      return next();
    }

    // Gera chave única para o cache
    const cacheKey = keyGenerator 
      ? keyGenerator(req) 
      : `cache:${req.originalUrl}:${req.user?._id || 'anonymous'}`;

    try {
      // Tenta buscar dados no cache
      const cachedData = await cacheService.get(cacheKey);
      
      if (cachedData) {
        console.log(`📦 Cache HIT: ${cacheKey}`);
        return res.json(cachedData);
      }

      console.log(`❌ Cache MISS: ${cacheKey}`);

      // Intercepta a resposta para salvar no cache
      const originalJson = res.json;
      res.json = function(data) {
        // Salva no cache apenas se a resposta for bem-sucedida
        if (res.statusCode === 200) {
          cacheService.set(cacheKey, data, ttlSeconds).catch(err => {
            console.error('Erro ao salvar no cache:', err);
          });
        }
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Erro no middleware de cache:', error);
      next();
    }
  };
};

/**
 * Middleware específico para cache de usuários
 */
export const cacheUserMiddleware = (ttlSeconds = 1800) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `user:${req.user?._id}`;
  });
};

/**
 * Middleware específico para cache de amigos
 */
export const cacheFriendsMiddleware = (ttlSeconds = 900) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `friends:${req.user?._id}`;
  });
};

/**
 * Middleware específico para cache de salas
 */
export const cacheRoomsMiddleware = (ttlSeconds = 600) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `rooms:${req.user?._id}`;
  });
};

/**
 * Middleware específico para cache de sala específica
 */
export const cacheRoomMiddleware = (ttlSeconds = 300) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `room:${req.params.roomId}`;
  });
};

/**
 * Middleware específico para cache de notificações
 */
export const cacheNotificationsMiddleware = (ttlSeconds = 300) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `notifications:${req.user?._id}`;
  });
};

/**
 * Middleware para invalidar cache após operações de escrita
 */
export const invalidateCacheMiddleware = (invalidationKeys = []) => {
  return async (req, res, next) => {
    // Intercepta a resposta para invalidar cache
    const originalJson = res.json;
    res.json = function(data) {
      // Invalida cache apenas se a operação foi bem-sucedida
      if (res.statusCode >= 200 && res.statusCode < 300) {
        invalidateCache(invalidationKeys, req).catch(err => {
          console.error('Erro ao invalidar cache:', err);
        });
      }
      return originalJson.call(this, data);
    };

    next();
  };
};

/**
 * Função auxiliar para invalidar cache
 */
const invalidateCache = async (keys, req) => {
  for (const keyTemplate of keys) {
    let key = keyTemplate;
    
    // Substitui placeholders na chave
    if (keyTemplate.includes('{userId}')) {
      key = key.replace('{userId}', req.user?._id);
    }
    if (keyTemplate.includes('{roomId}')) {
      key = key.replace('{roomId}', req.params.roomId);
    }
    if (keyTemplate.includes('{friendId}')) {
      key = key.replace('{friendId}', req.params.friendId);
    }

    await cacheService.del(key);
    console.log(`🗑️ Cache invalidado: ${key}`);
  }
};

/**
 * Middleware para cache de busca de usuários por código
 */
export const cacheUserSearchMiddleware = (ttlSeconds = 600) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `user_search:${req.params.friendCode}`;
  });
};

/**
 * Middleware para cache de estatísticas
 */
export const cacheStatsMiddleware = (ttlSeconds = 1800) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `stats:${req.user?._id}`;
  });
};

export default {
  cacheMiddleware,
  cacheUserMiddleware,
  cacheFriendsMiddleware,
  cacheRoomsMiddleware,
  cacheRoomMiddleware,
  cacheNotificationsMiddleware,
  invalidateCacheMiddleware,
  cacheUserSearchMiddleware,
  cacheStatsMiddleware
};
