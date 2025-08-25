import { useState } from "react";
import { X } from "lucide-react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalTitle,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  CancelButton,
  CreateButton,
} from "./style";

export default function CreateRoomModal({ isOpen, onClose, onCreateRoom }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim()) {
      onCreateRoom(formData);
      setFormData({ name: "", description: "" });
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Criar Nova Sala</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nome da Sala *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Ex: Metas da Semana"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Descrição *</Label>
            <TextArea
              id="description"
              name="description"
              placeholder="Descreva o objetivo desta sala..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
            <CreateButton type="submit">
              Criar Sala
            </CreateButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}
