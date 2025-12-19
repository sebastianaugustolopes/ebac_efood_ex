import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyles from './styles/GlobalStyles';
import AppRoutes from './routes/AppRoutes';
import { store } from './store/store';

function App() {
  return (
    // Provider do Redux
    <Provider store={store}>
      {/* Provider do React Router */}
      <BrowserRouter>
        {/* Estilos globais */}
        <GlobalStyles />

        {/* Rotas da aplicação */}
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
