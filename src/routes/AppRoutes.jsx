// Configuração de rotas da aplicação
// Utiliza React Router DOM para navegação

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Restaurant from '../pages/Restaurant';
import OrderSuccess from '../pages/OrderSuccess';

// Componente de rotas
// Props: cartItems, setCartItems - gerenciamento global do carrinho
function AppRoutes({ cartItems, setCartItems }) {
  return (
    <Routes>
      {/* Página inicial - lista de restaurantes */}
      <Route 
        path="/" 
        element={
          <Home 
            cartItems={cartItems} 
            setCartItems={setCartItems} 
          />
        } 
      />

      {/* Página do restaurante - menu de pizzas */}
      <Route 
        path="/restaurant/:id" 
        element={
          <Restaurant 
            cartItems={cartItems} 
            setCartItems={setCartItems} 
          />
        } 
      />

      {/* Página de sucesso do pedido */}
      <Route 
        path="/order-success" 
        element={<OrderSuccess />} 
      />
    </Routes>
  );
}

export default AppRoutes;
