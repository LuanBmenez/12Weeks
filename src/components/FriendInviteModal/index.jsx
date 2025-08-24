import { useState } from 'react';
import { X, Search, Copy, UserPlus, Users, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { useFriends } from '../../hooks/useFriends';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalTabs,
  TabButton,
  TabContent,
  SearchSection,
  SearchInput,
  SearchButton,
  UserResult,
  UserInfo,
  UserName,
  UserCode,
  ActionButton,
  ShareSection,
  CodeDisplay,
  CodeText,
  CopyButton,
  CopyMessage,
  RequestsSection,
  RequestItem,
  RequestInfo,
  RequestActions,
  FriendsSection,
  FriendItem,
  FriendInfo,
  RemoveButton,
  EmptyState,
  ErrorMessage,
  LoadingSpinner
} from './style';

export default function FriendInviteModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('search');
  const [searchCode, setSearchCode] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  
  const {
    friendCode,
    searchResult,
    friendRequests,
    friends,
    loading,
    error,
    searchUserByCode,
    sendFriendRequest,
    respondToRequest,
    copyFriendCode,
    clearSearch,
    removeFriend
  } = useFriends();

  const handleSearch = () => {
    if (searchCode.trim()) {
      searchUserByCode(searchCode.trim());
    }
  };

  const handleSendRequest = async (code) => {
    const result = await sendFriendRequest(code);
    if (result.success) {
      alert(result.message);
      setSearchCode('');
      clearSearch();
    } else {
      alert(result.message);
    }
  };

  const handleCopyCode = async () => {
    const result = await copyFriendCode();
    setCopyMessage(result.message);
    setTimeout(() => setCopyMessage(''), 2000);
  };

  const handleRespondToRequest = async (fromUserId, action) => {
    const result = await respondToRequest(fromUserId, action);
    alert(result.message);
  };

  const handleRemoveFriend = async (friendId, friendName) => {
    if (window.confirm(`Tem certeza que deseja remover ${friendName} da sua lista de amigos?`)) {
      const result = await removeFriend(friendId);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Gerenciar Amizades</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </ModalHeader>

        <ModalTabs>
          <TabButton 
            active={activeTab === 'search'} 
            onClick={() => setActiveTab('search')}
          >
            <Search size={16} />
            Buscar Amigo
          </TabButton>
          <TabButton 
            active={activeTab === 'share'} 
            onClick={() => setActiveTab('share')}
          >
            <Copy size={16} />
            Meu Código
          </TabButton>
          <TabButton 
            active={activeTab === 'requests'} 
            onClick={() => setActiveTab('requests')}
          >
            <UserPlus size={16} />
            Solicitações ({friendRequests.length})
          </TabButton>
          <TabButton 
            active={activeTab === 'friends'} 
            onClick={() => setActiveTab('friends')}
          >
            <Users size={16} />
            Amigos ({friends.length})
          </TabButton>
        </ModalTabs>

        <ModalBody>
          {/* Tab: Buscar Amigo */}
          <TabContent active={activeTab === 'search'}>
            <SearchSection>
              <h3>Buscar por Código de Amigo</h3>
              <p>Digite o código de 8 caracteres do seu amigo</p>
              
              <SearchInput
                type="text"
                placeholder="Ex: A1B2C3D4"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                maxLength={8}
              />
              
              <SearchButton onClick={handleSearch} disabled={loading}>
                {loading ? <LoadingSpinner /> : <Search size={16} />}
                Buscar
              </SearchButton>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              {searchResult && (
                <UserResult>
                  <UserInfo>
                    <UserName>{searchResult.user.name}</UserName>
                    <UserCode>Código: {searchResult.user.friendCode}</UserCode>
                  </UserInfo>
                  
                  {searchResult.isAlreadyFriend ? (
                    <ActionButton disabled>
                      <CheckCircle size={16} />
                      Já são amigos
                    </ActionButton>
                  ) : searchResult.hasPendingRequest ? (
                    <ActionButton disabled>
                      <UserPlus size={16} />
                      Solicitação pendente
                    </ActionButton>
                  ) : (
                    <ActionButton 
                      onClick={() => handleSendRequest(searchResult.user.friendCode)}
                      disabled={loading}
                    >
                      <UserPlus size={16} />
                      Enviar Solicitação
                    </ActionButton>
                  )}
                </UserResult>
              )}
            </SearchSection>
          </TabContent>

          {/* Tab: Meu Código */}
          <TabContent active={activeTab === 'share'}>
            <ShareSection>
              <h3>Seu Código de Amigo</h3>
              <p>Compartilhe este código com seus amigos para que eles possam te adicionar</p>
              
              <CodeDisplay>
                <CodeText>{friendCode || 'Carregando...'}</CodeText>
                <CopyButton onClick={handleCopyCode}>
                  <Copy size={16} />
                  Copiar
                </CopyButton>
              </CodeDisplay>
              
              {copyMessage && <CopyMessage>{copyMessage}</CopyMessage>}
              
              <p style={{ fontSize: '14px', color: '#666', marginTop: '16px' }}>
                💡 Dica: Compartilhe este código em mensagens, redes sociais ou qualquer lugar onde seus amigos possam vê-lo!
              </p>
            </ShareSection>
          </TabContent>

          {/* Tab: Solicitações */}
          <TabContent active={activeTab === 'requests'}>
            <RequestsSection>
              <h3>Solicitações de Amizade</h3>
              
              {friendRequests.length === 0 ? (
                <EmptyState>
                  <UserPlus size={48} />
                  <p>Nenhuma solicitação pendente</p>
                </EmptyState>
              ) : (
                friendRequests.map((request) => (
                  <RequestItem key={request.from._id}>
                    <RequestInfo>
                      <UserName>{request.from.name}</UserName>
                      <UserCode>Código: {request.from.friendCode}</UserCode>
                    </RequestInfo>
                    
                    <RequestActions>
                      <ActionButton 
                        onClick={() => handleRespondToRequest(request.from._id, 'accept')}
                        style={{ backgroundColor: '#16a34a' }}
                      >
                        <CheckCircle size={16} />
                        Aceitar
                      </ActionButton>
                      
                      <ActionButton 
                        onClick={() => handleRespondToRequest(request.from._id, 'reject')}
                        style={{ backgroundColor: '#dc2626' }}
                      >
                        <XCircle size={16} />
                        Rejeitar
                      </ActionButton>
                    </RequestActions>
                  </RequestItem>
                ))
              )}
            </RequestsSection>
          </TabContent>

          {/* Tab: Amigos */}
          <TabContent active={activeTab === 'friends'}>
            <FriendsSection>
              <h3>Seus Amigos</h3>
              
              {friends.length === 0 ? (
                <EmptyState>
                  <Users size={48} />
                  <p>Você ainda não tem amigos</p>
                  <p>Use a aba "Buscar Amigo" para encontrar pessoas!</p>
                </EmptyState>
              ) : (
                friends.map((friend) => (
                  <FriendItem key={friend._id}>
                    <FriendInfo>
                      <UserName>{friend.name}</UserName>
                      <UserCode>Código: {friend.friendCode}</UserCode>
                    </FriendInfo>
                    <RemoveButton 
                      onClick={() => handleRemoveFriend(friend._id, friend.name)}
                    >
                      <Trash2 size={16} />
                      Remover Amigo
                    </RemoveButton>
                  </FriendItem>
                ))
              )}
            </FriendsSection>
          </TabContent>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}
