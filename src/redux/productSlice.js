import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
        return action.payload;
    },
  },
});

export const { addProduct} = productSlice.actions;
export default productSlice.reducer;
