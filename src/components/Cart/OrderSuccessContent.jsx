// Componente OrderSuccessContent - Mensagem de pedido concluído
// Exibe no sidebar após finalizar o pedido

import styled from "styled-components";
import { theme } from "../../styles/GlobalStyles";

// Container do conteúdo
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  width: 100%;
  color: #e66767;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  align-self: flex-start;
  margin-top: 8px;

  &:hover {
    opacity: 0.9;
  }
`;

// Componente OrderSuccessContent
// Props: orderData - dados da resposta da API
// Props: onConclude - função chamada ao clicar em "Concluir"
function OrderSuccessContent({ orderData, onConclude }) {
  // Extrai o ID do pedido da resposta da API
  const orderId = orderData?.orderId || orderData?.id || "N/A";

  return (
    <ContentContainer>
      {/* Título com ID do pedido */}
      <OrderTitle>Pedido realizado - {orderId}</OrderTitle>

      {/* Parágrafos de informação */}
      <Paragraph>
        Estamos felizes em informar que seu pedido já está em processo de
        preparação e, em breve, será entregue no endereço fornecido.
      </Paragraph>

      <Paragraph>
        Gostaríamos de ressaltar que nossos entregadores não estão autorizados a
        realizar cobranças extras.
      </Paragraph>

      <Paragraph>
        Lembre-se da importância de higienizar as mãos após o recebimento do
        pedido, garantindo assim sua segurança e bem-estar durante a refeição.
      </Paragraph>

      <Paragraph>
        Esperamos que desfrute de uma deliciosa e agradável experiência
        gastronômica. Bom apetite!
      </Paragraph>

      {/* Botão de concluir */}
      <ConcludeButton onClick={onConclude}>Concluir</ConcludeButton>
    </ContentContainer>
  );
}

export default OrderSuccessContent;
