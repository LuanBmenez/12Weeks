import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { 
  cacheFriendsMiddleware, 
  cacheUserSearchMiddleware, 
  cacheNotificationsMiddleware,
  invalidateCacheMiddleware 
} from '../middleware/cache.js';
import cacheService from '../services/cacheService.js';

const router = express.Router();


router.get('/search/:friendCode', auth, cacheUserSearchMiddleware(), async (req, res) => {
  try {
    const { friendCode } = req.params;
    
    if (!friendCode || friendCode.length !== 8) {
      return res.status(400).json({ message: 'Código de amigo inválido' });
    }

    const targetUser = await User.findOne({ friendCode: friendCode.toUpperCase() })
      .select('name friendCode')
      .lean();

    if (!targetUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }


    const currentUser = await User.findById(req.user._id);
    const isAlreadyFriend = currentUser.friends.includes(targetUser._id);
    

    const existingRequest = currentUser.friendRequests.find(
      request => request.from.toString() === targetUser._id.toString() && request.status === 'pending'
    );

    res.json({
      user: targetUser,
      isAlreadyFriend,
      hasPendingRequest: !!existingRequest
    });

  } catch (error) {
    console.error('Erro na busca:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});



router.post('/request', auth, [
  body('friendCode')
    .isLength({ min: 8, max: 8 })
    .withMessage('Código de amigo deve ter 8 caracteres')
], invalidateCacheMiddleware(['friends:{userId}', 'notifications:{userId}']), async (req, res) => {
  try {
    console.log('=== INÍCIO DA SOLICITAÇÃO DE AMIZADE ===');
    console.log('Usuário atual:', req.user.name, 'ID:', req.user._id);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Erro de validação:', errors.array());
      return res.status(400).json({ 
        message: 'Dados inválidos',
        errors: errors.array() 
      });
    }

    const { friendCode } = req.body;
    const currentUserId = req.user._id;
    console.log('Código de amigo recebido:', friendCode);

        
    if (req.user.friendCode === friendCode.toUpperCase()) {
      console.log('❌ Usuário tentando se adicionar como amigo');
      return res.status(400).json({ message: 'Você não pode se adicionar como amigo' });
    }

    
    const targetUser = await User.findOne({ friendCode: friendCode.toUpperCase() });
    if (!targetUser) {
      console.log('❌ Usuário não encontrado para o código:', friendCode);
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    console.log('✅ Usuário alvo encontrado:', targetUser.name, 'ID:', targetUser._id);

    
    if (req.user.friends.includes(targetUser._id)) {
      console.log('❌ Usuários já são amigos');
      return res.status(400).json({ message: 'Vocês já são amigos' });
    }

    
    const existingRequest = targetUser.friendRequests.find(
      request => request.from.toString() === currentUserId.toString() && request.status === 'pending'
    );

    if (existingRequest) {
      console.log('❌ Já existe uma solicitação pendente');
      return res.status(400).json({ message: 'Já existe uma solicitação pendente' });
    }
    console.log('✅ Nenhuma solicitação pendente encontrada');

    
   

    console.log('📤 Enviando solicitação para o usuário alvo...');
    await User.findByIdAndUpdate(targetUser._id, {
      $push: {
        friendRequests: {
          from: currentUserId,
          status: 'pending'
        },
        notifications: {
          type: 'friend_request',
          from: currentUserId,
          message: `${req.user.name} enviou uma solicitação de amizade`,
          read: false
        }
      }
    });

    console.log('✅ Solicitação enviada com sucesso!');
    res.json({ message: 'Solicitação de amizade enviada com sucesso' });

  } catch (error) {
    console.error('❌ Erro ao enviar solicitação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.post('/respond', auth, [
  body('fromUserId').isMongoId().withMessage('ID de usuário inválido'),
  body('action').isIn(['accept', 'reject']).withMessage('Ação deve ser accept ou reject')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos',
        errors: errors.array() 
      });
    }

    const { fromUserId, action } = req.body;
    const currentUserId = req.user._id;

    
    await User.findByIdAndUpdate(currentUserId, {
      $set: {
        'friendRequests.$[elem].status': action === 'accept' ? 'accepted' : 'rejected'
      }
    }, {
      arrayFilters: [{ 'elem.from': fromUserId }]
    });

    
    await User.findByIdAndUpdate(fromUserId, {
      $set: {
        'friendRequests.$[elem].status': action === 'accept' ? 'accepted' : 'rejected'
      }
    }, {
      arrayFilters: [{ 'elem.from': currentUserId }]
    });

    
    const notificationMessage = action === 'accept' 
      ? `${req.user.name} aceitou sua solicitação de amizade`
      : `${req.user.name} rejeitou sua solicitação de amizade`;

    await User.findByIdAndUpdate(fromUserId, {
      $push: {
        notifications: {
          type: action === 'accept' ? 'friend_accepted' : 'friend_rejected',
          from: currentUserId,
          message: notificationMessage,
          read: false
        }
      }
    });

    if (action === 'accept') {
      
      await User.findByIdAndUpdate(currentUserId, {
        $addToSet: { friends: fromUserId }
      });

      await User.findByIdAndUpdate(fromUserId, {
        $addToSet: { friends: currentUserId }
      });

      res.json({ message: 'Amizade aceita com sucesso' });
    } else {
      res.json({ message: 'Solicitação rejeitada' });
    }

  } catch (error) {
    console.error('Erro ao responder solicitação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.get('/requests', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('friendRequests.from', 'name friendCode')
      .lean();

    const pendingRequests = user.friendRequests.filter(
      request => request.status === 'pending'
    );

    res.json({ requests: pendingRequests });

  } catch (error) {
    console.error('Erro ao listar solicitações:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.get('/list', auth, cacheFriendsMiddleware(), async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('friends', 'name friendCode')
      .lean();

    res.json({ friends: user.friends });

  } catch (error) {
    console.error('Erro ao listar amigos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

  

router.get('/my-code', auth, async (req, res) => {
  try {
    res.json({ friendCode: req.user.friendCode });
  } catch (error) {
    console.error('Erro ao obter código:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.get('/notifications', auth, cacheNotificationsMiddleware(), async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('notifications.from', 'name')
      .lean();

    
    const notifications = user.notifications.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json({ notifications });
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.put('/notifications/:notificationId/read', auth, async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        'notifications.$[elem].read': true
      }
    }, {
      arrayFilters: [{ 'elem._id': notificationId }]
    });

    res.json({ message: 'Notificação marcada como lida' });
  } catch (error) {
    console.error('Erro ao marcar notificação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.put('/notifications/read-all', auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        'notifications.$[].read': true
      }
    });

    res.json({ message: 'Todas as notificações foram marcadas como lidas' });
  } catch (error) {
    console.error('Erro ao marcar notificações:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.get('/notifications/unread-count', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    const unreadCount = user.notifications.filter(n => !n.read).length;
    
    res.json({ unreadCount });
  } catch (error) {
    console.error('Erro ao contar notificações:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.delete('/remove/:friendId', auth, async (req, res) => {
  try {
    const { friendId } = req.params;
    const currentUserId = req.user._id;


    const currentUser = await User.findById(currentUserId);
    if (!currentUser.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Usuário não é seu amigo' });
    }


    await User.findByIdAndUpdate(currentUserId, {
      $pull: { friends: friendId }
    });


    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: currentUserId }
    });


    await User.findByIdAndUpdate(currentUserId, {
      $pull: { 
        friendRequests: { 
          from: friendId,
          status: { $in: ['accepted', 'rejected'] }
        }
      }
    });

    await User.findByIdAndUpdate(friendId, {
      $pull: { 
        friendRequests: { 
          from: currentUserId,
          status: { $in: ['accepted', 'rejected'] }
        }
      }
    });

    
    await User.findByIdAndUpdate(friendId, {
      $push: {
        notifications: {
          type: 'friend_removed',
          from: currentUserId,
          message: `${req.user.name} removeu você da lista de amigos`,
          read: false
        }
      }
    });

    res.json({ message: 'Amigo removido com sucesso' });

  } catch (error) {
    console.error('Erro ao remover amigo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


router.post('/cleanup-old-requests', auth, async (req, res) => {
  try {
    const currentUserId = req.user._id;
    

    const currentUser = await User.findById(currentUserId);
    
   
    const friendIds = currentUser.friends.map(id => id.toString());
    
    await User.findByIdAndUpdate(currentUserId, {
      $pull: { 
        friendRequests: { 
          status: { $in: ['accepted', 'rejected'] }
        }
      }
    });

    res.json({ 
      message: 'Solicitações antigas limpas com sucesso',
      cleanedRequests: true 
    });

  } catch (error) {
    console.error('Erro ao limpar solicitações:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

export default router;
