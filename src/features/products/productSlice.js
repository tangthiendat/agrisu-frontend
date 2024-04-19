import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduct: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
