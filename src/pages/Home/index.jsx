// Página Home - Lista de restaurantes
// Exibe header, banner, grid de restaurantes e footer

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RestaurantCard from '../../components/RestaurantCard';
import CartSidebar from '../../components/Cart/CartSidebar';
import { fetchRestaurants } from '../../services/api';
import { removeItem } from '../../store/cartSlice';

// Banner da home
const HeroBanner = styled.section`
  background-color: ${theme.colors.primaryLight};
  padding: 64px 16px;
  text-align: center;
`;

// Título do banner
const HeroTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: 36px;
  font-weight: 700;
  line-height: 1.3;
  max-width: 540px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 28px;
  }
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
        setError('Erro ao carregar restaurantes. Tente novamente mais tarde.');
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
      {/* Header com contador do carrinho */}
      <Header 
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Banner principal */}
      <HeroBanner>
        <HeroTitle>
          Viva experiências gastronômicas no conforto da sua casa
        </HeroTitle>
      </HeroBanner>

      {/* Grid de restaurantes */}
      <MainContainer>
        {loading && <LoadingMessage>Carregando restaurantes...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && (
          <RestaurantGrid>
            {restaurants.map(restaurant => (
              <RestaurantCard 
                key={restaurant.id} 
                restaurant={restaurant} 
              />
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
