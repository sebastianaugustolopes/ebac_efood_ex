// Página Home - Lista de restaurantes
// Exibe banner com logo, grid de restaurantes e footer

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../styles/GlobalStyles";
import Footer from "../../components/Footer";
import RestaurantCard from "../../components/RestaurantCard";
import CartSidebar from "../../components/Cart/CartSidebar";
import { fetchRestaurants } from "../../services/api";
import { removeItem } from "../../store/cartSlice";
import logo from "../../assets/images/logo.png";

// Banner da home com padrão de fundo
const HeroBanner = styled.section`
  background-color: #ffebd9;
  padding: 64px 16px;
  text-align: center;
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  /* Padrão de garfo e faca usando SVG */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E66767' fill-opacity='0.06'%3E%3Cpath d='M50 15c-2 0-4 1-5 3l-2 4v8h2v-7l2-3c1-1 2-2 3-2s2 1 3 2l2 3v7h2v-8l-2-4c-1-2-3-3-5-3zm-25 5c-1 0-2 1-2 2v15h4V22c0-1-1-2-2-2zm50 0c-1 0-2 1-2 2v15h4V22c0-1-1-2-2-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 1;
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 48px 16px;
    min-height: 350px;
  }
`;

// Container do logo com borda
const LogoContainer = styled.div`
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 32px;
  }
`;

// Link do logo com borda
const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background-color: transparent;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 16px;
  }
`;

// Imagem da logo
const LogoImage = styled.img`
  height: 57px;
  display: block;
  width: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 48px;
  }

  @media (max-width: 480px) {
    height: 40px;
  }
`;

// Título do banner
const HeroTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: 36px;
  font-weight: 700;
  line-height: 1.4;
 
  margin: 0 auto;
  position: relative;
  z-index: 1;
  text-align: center;
  display: block;

`;

// Container principal
const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 16px;
`;

// Grid de restaurantes
const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 80px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

// Mensagem de loading
const LoadingMessage = styled.p`
  text-align: center;
  color: ${theme.colors.primary};
  font-size: 18px;
  padding: 40px;
`;

// Mensagem de erro
const ErrorMessage = styled.p`
  text-align: center;
  color: ${theme.colors.primary};
  font-size: 18px;
  padding: 40px;
`;

// Componente Home
function Home() {
  // Dispatch do Redux
  const dispatch = useDispatch();

  // Estado do sidebar do carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estados para gerenciar os dados da API
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca restaurantes da API ao montar o componente
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError("Erro ao carregar restaurantes. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Remove item do carrinho
  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  };

  return (
    <>
      {/* Banner principal com logo e texto */}
      <HeroBanner>
        <LogoContainer>
          <LogoLink to="/">
            <LogoImage src={logo} alt="efood - Delivery de comida" />
          </LogoLink>
        </LogoContainer>
        <HeroTitle>
          Viva experiências gastronômicas
          <br />
          no conforto da sua casa
        </HeroTitle>
      </HeroBanner>

      {/* Grid de restaurantes */}
      <MainContainer>
        {loading && <LoadingMessage>Carregando restaurantes...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && (
          <RestaurantGrid>
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </RestaurantGrid>
        )}
      </MainContainer>

      {/* Footer */}
      <Footer />

      {/* Sidebar do carrinho */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemoveItem}
      />
    </>
  );
}

export default Home;
