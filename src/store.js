import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/orders/orderSlice";
const store = configureStore({
  reducer: {
    order: orderReducer,
  },
});

export default store;
