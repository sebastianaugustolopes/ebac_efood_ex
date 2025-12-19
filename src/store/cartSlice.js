import { createSlice } from '@reduxjs/toolkit';

// Estado inicial do carrinho
const initialState = {
  items: [], // Array de itens no carrinho
};

// Cria o slice do carrinho
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adiciona um item ao carrinho
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    
    // Remove um item do carrinho pelo índice
    removeItem: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
    
    // Limpa todos os itens do carrinho
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Selector para obter os itens do carrinho
export const selectCartItems = (state) => state.cart.items;

// Selector para obter a quantidade de itens no carrinho
export const selectCartItemsCount = (state) => state.cart.items.length;

// Selector para obter o total do carrinho
export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => total + item.price, 0);
};

export default cartSlice.reducer;

