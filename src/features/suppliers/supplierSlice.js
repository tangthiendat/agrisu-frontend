import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSupplier: [],
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setSelectedSupplier(state, action) {
      state.selectedSupplier = action.payload;
    },
  },
});

export const { setSelectedSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;
