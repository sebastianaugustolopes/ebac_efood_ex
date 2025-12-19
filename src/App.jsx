import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import AppRoutes from './routes/AppRoutes';

// Componente App
function App() {
  // Estado global do carrinho
  // Armazena array de pizzas adicionadas
  const [cartItems, setCartItems] = useState([]);

  return (
    // Provider do React Router
    <BrowserRouter>
      {/* Estilos globais */}
      <GlobalStyles />

      {/* Rotas da aplicação */}
      <AppRoutes 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
      />
    </BrowserRouter>
  );
}

export default App;
