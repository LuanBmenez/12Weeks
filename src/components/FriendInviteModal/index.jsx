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
  LoadingSpinner,
  NotificationMessage
} from './style';

export default function FriendInviteModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('search');
  const [searchCode, setSearchCode] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  const {
    friendCode,
    searchResult,
    friendRequests,
    friends,
    loading,
    searchUserByCode,
    sendFriendRequest,
    respondToRequest,
    copyFriendCode,
    clearSearch,
    removeFriend,
    cleanupOldRequests
  } = useFriends();

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, show: true });
    setTimeout(() => setNotification({ message: '', type: '', show: false }), 3000);
  };

  const handleSearch = () => {
    if (searchCode.trim()) {
      searchUserByCode(searchCode.trim());
    }
  };

  const handleSendRequest = async (code) => {
    const result = await sendFriendRequest(code);
    if (result.success) {
      showNotification(result.message, 'success');
      setSearchCode('');
      clearSearch();
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleCopyCode = async () => {
    const result = await copyFriendCode();
    setCopyMessage(result.message);
    setTimeout(() => setCopyMessage(''), 2000);
  };

  const handleRespondToRequest = async (fromUserId, action) => {
    const result = await respondToRequest(fromUserId, action);
    showNotification(result.message, result.success ? 'success' : 'error');
  };

  const handleRemoveFriendClick = (friend) => {
    setFriendToDelete(friend);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setFriendToDelete(null);
  };

  const handleConfirmRemoveFriend = async () => {
    if (!friendToDelete) return;

    try {
      setDeleting(true);
      const result = await removeFriend(friendToDelete._id);
      if (result.success) {
        showNotification(result.message, 'success');
        handleCloseDeleteModal();
      } else {
        showNotification(result.message, 'error');
      }
    } catch (err) {
      showNotification('Erro interno ao remover amigo', 'error');
      console.error('Erro ao remover amigo:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCleanupOldRequests = async () => {
    try {
      const result = await cleanupOldRequests();
      if (result.success) {
        showNotification('Solicitações antigas limpas! Agora você pode enviar novas solicitações.', 'success');
      } else {
        showNotification(result.message, 'error');
      }
    } catch (err) {
      showNotification('Erro ao limpar solicitações antigas', 'error');
      console.error('Erro ao limpar solicitações:', err);
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

        
        {notification.show && (
          <NotificationMessage type={notification.type}>
            {notification.message}
          </NotificationMessage>
        )}

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

              <div style={{ 
                marginTop: '2rem', 
                padding: '1rem', 
                background: '#f8f9fa', 
                borderRadius: '0.5rem',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#495057' }}>
                  🔧 Problemas com solicitações?
                </h4>
                <p style={{ 
                  margin: '0 0 1rem 0', 
                  fontSize: '0.8rem', 
                  color: '#6c757d', 
                  lineHeight: '1.4' 
                }}>
                  Se você não consegue enviar solicitação para alguém que já foi seu amigo, 
                  clique no botão abaixo para limpar solicitações antigas.
                </p>
                <ActionButton 
                  onClick={handleCleanupOldRequests}
                  disabled={loading}
                  style={{ 
                    background: '#ffc107',
                    borderColor: '#ffc107',
                    color: '#000',
                    fontSize: '0.8rem',
                    padding: '0.4rem 0.8rem'
                  }}
                >
                  🧹 Limpar Solicitações Antigas
                </ActionButton>
              </div>
            </SearchSection>
          </TabContent>

          
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
                      onClick={() => handleRemoveFriendClick(friend)}
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

    
      {showDeleteModal && friendToDelete && (
        <ModalOverlay onClick={handleCloseDeleteModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Confirmar Remoção</h2>
              <button onClick={handleCloseDeleteModal}>
                <X size={20} />
              </button>
            </ModalHeader>
            <ModalBody>
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💔</div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#dc2626' }}>
                  Remover "{friendToDelete.name}" da sua lista de amigos?
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.5' }}>
                  Esta ação é <strong>irreversível</strong>. Vocês não serão mais amigos e precisarão 
                  enviar uma nova solicitação de amizade para se conectarem novamente.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <ActionButton 
                    onClick={handleCloseDeleteModal}
                    style={{ 
                      background: '#6b7280',
                      borderColor: '#6b7280'
                    }}
                  >
                    Cancelar
                  </ActionButton>
                  <ActionButton 
                    onClick={handleConfirmRemoveFriend}
                    disabled={deleting}
                    style={{ 
                      background: '#dc2626',
                      borderColor: '#dc2626'
                    }}
                  >
                    {deleting ? 'Removendo...' : 'Sim, Remover'}
                  </ActionButton>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </ModalOverlay>
  );
}
