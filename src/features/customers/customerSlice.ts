import { createSlice } from "@reduxjs/toolkit";
import { type ICustomer } from "../../interfaces";

interface CustomerState {
  selectedCustomer: ICustomer[];
}

const initialState: CustomerState = {
  selectedCustomer: [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setSelectedCustomer(state, action) {
      state.selectedCustomer = action.payload;
    },
  },
});

export const { setSelectedCustomer } = customerSlice.actions;
