// Dados mockados das pizzas
// Array estático com informações de 6 pizzas do menu

import pizzaMargherita from '../assets/images/pizza-margherita.jpg';
import pizzaPepperoni from '../assets/images/pizza-pepperoni.jpg';
import pizzaQuatroQueijos from '../assets/images/pizza-quatro-queijos.jpg';
import pizzaVegetariana from '../assets/images/pizza-vegetariana.jpg';
import pizzaPortuguesa from '../assets/images/pizza-portuguesa.jpg';
import pizzaCalabresa from '../assets/images/pizza-calabresa.jpg';

const pizzas = [
  {
    id: 1,
    name: 'Pizza Margherita',
    description: 'A clássica Margherita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    price: 60.90,
    image: pizzaMargherita,
  },
  {
    id: 2,
    name: 'Pizza Pepperoni',
    description: 'Fatias generosas de pepperoni levemente apimentado sobre queijo mussarela derretido e molho de tomate especial da casa.',
    price: 69.90,
    image: pizzaPepperoni,
  },
  {
    id: 3,
    name: 'Pizza Quatro Queijos',
    description: 'Uma combinação irresistível de mussarela, gorgonzola, parmesão e catupiry. Para os verdadeiros amantes de queijo!',
    price: 74.90,
    image: pizzaQuatroQueijos,
  },
  {
    id: 4,
    name: 'Pizza Vegetariana',
    description: 'Cogumelos frescos, pimentões coloridos, azeitonas, cebola roxa e tomates. Saudável e deliciosa!',
    price: 64.90,
    image: pizzaVegetariana,
  },
  {
    id: 5,
    name: 'Pizza Portuguesa',
    description: 'Presunto, ovos, cebola, azeitonas e pimentão sobre uma base cremosa de mussarela. Tradição que nunca sai de moda!',
    price: 67.90,
    image: pizzaPortuguesa,
  },
  {
    id: 6,
    name: 'Pizza Calabresa',
    description: 'Calabresa fatiada artesanalmente, cebola caramelizada e azeitonas. O sabor marcante que você ama!',
    price: 62.90,
    image: pizzaCalabresa,
  },
];

export default pizzas;
