  import { createSlice } from '@reduxjs/toolkit';

  const initialState = {
    items: [],
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
      },
      removeItem(state, action) {
        const { id } = action.payload;
        state.items = state.items.filter(item => item.id !== id);
      },
      changeQuantity(state, action) {
        const { id, quantity } = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      },
      clearCart(state) {
        state.items = [];
      },
    },
  });

  export const { addItem, removeItem, changeQuantity, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;
