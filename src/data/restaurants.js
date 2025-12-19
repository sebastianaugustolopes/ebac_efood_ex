// Dados mockados dos restaurantes
// Array estático com informações de 6 restaurantes

import sushiImg from '../assets/images/sushi.jpg';
import pastaImg from '../assets/images/pasta.jpg';
import pizzaImg from '../assets/images/pizza-margherita.jpg';
import burgerImg from '../assets/images/burger.jpg';
import churrascoImg from '../assets/images/churrasco.jpg';
import tacosImg from '../assets/images/tacos.jpg';

const restaurants = [
  {
    id: 1,
    name: 'Hioki Sushi',
    description: 'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.',
    rating: 4.9,
    category: 'Japonesa',
    highlight: 'Destaque da semana',
    image: sushiImg,
  },
  {
    id: 2,
    name: 'La Dolce Vita Trattoria',
    description: 'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e molhos secretos, tudo no conforto da sua lar.',
    rating: 4.6,
    category: 'Italiana',
    highlight: null,
    image: pastaImg,
  },
  {
    id: 3,
    name: 'Pizza Paradise',
    description: 'As melhores pizzas artesanais da cidade! Massa leve, ingredientes frescos e sabores que vão conquistar seu paladar. Experimente nossas receitas exclusivas.',
    rating: 4.8,
    category: 'Italiana',
    highlight: 'Destaque da semana',
    image: pizzaImg,
  },
  {
    id: 4,
    name: 'Burger House',
    description: 'Hambúrgueres gourmet feitos com carnes selecionadas e ingredientes premium. Acompanhamentos deliciosos e molhos artesanais. Uma explosão de sabor!',
    rating: 4.5,
    category: 'Americana',
    highlight: null,
    image: burgerImg,
  },
  {
    id: 5,
    name: 'Churrascaria Gaúcha',
    description: 'O melhor churrasco gaúcho direto na sua casa! Carnes nobres preparadas no ponto perfeito, acompanhadas de farofa, vinagrete e pão de alho.',
    rating: 4.7,
    category: 'Brasileira',
    highlight: null,
    image: churrascoImg,
  },
  {
    id: 6,
    name: 'Taqueria El Mariachi',
    description: 'Sabores autênticos do México! Tacos, burritos, nachos e muito mais. Temperos frescos e receitas tradicionais que vão transportar você direto para o México.',
    rating: 4.4,
    category: 'Mexicana',
    highlight: null,
    image: tacosImg,
  },
];

export default restaurants;
