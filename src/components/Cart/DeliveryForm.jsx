// Componente DeliveryForm - Formulário de entrega
// Coleta dados de endereço com validação Zod

import { useState } from 'react';
import styled from 'styled-components';
import deliverySchema from '../../schemas/deliverySchema';
import { theme } from '../../styles/GlobalStyles';

// Container do formulário
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Título do formulário
const FormTitle = styled.h2`
  color: ${theme.colors.primaryLight};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
`;

// Grupo de campo
const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Campo de duas colunas
const FieldRow = styled.div`
  display: flex;
  gap: 32px;
`;

// Label do campo
const Label = styled.label`
  color: ${theme.colors.primaryLight};
  font-size: 14px;
  font-weight: 700;
`;

// Input do formulário
const Input = styled.input`
  background-color: ${theme.colors.primaryLight};
  border: none;
  padding: 8px;
  font-size: 14px;
  color: ${theme.colors.text};
  width: 100%;

  &:focus {
    outline: 2px solid ${theme.colors.white};
  }
`;

// Mensagem de erro
const ErrorMessage = styled.span`
  color: #FFCCCC;
  font-size: 12px;
`;

// Container de botões
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

// Botão principal
const PrimaryButton = styled.button`
  width: 100%;
  background-color: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 700;
  padding: 4px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

// Botão secundário
const SecondaryButton = styled.button`
  width: 100%;
  background-color: transparent;
  color: ${theme.colors.primaryLight};
  font-size: 14px;
  font-weight: 700;
  padding: 4px;
  border: 1px solid ${theme.colors.primaryLight};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

// Componente DeliveryForm
// Props: onContinue - função para continuar ao pagamento
// Props: onBack - função para voltar ao carrinho
// Props: initialData - dados iniciais do formulário
// Props: onSaveData - função para salvar dados
function DeliveryForm({ onContinue, onBack, initialData, onSaveData }) {
  // Estado do formulário
  const [formData, setFormData] = useState(initialData || {
    receiver: '',
    address: '',
    city: '',
    zipCode: '',
    number: '',
    complement: '',
  });

  // Estado de erros
  const [errors, setErrors] = useState({});

  // Atualiza campo do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpa erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Submete o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida com Zod
    const result = deliverySchema.safeParse(formData);

    if (!result.success) {
      // Mapeia erros do Zod
      const newErrors = {};
      result.error.errors.forEach(err => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    // Salva dados e continua
    onSaveData(formData);
    onContinue();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Entrega</FormTitle>

      {/* Campo: Quem vai receber */}
      <FieldGroup>
        <Label htmlFor="receiver">Quem irá receber</Label>
        <Input
          type="text"
          id="receiver"
          name="receiver"
          value={formData.receiver}
          onChange={handleChange}
        />
        {errors.receiver && <ErrorMessage>{errors.receiver}</ErrorMessage>}
      </FieldGroup>

      {/* Campo: Endereço */}
      <FieldGroup>
        <Label htmlFor="address">Endereço</Label>
        <Input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
      </FieldGroup>

      {/* Campo: Cidade */}
      <FieldGroup>
        <Label htmlFor="city">Cidade</Label>
        <Input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
      </FieldGroup>

      {/* Campos em linha: CEP e Número */}
      <FieldRow>
        <FieldGroup>
          <Label htmlFor="zipCode">CEP</Label>
          <Input
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder="00000-000"
            value={formData.zipCode}
            onChange={handleChange}
          />
          {errors.zipCode && <ErrorMessage>{errors.zipCode}</ErrorMessage>}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="number">Número</Label>
          <Input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
          {errors.number && <ErrorMessage>{errors.number}</ErrorMessage>}
        </FieldGroup>
      </FieldRow>

      {/* Campo opcional: Complemento */}
      <FieldGroup>
        <Label htmlFor="complement">Complemento (opcional)</Label>
        <Input
          type="text"
          id="complement"
          name="complement"
          value={formData.complement}
          onChange={handleChange}
        />
        {errors.complement && <ErrorMessage>{errors.complement}</ErrorMessage>}
      </FieldGroup>

      {/* Botões */}
      <ButtonContainer>
        <PrimaryButton type="submit">
          Continuar com o pagamento
        </PrimaryButton>
        <SecondaryButton type="button" onClick={onBack}>
          Voltar para o carrinho
        </SecondaryButton>
      </ButtonContainer>
    </FormContainer>
  );
}

export default DeliveryForm;
