import { configureStore } from "@reduxjs/toolkit";
// import orderReducer from "../features/orders/orderSlice";
import { productSlice } from "../features/products/productSlice.ts";
// import customerReducer from "../features/customers/customerSlice";
// import supplierSlice from "../features/suppliers/supplierSlice";
// import warehouseReceiptReducer from "../features/warehouse-receipts/warehouseReceiptSlice";
// import warehouseExportReducer from "../features/warehouse-exports/warehouseExportSlice";
export const store = configureStore({
  reducer: {
    // order: orderReducer,
    product: productSlice.reducer,
    // customer: customerReducer,
    // supplier: supplierSlice,
    // warehouseReceipt: warehouseReceiptReducer,
    // warehouseExport: warehouseExportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
