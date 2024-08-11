import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
      saveProducts: (state, action) => {
          state.products = action.payload;
      },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
    },
  },
});

export const { setLoading, saveProducts, setError } = productsSlice.actions;
export default productsSlice.reducer;