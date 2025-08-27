import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRooms } from "../../hooks/useRooms";
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
  const { rooms, loading, error, fetchRooms, createRoom, deleteRoom } =
    useRooms();
  const { showSuccess, showError, showWarning } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

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

  const handleDeleteClick = (room, e) => {
    e.stopPropagation();
    setRoomToDelete(room);
    setShowDeleteModal(true);
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
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {room.name}
                    </motion.h3>
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
                        className="delete-button"
                        onClick={(e) => handleDeleteClick(room, e)}
                        title="Deletar sala"
                        whileHover={{
                          scale: 1.2,
                          rotate: 10,
                          backgroundColor: "#fee2e2",
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        🗑️
                      </motion.button>
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
                    className="room-footer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <span className="creation-date">
                      📅 {new Date(room.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <motion.button
                      className="enter-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnterRoom(room._id);
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Entrar 🚀
                    </motion.button>
                  </motion.div>

                  {/* Efeito de brilho no hover */}
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
