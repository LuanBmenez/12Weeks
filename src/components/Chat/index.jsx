import React, { useEffect, useRef, useState } from 'react';
import { 
  ChatContainer, 
  ChatHeader,
  CloseButton,
  Messages, 
  MessageForm,
  MessageBubble,
  MessageInfo,
  MessageAuthor,
  MessageTime,
  MessageText,
  Avatar,
  EditForm,
  EditInput,
  EditActions,
  ActionButton
} from './style';
import { Edit3, X, Check } from 'lucide-react';

const Chat = ({ messages, currentMessage, setCurrentMessage, sendMessage, user, onClose, socket }) => {
  const messagesEndRef = useRef(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 
  useEffect(() => {
    if (!socket) return;

    const handleEditError = (error) => {
      console.error('Erro na edição:', error);
      setEditingMessage(null);
    };

    socket.on('edit_error', handleEditError);

    return () => {
      socket.off('edit_error', handleEditError);
    };
  }, [socket]);

  const startEditing = (message) => {
    setEditingMessage(message._id);
    setEditText(message.message);
  };

  const cancelEditing = () => {
    setEditingMessage(null);
    setEditText('');
  };

  const saveEdit = () => {
    if (!socket || !user || !editText.trim()) return;
    
    socket.emit('edit_message', {
      messageId: editingMessage,
      userId: user._id,
      newMessage: editText.trim()
    });
    
    setEditingMessage(null);
    setEditText('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = (now - date) / (1000 * 60 * 60 * 24);
    

    if (diffInDays < 1 && date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
 
    else if (diffInDays < 2 && date.toDateString() === new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString()) {
      return `Ontem ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    else if (diffInDays > 7) {
      return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' });
    }

    else {
      const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const dayName = daysOfWeek[date.getDay()];
      return `${dayName} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <h2>Chat da Sala</h2>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ChatHeader>
      
      <Messages>
        {messages.map((msg, index) => (
          <MessageBubble 
            key={msg._id || index} 
            isOwner={msg.author._id === user?._id || msg.author._id?.toString() === user?._id?.toString()}
          >
            <Avatar>
              {msg.author.profilePicture ? (
                <img src={msg.author.profilePicture} alt={msg.author.name} />
              ) : (
                <span>{msg.author.name?.charAt(0)}</span>
              )}
            </Avatar>
            
            <MessageInfo>
              <MessageAuthor>{msg.author.name}</MessageAuthor>
              
              {editingMessage === msg._id ? (
                <EditForm>
                  <EditInput
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                    maxLength={1000}
                  />
                  <EditActions>
                    <ActionButton onClick={saveEdit} title="Salvar">
                      <Check size={16} />
                    </ActionButton>
                    <ActionButton onClick={cancelEditing} title="Cancelar">
                      <X size={16} />
                    </ActionButton>
                  </EditActions>
                </EditForm>
              ) : (
                <MessageText>{msg.message}</MessageText>
              )}
              
              <MessageTime>
                {formatTimestamp(msg.timestamp)}
                {msg.edited && (
                  <span style={{ fontStyle: 'italic', marginLeft: '8px', fontSize: '12px' }}>
                    (editado)
                  </span>
                )}
              </MessageTime>
            </MessageInfo>
            
         
            {msg.author._id === user?._id || msg.author._id?.toString() === user?._id?.toString() ? (
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                opacity: 0,
                transition: 'opacity 0.2s ease'
              }} className="edit-button-container">
                <ActionButton 
                  onClick={() => startEditing(msg)}
                  title="Editar"
                >
                  <Edit3 size={16} />
                </ActionButton>
              </div>
            ) : null}
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </Messages>
      
      <MessageForm onSubmit={sendMessage}>
        <input 
          type="text" 
          placeholder="Digite sua mensagem..." 
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          maxLength={1000}
        />
        <button type="submit">Enviar</button>
      </MessageForm>
    </ChatContainer>
  );
};

export default Chat;
