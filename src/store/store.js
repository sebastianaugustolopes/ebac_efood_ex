// Configuração da store do Redux
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Configura e exporta a store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

