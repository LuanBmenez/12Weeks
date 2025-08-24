import { useState } from "react";
import { Bell, Check, CheckCheck, X, Trash2 } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";
import {
  NotificationContainer,
  NotificationHeader,
  NotificationList,
  NotificationItem,
  NotificationContent,
  NotificationMessage,
  NotificationTime,
  NotificationActions,
  ActionButton,
  EmptyState,
  MarkAllReadButton,
  UnreadDot,
  NotificationCount
} from "./style";

export default function NotificationDropdown() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'friend_request':
        return <Bell size={16} />;
      case 'friend_accepted':
        return <CheckCheck size={16} />;
      case 'friend_rejected':
        return <X size={16} />;
      case 'friend_removed':
        return <Trash2 size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'friend_request':
        return '#2563eb';
      case 'friend_accepted':
        return '#16a34a';
      case 'friend_rejected':
        return '#dc2626';
      case 'friend_removed':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  return (
    <NotificationContainer>
      {/* Botão do sino com contador */}
      <div 
        style={{ position: 'relative', cursor: 'pointer' }}
        onClick={toggleDropdown}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <NotificationCount>
            {unreadCount > 99 ? '99+' : unreadCount}
          </NotificationCount>
        )}
      </div>

      {/* Dropdown de notificações */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          width: '400px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          zIndex: 1000,
          maxHeight: '500px',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <NotificationHeader>
            <h3>Notificações</h3>
            {unreadCount > 0 && (
              <MarkAllReadButton onClick={handleMarkAllAsRead}>
                Marcar todas como lidas
              </MarkAllReadButton>
            )}
          </NotificationHeader>

          {/* Lista de notificações */}
          <NotificationList>
            {notifications.length === 0 ? (
              <EmptyState>
                <Bell size={48} />
                <p>Nenhuma notificação</p>
                <span>As notificações aparecerão aqui</span>
              </EmptyState>
            ) : (
              notifications.map((notification) => (
                <NotificationItem 
                  key={notification._id}
                  $isUnread={!notification.read}
                >
                  <NotificationContent>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        color: getNotificationColor(notification.type),
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <NotificationMessage>
                          {notification.message}
                        </NotificationMessage>
                        <NotificationTime>
                          {formatTime(notification.createdAt)}
                        </NotificationTime>
                      </div>
                    </div>
                  </NotificationContent>

                  <NotificationActions>
                    {!notification.read && (
                      <ActionButton
                        onClick={() => handleMarkAsRead(notification._id)}
                        title="Marcar como lida"
                      >
                        <Check size={16} />
                      </ActionButton>
                    )}
                  </NotificationActions>

                  {!notification.read && <UnreadDot />}
                </NotificationItem>
              ))
            )}
          </NotificationList>
        </div>
      )}
    </NotificationContainer>
  );
}

