// Componente Modal - Modal reutilizável
// Exibe detalhes de uma pizza com opção de adicionar ao carrinho

import styled from "styled-components";
import { theme } from "../../styles/GlobalStyles";

// Overlay escuro de fundo
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

// Container do modal
const ModalContainer = styled.div`
  background-color: #e66767;
  max-width: 1024px;
  width: 100%;
  display: flex;
  gap: 24px;
  padding: 32px;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    padding: 16px;
  }
`;

// Botão de fechar
const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  color: ${theme.colors.white};
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

// Imagem da pizza
const ModalImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    height: 200px;
  }
`;

// Conteúdo do modal
const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Título
const ModalTitle = styled.h2`
  color: ${theme.colors.white};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

// Descrição
const ModalDescription = styled.p`
  color: ${theme.colors.white};
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
`;

// Botão de adicionar com preço
const AddButton = styled.button`
  background-color: #ffebd9;
  color: #e66767;
  border: 1px solid #e66767;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  transition: opacity 0.3s ease;
  margin-top: auto;
  align-self: flex-start;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// Função para formatar preço em reais
function formatPrice(price) {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

// Componente Modal
// Props: pizza - objeto com dados da pizza
// Props: onClose - função para fechar o modal
// Props: onAddToCart - função para adicionar ao carrinho
function Modal({ pizza, onClose, onAddToCart }) {
  // Fecha ao clicar no overlay (fora do modal)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Adiciona ao carrinho e fecha o modal
  const handleAddToCart = () => {
    onAddToCart(pizza);
    onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        {/* Botão de fechar */}
        <CloseButton onClick={onClose} aria-label="Fechar modal">
          ✕
        </CloseButton>

        {/* Imagem */}
        <ModalImage src={pizza.image} alt={pizza.name} />

        {/* Conteúdo */}
        <ModalContent>
          <ModalTitle>{pizza.name}</ModalTitle>
          <ModalDescription>{pizza.description}</ModalDescription>
          {pizza.porcao && (
            <ModalDescription>Serve: {pizza.porcao}</ModalDescription>
          )}
          <AddButton onClick={handleAddToCart}>
            Adicionar ao carrinho - {formatPrice(pizza.price)}
          </AddButton>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;
