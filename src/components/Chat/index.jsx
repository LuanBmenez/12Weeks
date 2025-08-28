import React, { useEffect, useRef } from 'react';
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
  Avatar
} from './style';

const Chat = ({ messages, currentMessage, setCurrentMessage, sendMessage, user, onClose }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatContainer>
      <ChatHeader>
        <h2>Chat da Sala</h2>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ChatHeader>
      <Messages>
        {messages.map((msg, index) => (
          <MessageBubble key={index} isOwner={msg.author._id === user?._id}>
            <Avatar>
              {msg.author.profilePicture ? (
                <img src={msg.author.profilePicture} alt={msg.author.name} />
              ) : (
                <span>{msg.author.name?.charAt(0)}</span>
              )}
            </Avatar>
            <MessageInfo>
              <MessageAuthor>{msg.author.name}</MessageAuthor>
              <MessageText>{msg.message}</MessageText>
              <MessageTime>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</MessageTime>
            </MessageInfo>
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
        />
        <button type="submit">Enviar</button>
      </MessageForm>
    </ChatContainer>
  );
};

export default Chat;
