// Componente Header - Cabeçalho reutilizável
// Exibe logo, navegação e contador do carrinho

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/GlobalStyles';
import logo from '../../assets/images/logo.png';

// Container do header
const HeaderContainer = styled.header`
  background-color: ${theme.colors.background};
  padding: 24px 0;
`;

// Wrapper interno para centralizar conteúdo
const HeaderWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Link de navegação
const NavLink = styled(Link)`
  color: ${theme.colors.primary};
  font-size: 18px;
  font-weight: 700;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

// Container da logo (centralizado)
const LogoContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

// Imagem da logo
const LogoImage = styled.img`
  height: 40px;
`;

// Contador do carrinho (botão clicável)
const CartCounter = styled.button`
  color: ${theme.colors.primary};
  font-size: 18px;
  font-weight: 700;
  background: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

// Componente Header
// Props: cartItemsCount - número de itens no carrinho
// Props: onCartClick - função chamada ao clicar no carrinho
function Header({ cartItemsCount = 0, onCartClick }) {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        {/* Link para página de restaurantes */}
        <NavLink to="/">Restaurantes</NavLink>

        {/* Logo centralizada */}
        <LogoContainer>
          <Link to="/">
            <LogoImage src={logo} alt="efood - Delivery de comida" />
          </Link>
        </LogoContainer>

        {/* Contador do carrinho (clicável) */}
        <CartCounter onClick={onCartClick}>
          {cartItemsCount} produto(s) no carrinho
        </CartCounter>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default Header;
