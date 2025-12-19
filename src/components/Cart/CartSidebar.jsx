// Componente CartSidebar - Sidebar do carrinho
// Gerencia os passos: carrinho, entrega e pagamento

import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../styles/GlobalStyles';
import { selectCartItems, clearCart } from '../../store/cartSlice';
import CartItems from './CartItems';
import DeliveryForm from './DeliveryForm';
import PaymentForm from './PaymentForm';

// Overlay escuro de fundo
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.overlay};
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
`;

// Container do sidebar
const SidebarContainer = styled.aside`
  background-color: ${theme.colors.primary};
  width: 360px;
  height: 100%;
  padding: 32px 8px;
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

// Botão de fechar
const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 370px;
  background: none;
  color: ${theme.colors.white};
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    right: 8px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

// Componente CartSidebar
// Props: isOpen - controla visibilidade
// Props: onClose - função para fechar
// Props: onRemove - função para remover item
function CartSidebar({ isOpen, onClose, onRemove }) {
  // Navegação
  const navigate = useNavigate();
  
  // Dispatch e selectors do Redux
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  // Estado do passo atual: 'cart' | 'delivery' | 'payment'
  const [step, setStep] = useState('cart');

  // Estado dos dados de entrega
  const [deliveryData, setDeliveryData] = useState(null);

  // Fecha ao clicar no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Avança para entrega
  const handleContinueToDelivery = () => {
    setStep('delivery');
  };

  // Avança para pagamento
  const handleContinueToPayment = () => {
    setStep('payment');
  };

  // Volta para carrinho
  const handleBackToCart = () => {
    setStep('cart');
  };

  // Volta para entrega
  const handleBackToDelivery = () => {
    setStep('delivery');
  };

  // Finaliza o pedido
  const handleFinishOrder = () => {
    // Limpa o carrinho e redireciona
    dispatch(clearCart());
    onClose();
    navigate('/order-success');
  };

  // Não renderiza se não estiver aberto
  if (!isOpen) return null;

  return (
    <Overlay onClick={handleOverlayClick}>
      <CloseButton onClick={onClose} aria-label="Fechar carrinho">
        ✕
      </CloseButton>

      <SidebarContainer>
        {/* Renderiza o passo atual */}
        {step === 'cart' && (
          <CartItems
            items={items}
            onRemove={onRemove}
            onContinue={handleContinueToDelivery}
          />
        )}

        {step === 'delivery' && (
          <DeliveryForm
            onContinue={handleContinueToPayment}
            onBack={handleBackToCart}
            initialData={deliveryData}
            onSaveData={setDeliveryData}
          />
        )}

        {step === 'payment' && (
          <PaymentForm
            onFinish={handleFinishOrder}
            onBack={handleBackToDelivery}
          />
        )}
      </SidebarContainer>
    </Overlay>
  );
}

export default CartSidebar;
