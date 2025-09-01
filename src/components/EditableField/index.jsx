import React, { useState, useEffect } from 'react';
import { Edit3, Check, X } from 'lucide-react';
import {
  FieldWrapper,
  Label,
  ValueDisplay,
  EditIcon,
  Input,
  ButtonContainer,
  ActionButton,
  DisplayContainer,
} from './style';

const EditableField = ({
  label,
  value,
  onSave,
  isEditable,
  fieldName,
  inputType = 'text',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleEdit = () => {
    if (isEditable) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    onSave(fieldName, currentValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  return (
    <FieldWrapper>
      <Label>{label}</Label>
      {isEditing ? (
        <>
          <Input
            type={inputType}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            autoFocus
          />
          <ButtonContainer>
            <ActionButton onClick={handleSave} variant="save" aria-label={`Salvar ${label}`}>
              <Check />
            </ActionButton>
            <ActionButton onClick={handleCancel} variant="cancel" aria-label={`Cancelar edição de ${label}`}>
              <X />
            </ActionButton>
          </ButtonContainer>
        </>
      ) : (
        <DisplayContainer>
          <ValueDisplay>{value}</ValueDisplay>
          {isEditable && (
            <EditIcon onClick={handleEdit} title={`Editar ${label}`} aria-label={`Editar ${label}`}>
              <Edit3 />
            </EditIcon>
          )}
        </DisplayContainer>
      )}
    </FieldWrapper>
  );
};

export default EditableField;
