import { createSlice } from '@reduxjs/toolkit';

export const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {
      saveBrands: (state, action) => {
          state.brands = action.payload;
      },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
    },
  },
});

export const { setLoading, saveBrands, setError } = brandSlice.actions;
export default brandSlice.reducer;