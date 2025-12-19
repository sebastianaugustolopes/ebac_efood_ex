// Página Home - Lista de restaurantes
// Exibe header, banner, grid de restaurantes e footer

import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RestaurantCard from '../../components/RestaurantCard';
import CartSidebar from '../../components/Cart/CartSidebar';
import restaurants from '../../data/restaurants';

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

// Componente Home
// Props: cartItems, setCartItems para gerenciar carrinho global
function Home({ cartItems, setCartItems }) {
  // Estado do sidebar do carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Remove item do carrinho
  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Limpa o carrinho
  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      {/* Header com contador do carrinho */}
      <Header 
        cartItemsCount={cartItems.length} 
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
        <RestaurantGrid>
          {restaurants.map(restaurant => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
            />
          ))}
        </RestaurantGrid>
      </MainContainer>

      {/* Footer */}
      <Footer />

      {/* Sidebar do carrinho */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </>
  );
}

export default Home;
