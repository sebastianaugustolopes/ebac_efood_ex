// Componente PaymentForm - Formulário de pagamento
// Coleta dados do cartão com validação Zod

import { useState } from 'react';
import styled from 'styled-components';
import paymentSchema from '../../schemas/paymentSchema';
import { theme } from '../../styles/GlobalStyles';
import { createOrder } from '../../services/api';

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

// Campo de três colunas
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

// Função para formatar preço em reais
function formatPrice(price) {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

// Componente PaymentForm
// Props: onFinish - função para finalizar pagamento (recebe os dados do formulário e a resposta da API)
// Props: onBack - função para voltar à entrega
// Props: total - valor total do pedido
// Props: deliveryData - dados de entrega
// Props: cartItems - itens do carrinho
function PaymentForm({ onFinish, onBack, total = 0, deliveryData, cartItems }) {
  // Estado do formulário
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: '',
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

  // Estado de loading
  const [isLoading, setIsLoading] = useState(false);

  // Submete o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida com Zod
    const result = paymentSchema.safeParse(formData);

    if (!result.success) {
      // Mapeia erros do Zod
      const newErrors = {};
      result.error.errors.forEach(err => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    // Prepara dados do pedido para enviar à API
    const orderData = {
      products: cartItems.map(item => ({
        id: item.id,
        price: item.price,
      })),
      delivery: {
        receiver: deliveryData?.receiver || '',
        address: {
          description: deliveryData?.address || '',
          city: deliveryData?.city || '',
          zipCode: deliveryData?.zipCode || '',
          number: deliveryData?.number || '',
          complement: deliveryData?.complement || '',
        },
      },
      payment: {
        card: {
          name: formData.cardName,
          number: formData.cardNumber,
          code: formData.cvv,
          expires: {
            month: formData.expiryMonth,
            year: formData.expiryYear,
          },
        },
      },
    };

    try {
      setIsLoading(true);
      // Faz POST para a API
      const response = await createOrder(orderData);
      // Passa a resposta da API para o handler
      onFinish(response);
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      setErrors({ submit: 'Erro ao finalizar pedido. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Pagamento - Valor a pagar: {formatPrice(total)}</FormTitle>

      {/* Campo: Nome no cartão */}
      <FieldGroup>
        <Label htmlFor="cardName">Nome no cartão</Label>
        <Input
          type="text"
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
        />
        {errors.cardName && <ErrorMessage>{errors.cardName}</ErrorMessage>}
      </FieldGroup>

      {/* Campos em linha: Número e CVV */}
      <FieldRow>
        <FieldGroup style={{ flex: 2 }}>
          <Label htmlFor="cardNumber">Número do cartão</Label>
          <Input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="4111 1111 1111 1111"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
        </FieldGroup>

        <FieldGroup style={{ flex: 1 }}>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="000"
            value={formData.cvv}
            onChange={handleChange}
          />
          {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
        </FieldGroup>
      </FieldRow>

      {/* Campos em linha: Mês e Ano de vencimento */}
      <FieldRow>
        <FieldGroup>
          <Label htmlFor="expiryMonth">Mês de vencimento</Label>
          <Input
            type="text"
            id="expiryMonth"
            name="expiryMonth"
            placeholder="MM"
            value={formData.expiryMonth}
            onChange={handleChange}
          />
          {errors.expiryMonth && <ErrorMessage>{errors.expiryMonth}</ErrorMessage>}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="expiryYear">Ano de vencimento</Label>
          <Input
            type="text"
            id="expiryYear"
            name="expiryYear"
            placeholder="AA"
            value={formData.expiryYear}
            onChange={handleChange}
          />
          {errors.expiryYear && <ErrorMessage>{errors.expiryYear}</ErrorMessage>}
        </FieldGroup>
      </FieldRow>

      {/* Mensagem de erro de submissão */}
      {errors.submit && (
        <ErrorMessage style={{ marginTop: '8px' }}>
          {errors.submit}
        </ErrorMessage>
      )}

      {/* Botões */}
      <ButtonContainer>
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? 'Processando...' : 'Finalizar pagamento'}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={onBack} disabled={isLoading}>
          Voltar para a edição de endereço
        </SecondaryButton>
      </ButtonContainer>
    </FormContainer>
  );
}

export default PaymentForm;
