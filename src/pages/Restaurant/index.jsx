// Página Restaurant - Perfil do restaurante
// Exibe banner, menu de pizzas e modal de detalhes

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PizzaCard from '../../components/PizzaCard';
import Modal from '../../components/Modal';
import CartSidebar from '../../components/Cart/CartSidebar';
import restaurants from '../../data/restaurants';
import pizzas from '../../data/pizzas';
import bannerImage from '../../assets/images/restaurant-banner.jpg';

// Banner do restaurante
const RestaurantBanner = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerImage});
  background-size: cover;
  background-position: center;
  padding: 24px 16px 32px;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// Categoria do restaurante
const RestaurantCategory = styled.span`
  color: ${theme.colors.white};
  font-size: 32px;
  font-weight: 100;
`;

// Nome do restaurante
const RestaurantName = styled.h1`
  color: ${theme.colors.white};
  font-size: 32px;
  font-weight: 700;
`;

// Container principal
const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 16px 120px;
`;

// Grid de pizzas
const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

// Componente Restaurant
// Props: cartItems, setCartItems para gerenciar carrinho global
function Restaurant({ cartItems, setCartItems }) {
  // Obtém o ID do restaurante da URL
  const { id } = useParams();

  // Busca o restaurante pelo ID
  const restaurant = restaurants.find(r => r.id === parseInt(id));

  // Estado do modal de pizza
  const [selectedPizza, setSelectedPizza] = useState(null);

  // Estado do sidebar do carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Abre modal com detalhes da pizza
  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
  };

  // Fecha o modal
  const handleCloseModal = () => {
    setSelectedPizza(null);
  };

  // Adiciona pizza ao carrinho
  const handleAddToCart = (pizza) => {
    setCartItems(prev => [...prev, pizza]);
    // Abre o carrinho automaticamente
    setIsCartOpen(true);
  };

  // Remove item do carrinho
  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Limpa o carrinho
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Se não encontrar o restaurante
  if (!restaurant) {
    return (
      <>
        <Header 
          cartItemsCount={cartItems.length} 
          onCartClick={() => setIsCartOpen(true)}
        />
        <MainContainer>
          <p>Restaurante não encontrado.</p>
        </MainContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Header com contador do carrinho */}
      <Header 
        cartItemsCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Banner do restaurante */}
      <RestaurantBanner>
        <RestaurantCategory>{restaurant.category}</RestaurantCategory>
        <RestaurantName>{restaurant.name}</RestaurantName>
      </RestaurantBanner>

      {/* Grid de pizzas */}
      <MainContainer>
        <PizzaGrid>
          {pizzas.map(pizza => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              onAddClick={handlePizzaClick}
            />
          ))}
        </PizzaGrid>
      </MainContainer>

      {/* Footer */}
      <Footer />

      {/* Modal de detalhes da pizza */}
      {selectedPizza && (
        <Modal
          pizza={selectedPizza}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}

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

export default Restaurant;
