import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type ISupplier } from "../../interfaces";

interface SupplierState {
  selectedSupplier: ISupplier[];
}

const initialState: SupplierState = {
  selectedSupplier: [],
};

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setSelectedSupplier(state, action: PayloadAction<ISupplier[]>) {
      state.selectedSupplier = action.payload;
    },
  },
});

export const { setSelectedSupplier } = supplierSlice.actions;
