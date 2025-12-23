// Configuração de rotas

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Restaurant from '../pages/Restaurant';
import OrderSuccess from '../pages/OrderSuccess';

// Componente de rotas
function AppRoutes() {
  return (
    <Routes>
      {/* Página inicial - lista de restaurantes */}
      <Route 
        path="/" 
        element={<Home />} 
      />

      {/* Página do restaurante - menu de pizzas */}
      <Route 
        path="/restaurant/:id" 
        element={<Restaurant />} 
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
