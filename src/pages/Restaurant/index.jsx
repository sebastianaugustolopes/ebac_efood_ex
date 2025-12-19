
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PizzaCard from '../../components/PizzaCard';
import Modal from '../../components/Modal';
import CartSidebar from '../../components/Cart/CartSidebar';
import { fetchRestaurantById } from '../../services/api';
import { addItem, removeItem, selectCartItemsCount } from '../../store/cartSlice';
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

// Mensagem de loading
const LoadingMessage = styled.p`
  text-align: center;
  color: ${theme.colors.white};
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

// Componente Restaurant
function Restaurant() {
  // Obtém o ID do restaurante da URL
  const { id } = useParams();
  
  // Dispatch e selectors do Redux
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(selectCartItemsCount);

  // Estados para gerenciar os dados da API
  const [restaurant, setRestaurant] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado do modal de pizza
  const [selectedPizza, setSelectedPizza] = useState(null);

  // Estado do sidebar do carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Busca dados do restaurante da API ao montar o componente
  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRestaurantById(id);
        setRestaurant(data);
        // Os pratos vêm no campo 'cardapio' do restaurante
        setPizzas(data.cardapio || []);
      } catch (err) {
        setError('Erro ao carregar restaurante. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadRestaurant();
    }
  }, [id]);

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
    dispatch(addItem(pizza));
    // Abre o carrinho automaticamente
    setIsCartOpen(true);
  };

  // Remove item do carrinho
  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  };

  // Se estiver carregando
  if (loading) {
    return (
      <>
        <Header 
          onCartClick={() => setIsCartOpen(true)}
        />
        <RestaurantBanner>
          <LoadingMessage>Carregando restaurante...</LoadingMessage>
        </RestaurantBanner>
        <Footer />
      </>
    );
  }

  // Se houver erro ou não encontrar o restaurante
  if (error || !restaurant) {
    return (
      <>
        <Header 
          onCartClick={() => setIsCartOpen(true)}
        />
        <MainContainer>
          <ErrorMessage>{error || 'Restaurante não encontrado.'}</ErrorMessage>
        </MainContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Header com contador do carrinho */}
      <Header 
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Banner do restaurante */}
      <RestaurantBanner>
        <RestaurantCategory>{restaurant.category}</RestaurantCategory>
        <RestaurantName>{restaurant.name}</RestaurantName>
      </RestaurantBanner>

      {/* Grid de pizzas */}
      <MainContainer>
        {pizzas.length > 0 ? (
          <PizzaGrid>
            {pizzas.map(pizza => (
              <PizzaCard
                key={pizza.id}
                pizza={pizza}
                onAddClick={handlePizzaClick}
              />
            ))}
          </PizzaGrid>
        ) : (
          <ErrorMessage>Nenhum prato disponível no momento.</ErrorMessage>
        )}
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
        onRemove={handleRemoveItem}
      />
    </>
  );
}

export default Restaurant;
