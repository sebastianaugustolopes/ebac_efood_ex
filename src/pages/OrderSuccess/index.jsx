// Página OrderSuccess - Pedido finalizado
// Exibe mensagem de sucesso e informações do pedido

import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

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

// Container do modal de confirmação
const ConfirmationContainer = styled.div`
  background-color: #e66767;
  max-width: 1024px;
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 24px 16px;
  }
`;

// Título do pedido
const OrderTitle = styled.h1`
  color: ${theme.colors.white};
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

// Parágrafo de texto
const Paragraph = styled.p`
  color: ${theme.colors.white};
  font-size: 14px;
  line-height: 22px;
  margin: 0;
`;

// Botão de concluir
const ConcludeButton = styled.button`
  background-color: ${theme.colors.white};
  color: #e66767;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  align-self: flex-start;
  margin-top: 8px;

  &:hover {
    opacity: 0.9;
  }
`;

// Componente OrderSuccess
function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  // Se não houver dados do pedido, redireciona para home
  if (!orderData) {
    navigate('/');
    return null;
  }

  // Extrai o ID do pedido da resposta da API
  const orderId = orderData.orderId || orderData.id || 'N/A';

  // Handler para concluir
  const handleConclude = () => {
    navigate('/');
  };

  return (
    <Overlay>
      <ConfirmationContainer>
        {/* Título com ID do pedido */}
        <OrderTitle>Pedido realizado - {orderId}</OrderTitle>

        {/* Parágrafos de informação */}
        <Paragraph>
          Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.
        </Paragraph>

        <Paragraph>
          Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.
        </Paragraph>

        <Paragraph>
          Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
        </Paragraph>

        <Paragraph>
          Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!
        </Paragraph>

        {/* Botão de concluir */}
        <ConcludeButton onClick={handleConclude}>
          Concluir
        </ConcludeButton>
      </ConfirmationContainer>
    </Overlay>
  );
}

export default OrderSuccess;
