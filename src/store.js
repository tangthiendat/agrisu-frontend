import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/orders/orderSlice";
import productReducer from "./features/products/productSlice";
import customerReducer from "./features/customers/customerSlice";
import goodReceiptReducer from "./features/good-receipts/goodReceiptSlice";
const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
    customer: customerReducer,
    goodReceipt: goodReceiptReducer,
  },
});

export default store;
