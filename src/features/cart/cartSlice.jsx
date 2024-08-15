import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, product } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)); 
    },
    removeItem(state, action) {
      const { id } = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(state.items)); 
    },
    changeQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
