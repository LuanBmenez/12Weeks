import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRooms } from "../../hooks/useRooms";
import { useUnreadMessages } from "../../hooks/useUnreadMessages";
import { useToast } from "../Toast";
import {
  Container,
  Header,
  Title,
  CreateButton,
  RoomsGrid,
  EmptyState,
  LoadingSpinner,
  ResponsiveContainer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  CancelButton,
  SubmitButton,
} from "./style";

const RoomsList = () => {
  const navigate = useNavigate();
  const { rooms, loading, error, fetchRooms, createRoom, deleteRoom, editRoom } =
    useRooms();
  const { getUnreadCount } = useUnreadMessages();
  const { showSuccess, showError, showWarning } = useToast();

  // Função para calcular tempo relativo de forma mais precisa
  const getTimeAgo = (date) => {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now - targetDate) / 1000);
    
    if (diffInSeconds < 60) {
      return 'agora mesmo';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} dias`;
    } else {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} semanas`;
    }
  };
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
  });
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && !event.target.closest('.quick-actions-menu')) {
        handleMenuClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenuId]);

  const handleCreateRoom = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({ name: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      showWarning("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setCreating(true);

      const result = await createRoom(formData);

      if (result.success) {
        handleCloseModal();
        showSuccess("Sala criada com sucesso! 🎉");
        navigate(`/room/${result.room._id}`);
      } else {
        showError(result.message || "Erro ao criar sala");
      }
    } catch (err) {
      showError("Erro interno ao criar sala");
      console.error("Erro ao criar sala:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleRoomClick = (room) => {
    navigate(`/room/${room._id}`);
  };

  const handleEnterRoom = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const handleEditRoom = (room, e) => {
    e.stopPropagation();
    setRoomToEdit(room);
    setEditFormData({
      name: room.name,
      description: room.description || "",
    });
    setShowEditModal(true);
    handleMenuClose();
  };

  const handleDeleteRoom = (room, e) => {
    e.stopPropagation();
    setRoomToDelete(room);
    setShowDeleteModal(true);
    handleMenuClose();
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setRoomToEdit(null);
    setEditFormData({ name: "", description: "" });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.name.trim()) {
      showWarning("Por favor, preencha o nome da sala.");
      return;
    }

    try {
      setEditing(true);
      
      const result = await editRoom(roomToEdit._id, {
        name: editFormData.name.trim(),
        description: editFormData.description.trim()
      });
      
      if (result.success) {
        showSuccess("Sala editada com sucesso! ✏️");
        handleCloseEditModal();
      } else {
        showError(result.message || "Erro ao editar sala");
      }
    } catch (err) {
      showError("Erro ao editar sala");
      console.error("Erro ao editar sala:", err);
    } finally {
      setEditing(false);
    }
  };

  const handleMenuToggle = (roomId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === roomId ? null : roomId);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
  };



  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setRoomToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!roomToDelete) return;

    try {
      setDeleting(true);
      const result = await deleteRoom(roomToDelete._id);

      if (result.success) {
        handleCloseDeleteModal();
        showSuccess("Sala deletada com sucesso! 🗑️");
      } else {
        showError(result.message || "Erro ao deletar sala");
      }
    } catch (err) {
      showError("Erro interno ao deletar sala");
      console.error("Erro ao deletar sala:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <ResponsiveContainer>
        <LoadingSpinner />
      </ResponsiveContainer>
    );
  }

  if (error) {
    return (
      <ResponsiveContainer>
        <div style={{ textAlign: "center", color: "red" }}>
          <p>Erro ao carregar salas: {error}</p>
          <button onClick={fetchRooms}>Tentar novamente</button>
        </div>
      </ResponsiveContainer>
    );
  }

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      <Container>
        <motion.div variants={headerVariants}>
          <Header>
            <motion.button
              onClick={() => navigate("/dashboard")}
              className="back-button"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -3 }}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.span>
              Voltar ao Dashboard
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Title>✨ Minhas Salas</Title>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CreateButton onClick={handleCreateRoom}>
                <motion.span
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  +
                </motion.span>
                Criar Nova Sala
              </CreateButton>
            </motion.div>
          </Header>
        </motion.div>

        {rooms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <EmptyState>
              <motion.div
                className="empty-icon"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                🏠
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Nenhuma sala criada ainda
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Crie sua primeira sala para começar a trabalhar em equipe!
              </motion.p>
              <motion.button
                onClick={handleCreateRoom}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              >
                <motion.span
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  ✨
                </motion.span>
                Criar Primeira Sala
              </motion.button>
            </EmptyState>
          </motion.div>
        ) : (
          <RoomsGrid>
            <AnimatePresence>
              {rooms.map((room, index) => (
                <motion.div
                  key={room._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  layout
                  className="room-card"
                  onClick={() => handleRoomClick(room)}
                >
                  <div className="room-header">
                    <div className="room-title-section">
                      <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {room.name}
                      </motion.h3>
                      
                      <div className="status-badges">
                        <motion.span
                          className="status-badge new"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        >
                          Nova
                        </motion.span>
                        <motion.span
                          className="status-badge active"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                        >
                          Ativa
                        </motion.span>
                      </div>
                    </div>
                    
                    <div className="room-actions">
                      <motion.span
                        className="participant-count"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        👥 {room.participants?.length || 0}
                      </motion.span>
                      
                      <motion.button
                        className="favorite-button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                      >
                        ❤️
                      </motion.button>
                      
                      <motion.div
                        className="quick-actions-menu"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                      >
                        <motion.button
                          className="menu-trigger"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleMenuToggle(room._id, e)}
                        >
                          ⋯
                        </motion.button>
                        {openMenuId === room._id && (
                          <div className="menu-dropdown open">
                            <button 
                              className="menu-item"
                              onClick={(e) => handleEditRoom(room, e)}
                            >
                              ✏️ Editar
                            </button>
                            <button 
                              className="menu-item delete"
                              onClick={(e) => handleDeleteRoom(room, e)}
                            >
                              🗑️ Excluir
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                  <motion.p
                    className="room-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {room.description}
                  </motion.p>
                  
                  <motion.div
                    className="progress-section"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <div className="progress-header">
                      <span className="progress-label">Progresso da Sala</span>
                      <span className="progress-percentage">{Math.min(Math.floor((Date.now() - new Date(room.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 7 * 12) * 100), 100)}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(Math.floor((Date.now() - new Date(room.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 7 * 12) * 100), 100)}%` }}
                        transition={{ delay: index * 0.1 + 0.6, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className="room-additional-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <div className="info-row">
                      <div className="status-indicator">
                        <motion.div
                          className="status-dot online"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <span className="status-text">Online</span>
                      </div>
                      
                      <span className="last-activity">
                        🕒 Última atividade há {getTimeAgo(room.updatedAt || room.createdAt)}
                      </span>
                    </div>
                    
                    <div className="upcoming-goals">
                      <span className="goals-label">🎯 Próximas metas:</span>
                      <div className="goals-preview">
                        <span>• Finalizar projeto X</span>
                        <span>• Revisar documentação</span>
                        <span>• +2 outras</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="room-footer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="footer-left">
                      <span className="creation-date">
                        📅 {new Date(room.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    
                    <div className="footer-right">
                      {getUnreadCount(room._id) > 0 && (
                        <motion.div
                          className="notification-badge"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.6, type: "spring" }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {getUnreadCount(room._id)}
                        </motion.div>
                      )}
                      
                      <motion.button
                        className="enter-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnterRoom(room._id);
                        }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                          backgroundColor: "#059669",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.span
                          className="button-icon"
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          →
                        </motion.span>
                        Entrar
                      </motion.button>
                    </div>
                  </motion.div>

               
                  <motion.div
                    className="card-shine"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{
                      x: "100%",
                      opacity: [0, 1, 0],
                      transition: { duration: 0.6, ease: "easeInOut" },
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </RoomsGrid>
        )}

        <AnimatePresence>
          {showCreateModal && (
            <Modal
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ModalContent
                as={motion.div}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ModalHeader>
                  <ModalTitle>✨ Criar Nova Sala</ModalTitle>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CloseButton onClick={handleCloseModal}>×</CloseButton>
                  </motion.div>
                </ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <FormGroup>
                        <Label htmlFor="name">🏠 Nome da Sala *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Ex: Metas da Semana"
                          value={formData.name}
                          onChange={handleInputChange}
                          maxLength={100}
                          required
                        />
                      </FormGroup>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FormGroup>
                        <Label htmlFor="description">📝 Descrição *</Label>
                        <TextArea
                          id="description"
                          name="description"
                          placeholder="Descreva o objetivo desta sala..."
                          value={formData.description}
                          onChange={handleInputChange}
                          maxLength={500}
                          rows={4}
                          required
                        />
                      </FormGroup>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <ButtonGroup>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <CancelButton
                            type="button"
                            onClick={handleCloseModal}
                          >
                            Cancelar
                          </CancelButton>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <SubmitButton type="submit" disabled={creating}>
                            {creating ? "⏳ Criando..." : "🚀 Criar Sala"}
                          </SubmitButton>
                        </motion.div>
                      </ButtonGroup>
                    </motion.div>
                  </Form>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEditModal && roomToEdit && (
            <Modal
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ModalContent
                as={motion.div}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ModalHeader>
                  <ModalTitle>✏️ Editar Sala</ModalTitle>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CloseButton onClick={handleCloseEditModal}>×</CloseButton>
                  </motion.div>
                </ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleEditSubmit}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <FormGroup>
                        <Label htmlFor="edit-name">🏠 Nome da Sala *</Label>
                        <Input
                          id="edit-name"
                          name="name"
                          type="text"
                          placeholder="Ex: Metas da Semana"
                          value={editFormData.name}
                          onChange={handleEditInputChange}
                          maxLength={100}
                          required
                        />
                      </FormGroup>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FormGroup>
                        <Label htmlFor="edit-description">📝 Descrição</Label>
                        <TextArea
                          id="edit-description"
                          name="description"
                          placeholder="Descreva o objetivo desta sala..."
                          value={editFormData.description}
                          onChange={handleEditInputChange}
                          maxLength={500}
                          rows={4}
                        />
                      </FormGroup>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <ButtonGroup>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <CancelButton
                            type="button"
                            onClick={handleCloseEditModal}
                          >
                            Cancelar
                          </CancelButton>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <SubmitButton type="submit" disabled={editing}>
                            {editing ? "⏳ Salvando..." : "💾 Salvar Alterações"}
                          </SubmitButton>
                        </motion.div>
                      </ButtonGroup>
                    </motion.div>
                  </Form>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDeleteModal && roomToDelete && (
            <Modal
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ModalContent
                as={motion.div}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ModalHeader>
                  <ModalTitle>⚠️ Confirmar Exclusão</ModalTitle>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CloseButton onClick={handleCloseDeleteModal}>
                      ×
                    </CloseButton>
                  </motion.div>
                </ModalHeader>
                <ModalBody>
                  <div style={{ textAlign: "center", padding: "1rem 0" }}>
                    <motion.div
                      style={{ fontSize: "3rem", marginBottom: "1rem" }}
                      animate={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      🗑️
                    </motion.div>
                    <motion.h3
                      style={{ margin: "0 0 1rem 0", color: "#dc2626" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Deletar Sala "{roomToDelete.name}"?
                    </motion.h3>
                    <motion.p
                      style={{
                        color: "#6b7280",
                        marginBottom: "2rem",
                        lineHeight: "1.5",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Esta ação é <strong>irreversível</strong>. Todas as metas,
                      progresso e dados relacionados a esta sala serão
                      permanentemente removidos para todos os participantes.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <ButtonGroup>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <CancelButton
                            type="button"
                            onClick={handleCloseDeleteModal}
                          >
                            Cancelar
                          </CancelButton>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <SubmitButton
                            type="button"
                            onClick={handleConfirmDelete}
                            disabled={deleting}
                            style={{
                              background: "#dc2626",
                              borderColor: "#dc2626",
                            }}
                          >
                            {deleting ? "⏳ Deletando..." : "💥 Sim, Deletar"}
                          </SubmitButton>
                        </motion.div>
                      </ButtonGroup>
                    </motion.div>
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </motion.div>
  );
};

export default RoomsList;
