// Serviço de API para buscar dados dos restaurantes

const API_BASE_URL = 'https://api-ebac.vercel.app/api/efood';

const transformRestaurant = (restaurant) => {
  return {
    id: restaurant.id,
    name: restaurant.titulo,
    description: restaurant.descricao,
    rating: restaurant.avaliacao,
    category: restaurant.tipo,
    highlight: restaurant.destacado ? 'Destaque da semana' : null,
    image: restaurant.capa,
    cardapio: restaurant.cardapio ? restaurant.cardapio.map(transformDish) : []
  };
};

const transformDish = (dish) => {
  return {
    id: dish.id,
    name: dish.nome,
    description: dish.descricao,
    price: dish.preco,
    image: dish.foto,
    porcao: dish.porcao
  };
};

// Busca todos os restaurantes
export const fetchRestaurants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurantes`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar restaurantes: ${response.status}`);
    }
    
    const data = await response.json();
    // A API retorna um objeto com 'value' contendo o array de restaurantes
    const restaurants = data.value || data;
    return restaurants.map(transformRestaurant);
  } catch (error) {
    console.error('Erro ao buscar restaurantes:', error);
    throw error;
  }
};

// Busca um restaurante específico por ID
export const fetchRestaurantById = async (id) => {
  try {
    // Primeiro busca todos os restaurantes e depois filtra pelo ID
    const restaurants = await fetchRestaurants();
    const restaurant = restaurants.find(r => r.id === parseInt(id));
    
    if (!restaurant) {
      throw new Error('Restaurante não encontrado');
    }
    
    return restaurant;
  } catch (error) {
    console.error('Erro ao buscar restaurante:', error);
    throw error;
  }
};

