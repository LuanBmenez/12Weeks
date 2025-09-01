import { createClient } from 'redis';

class CacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      this.client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        retry_strategy: (options) => {
          if (options.error && options.error.code === 'ECONNREFUSED') {
            console.log('Redis server connection refused');
            return new Error('Redis server connection refused');
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
            console.log('Redis retry time exhausted');
            return new Error('Retry time exhausted');
          }
          if (options.attempt > 10) {
            console.log('Redis max retry attempts reached');
            return undefined;
          }
          return Math.min(options.attempt * 100, 3000);
        }
      });

      this.client.on('error', (err) => {
        console.error('Redis Client Error:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('✅ Redis conectado com sucesso');
        this.isConnected = true;
      });

      this.client.on('disconnect', () => {
        console.log('❌ Redis desconectado');
        this.isConnected = false;
      });

      await this.client.connect();
    } catch (error) {
      console.error('Erro ao conectar com Redis:', error);
      this.isConnected = false;
    }
  }

  async disconnect() {
    if (this.client && this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
    }
  }

  async get(key) {
    if (!this.isConnected || !this.client) {
      return null;
    }

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Erro ao buscar no cache:', error);
      return null;
    }
  }

  async set(key, value, ttlSeconds = 3600) {
    if (!this.isConnected || !this.client) {
      return false;
    }

    try {
      const serializedValue = JSON.stringify(value);
      await this.client.setEx(key, ttlSeconds, serializedValue);
      return true;
    } catch (error) {
      console.error('Erro ao salvar no cache:', error);
      return false;
    }
  }

  async del(key) {
    if (!this.isConnected || !this.client) {
      return false;
    }

    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error('Erro ao deletar do cache:', error);
      return false;
    }
  }

  async exists(key) {
    if (!this.isConnected || !this.client) {
      return false;
    }

    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Erro ao verificar existência no cache:', error);
      return false;
    }
  }

  async flush() {
    if (!this.isConnected || !this.client) {
      return false;
    }

    try {
      await this.client.flushAll();
      return true;
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
      return false;
    }
  }


  async cacheUser(userId, userData, ttlSeconds = 1800) {
    return await this.set(`user:${userId}`, userData, ttlSeconds);
  }

  async getCachedUser(userId) {
    return await this.get(`user:${userId}`);
  }

  async cacheFriends(userId, friendsData, ttlSeconds = 900) {
    return await this.set(`friends:${userId}`, friendsData, ttlSeconds);
  }

  async getCachedFriends(userId) {
    return await this.get(`friends:${userId}`);
  }

  async cacheRooms(userId, roomsData, ttlSeconds = 600) {
    return await this.set(`rooms:${userId}`, roomsData, ttlSeconds);
  }

  async getCachedRooms(userId) {
    return await this.get(`rooms:${userId}`);
  }

  async cacheRoom(roomId, roomData, ttlSeconds = 300) {
    return await this.set(`room:${roomId}`, roomData, ttlSeconds);
  }

  async getCachedRoom(roomId) {
    return await this.get(`room:${roomId}`);
  }

  async cacheNotifications(userId, notificationsData, ttlSeconds = 300) {
    return await this.set(`notifications:${userId}`, notificationsData, ttlSeconds);
  }

  async getCachedNotifications(userId) {
    return await this.get(`notifications:${userId}`);
  }

  
  async invalidateUserCache(userId) {
    await this.del(`user:${userId}`);
    await this.del(`friends:${userId}`);
    await this.del(`rooms:${userId}`);
    await this.del(`notifications:${userId}`);
  }

  async invalidateRoomCache(roomId) {
    await this.del(`room:${roomId}`);
  }

  async invalidateFriendsCache(userId) {
    await this.del(`friends:${userId}`);
  }

  
  async setWithTags(key, value, tags = [], ttlSeconds = 3600) {
    const success = await this.set(key, value, ttlSeconds);
    if (success && tags.length > 0) {
      for (const tag of tags) {
        await this.client.sAdd(`tag:${tag}`, key);
        await this.client.expire(`tag:${tag}`, ttlSeconds);
      }
    }
    return success;
  }

  async invalidateByTag(tag) {
    if (!this.isConnected || !this.client) {
      return false;
    }

    try {
      const keys = await this.client.sMembers(`tag:${tag}`);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
      await this.client.del(`tag:${tag}`);
      return true;
    } catch (error) {
      console.error('Erro ao invalidar cache por tag:', error);
      return false;
    }
  }

  
  async getStats() {
    if (!this.isConnected || !this.client) {
      return null;
    }

    try {
      const info = await this.client.info('memory');
      const keyspace = await this.client.info('keyspace');
      return { info, keyspace };
    } catch (error) {
      console.error('Erro ao obter estatísticas do cache:', error);
      return null;
    }
  }
}


const cacheService = new CacheService();

export default cacheService;
