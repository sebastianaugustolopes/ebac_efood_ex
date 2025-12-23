// Componente CartItems - Lista de itens do carrinho
// Exibe as pizzas adicionadas e o valor total

import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

// Container dos itens
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Item individual
const CartItem = styled.div`
  display: flex;
  gap: 12px;
  background-color: #ffebd9;
  padding: 12px;
  align-items: center;
  position: relative;
`;

// Imagem do item
const ItemImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

// Informações do item
const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// Nome do item
const ItemName = styled.h3`
  color: #e57373;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

// Preço do item
const ItemPrice = styled.p`
  color: #e57373;
  font-size: 14px;
  margin: 0;
`;

// Botão de remover
const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e57373;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  position: absolute;
  bottom: 8px;
  right: 8px;

  &:hover {
    opacity: 0.7;
  }
`;

// Container do total
const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 0 4px;
`;

// Texto do total
const TotalLabel = styled.p`
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`;

// Valor do total
const TotalValue = styled.p`
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

// Botão de continuar
const ContinueButton = styled.button`
  width: 100%;
  background-color: #ffebd9;
  color: #e57373;
  font-size: 14px;
  font-weight: 600;
  padding: 12px;
  margin-top: 12px;
  border: none;
  cursor: pointer;
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
  color: ${theme.colors.white};
  font-size: 14px;
  text-align: center;
  padding: 32px 0;
  margin: 0;
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
                🗑️
              </RemoveButton>
            </CartItem>
          ))}

          {/* Total */}
          <TotalContainer>
            <TotalLabel>Valor total</TotalLabel>
            <TotalValue>{formatPrice(total)}</TotalValue>
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