// Componente CartItems - Lista de itens do carrinho
// Exibe as pizzas adicionadas e o valor total

import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

// Container dos itens
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Título do carrinho
const CartTitle = styled.h2`
  color: ${theme.colors.primaryLight};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
`;

// Item individual
const CartItem = styled.div`
  display: flex;
  gap: 8px;
  background-color: ${theme.colors.primaryLight};
  padding: 8px;
`;

// Imagem do item
const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

// Informações do item
const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Nome do item
const ItemName = styled.h3`
  color: ${theme.colors.primary};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

// Preço do item
const ItemPrice = styled.p`
  color: ${theme.colors.primary};
  font-size: 14px;
`;

// Botão de remover
const RemoveButton = styled.button`
  background: none;
  color: ${theme.colors.primary};
  font-size: 20px;
  align-self: flex-end;
  padding: 0 8px;

  &:hover {
    opacity: 0.7;
  }
`;

// Container do total
const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
`;

// Texto do total
const TotalText = styled.p`
  color: ${theme.colors.primaryLight};
  font-size: 14px;
  font-weight: 700;
`;

// Botão de continuar
const ContinueButton = styled.button`
  width: 100%;
  background-color: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 700;
  padding: 4px;
  margin-top: 16px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Mensagem de carrinho vazio
const EmptyMessage = styled.p`
  color: ${theme.colors.primaryLight};
  font-size: 14px;
  text-align: center;
  padding: 32px 0;
`;

// Função para formatar preço em reais
function formatPrice(price) {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

// Componente CartItems
// Props: items - array de itens do carrinho
// Props: onRemove - função para remover item
// Props: onContinue - função para continuar com a entrega
function CartItems({ items, onRemove, onContinue }) {
  // Calcula o total
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <ItemsContainer>
      <CartTitle>Carrinho</CartTitle>

      {/* Lista de itens ou mensagem vazia */}
      {items.length === 0 ? (
        <EmptyMessage>
          Seu carrinho está vazio. Adicione algumas pizzas deliciosas!
        </EmptyMessage>
      ) : (
        <>
          {items.map((item, index) => (
            <CartItem key={`${item.id}-${index}`}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{formatPrice(item.price)}</ItemPrice>
              </ItemInfo>
              <RemoveButton 
                onClick={() => onRemove(index)}
                aria-label="Remover item"
              >
                🗑
              </RemoveButton>
            </CartItem>
          ))}

          {/* Total */}
          <TotalContainer>
            <TotalText>Valor total</TotalText>
            <TotalText>{formatPrice(total)}</TotalText>
          </TotalContainer>

          {/* Botão de continuar */}
          <ContinueButton onClick={onContinue}>
            Continuar com a entrega
          </ContinueButton>
        </>
      )}
    </ItemsContainer>
  );
}

export default CartItems;
