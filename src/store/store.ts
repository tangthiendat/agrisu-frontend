import { configureStore } from "@reduxjs/toolkit";
// import orderReducer from "../features/orders/orderSlice";
import { productSlice } from "../features/products/productSlice.ts";
import { customerSlice } from "../features/customers/customerSlice.ts";
import { supplierSlice } from "../features/suppliers/supplierSlice.ts";
// import warehouseReceiptReducer from "../features/warehouse-receipts/warehouseReceiptSlice";
// import warehouseExportReducer from "../features/warehouse-exports/warehouseExportSlice";
export const store = configureStore({
  reducer: {
    // order: orderReducer,
    product: productSlice.reducer,
    customer: customerSlice.reducer,
    supplier: supplierSlice.reducer,
    // warehouseReceipt: warehouseReceiptReducer,
    // warehouseExport: warehouseExportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
