import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/orders/orderSlice";
import productReducer from "./features/products/productSlice";
const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
  },
});

export default store;
