// Página OrderSuccess - Pedido finalizado
// Exibe mensagem de sucesso e informações do pedido

import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Container principal
const MainContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 16px;
  min-height: 60vh;
`;

// Título da página
const PageTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

// Parágrafo de texto
const Paragraph = styled.p`
  color: ${theme.colors.text};
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 24px;
`;

// Botão para voltar
const BackButton = styled(Link)`
  display: inline-block;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  margin-top: 24px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #D45656;
  }
`;

// Container de informações do pedido
const OrderInfo = styled.div`
  background-color: ${theme.colors.primaryLight};
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
`;

// Título da seção
const SectionTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

// Informação do pedido
const InfoRow = styled.div`
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  min-width: 120px;
`;

const InfoValue = styled.span`
  color: ${theme.colors.text};
  font-size: 14px;
`;

// Função para formatar preço
function formatPrice(price) {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

// Função para formatar endereço
function formatAddress(address) {
  const parts = [
    address.description,
    `Nº ${address.number}`,
    address.complement && address.complement.trim() ? `- ${address.complement}` : null,
    address.city,
    address.zipCode,
  ].filter(Boolean);
  
  return parts.join(', ');
}

// Componente OrderSuccess
function OrderSuccess() {
  const location = useLocation();
  const orderData = location.state?.orderData;

  // Se não houver dados do pedido, redireciona para home
  if (!orderData) {
    return (
      <>
        <Header />
        <MainContainer>
          <PageTitle>Pedido não encontrado</PageTitle>
          <Paragraph>
            Não foi possível encontrar as informações do pedido.
          </Paragraph>
          <BackButton to="/">
            Voltar para a página inicial
          </BackButton>
        </MainContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Header sem contador (carrinho vazio) */}
      <Header />

      {/* Conteúdo principal */}
      <MainContainer>
        <PageTitle>Pedido realizado - {orderData.orderId || 'N/A'}</PageTitle>

        {/* Informações do pedido */}
        {orderData && (
          <OrderInfo>
            <SectionTitle>Informações do Pedido</SectionTitle>
            
            {orderData.orderId && (
              <InfoRow>
                <InfoLabel>Pedido:</InfoLabel>
                <InfoValue>{orderData.orderId}</InfoValue>
              </InfoRow>
            )}

            {orderData.delivery && (
              <>
                <InfoRow>
                  <InfoLabel>Recebedor:</InfoLabel>
                  <InfoValue>{orderData.delivery.receiver}</InfoValue>
                </InfoRow>
                
                {orderData.delivery.address && (
                  <InfoRow>
                    <InfoLabel>Endereço:</InfoLabel>
                    <InfoValue>{formatAddress(orderData.delivery.address)}</InfoValue>
                  </InfoRow>
                )}

                {orderData.delivery.deliveryTime && (
                  <InfoRow>
                    <InfoLabel>Previsão de entrega:</InfoLabel>
                    <InfoValue>{orderData.delivery.deliveryTime}</InfoValue>
                  </InfoRow>
                )}
              </>
            )}

            {orderData.payment && orderData.payment.total && (
              <InfoRow>
                <InfoLabel>Total:</InfoLabel>
                <InfoValue>{formatPrice(orderData.payment.total)}</InfoValue>
              </InfoRow>
            )}
          </OrderInfo>
        )}

        <Paragraph>
          Estamos felizes em informar que seu pedido já está em processo de preparação e, 
          em breve, será entregue no endereço fornecido.
        </Paragraph>

        <Paragraph>
          Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar 
          cobranças extras.
        </Paragraph>

        <Paragraph>
          Lembre-se da importância de higienizar as mãos após o recebimento do pedido, 
          garantindo assim sua segurança e bem-estar durante a refeição.
        </Paragraph>

        <Paragraph>
          Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. 
          Bom apetite!
        </Paragraph>

        {/* Botão para voltar à home */}
        <BackButton to="/">
          Voltar para a página inicial
        </BackButton>
      </MainContainer>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default OrderSuccess;
