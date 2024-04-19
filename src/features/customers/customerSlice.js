import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCustomer: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setSelectedCustomer(state, action) {
      state.selectedCustomer = action.payload;
    },
  },
});

export const { setSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;
