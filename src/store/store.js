import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/product/brandSlice';
import colorReducer from '../features/product/colorSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    brands: brandReducer,
    colors: colorReducer,
  },
});
