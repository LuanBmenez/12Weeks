import cacheService from '../services/cacheService.js';

/**
 * Middleware de cache para rotas GET
 * @param {number} ttlSeconds 
 * @param {function} keyGenerator
 */
export const cacheMiddleware = (ttlSeconds = 300, keyGenerator = null) => {
  return async (req, res, next) => {
    
    if (req.method !== 'GET') {
      return next();
    }

    
    const cacheKey = keyGenerator 
      ? keyGenerator(req) 
      : `cache:${req.originalUrl}:${req.user?._id || 'anonymous'}`;

    try {
      
      const cachedData = await cacheService.get(cacheKey);
      
      if (cachedData) {
        console.log(`📦 Cache HIT: ${cacheKey}`);
        return res.json(cachedData);
      }

      console.log(`❌ Cache MISS: ${cacheKey}`);

      const originalJson = res.json;
      res.json = function(data) {
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


export const cacheUserMiddleware = (ttlSeconds = 1800) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `user:${req.user?._id}`;
  });
};


export const cacheFriendsMiddleware = (ttlSeconds = 900) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `friends:${req.user?._id}`;
  });
};


export const cacheRoomsMiddleware = (ttlSeconds = 600) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `rooms:${req.user?._id}`;
  });
};


export const cacheRoomMiddleware = (ttlSeconds = 300) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `room:${req.params.roomId}`;
  });
};


export const cacheNotificationsMiddleware = (ttlSeconds = 300) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `notifications:${req.user?._id}`;
  });
};


export const invalidateCacheMiddleware = (invalidationKeys = []) => {
  return async (req, res, next) => {
    
    const originalJson = res.json;
    res.json = function(data) {
      
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


const invalidateCache = async (keys, req) => {
  for (const keyTemplate of keys) {
    let key = keyTemplate;
    
  
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


export const cacheUserSearchMiddleware = (ttlSeconds = 600) => {
  return cacheMiddleware(ttlSeconds, (req) => {
    return `user_search:${req.params.friendCode}`;
  });
};


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
