import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/orders/orderSlice";
import productReducer from "./features/products/productSlice";
import customerReducer from "./features/customers/customerSlice";
import warehouseReceiptReducer from "./features/warehouse-receipts/warehouseReceiptSlice";
import warehouseExportReducer from "./features/warehouse-exports/warehouseExportSlice";
const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
    customer: customerReducer,
    warehouseReceipt: warehouseReceiptReducer,
    warehouseExport: warehouseExportReducer,
  },
});

export default store;
