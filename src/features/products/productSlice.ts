import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type IProduct } from "../../interfaces";

interface ProductState {
  selectedProduct: IProduct[];
}

const initialState: ProductState = {
  selectedProduct: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct(state, action: PayloadAction<IProduct[]>) {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct } = productSlice.actions;
