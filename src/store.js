import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/orders/orderSlice";
import productReducer from "./features/products/productSlice";
import customerReducer from "./features/customers/customerSlice";
const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
    customer: customerReducer,
  },
});

export default store;
