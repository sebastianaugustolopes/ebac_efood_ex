// Página OrderSuccess - Pedido finalizado
// Exibe mensagem de sucesso e informações do pedido

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

// Componente OrderSuccess
function OrderSuccess() {
  return (
    <>
      {/* Header sem contador (carrinho vazio) */}
      <Header cartItemsCount={0} />

      {/* Conteúdo principal */}
      <MainContainer>
        <PageTitle>Pedido realizado - ORDER_ID</PageTitle>

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
