import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplier: null,
  warehouseReceiptDetails: [],
};
const warehouseReceiptSlice = createSlice({
  name: "warehouseReceipt",
  initialState,
  reducers: {
    setSupplier(state, action) {
      state.supplier = action.payload;
    },
    addItem(state, action) {
      state.warehouseReceiptDetails.push(action.payload);
    },
    removeItem(state, action) {
      state.warehouseReceiptDetails = state.warehouseReceiptDetails.filter(
        (warehouseReceiptDetail) =>
          warehouseReceiptDetail.product.productId !== action.payload,
      );
    },
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const warehouseReceiptDetail = state.warehouseReceiptDetails.find(
        (warehouseReceiptDetail) =>
          warehouseReceiptDetail.product.productId === productId,
      );
      warehouseReceiptDetail.quantity = quantity;
    },
    updateItemUnit(state, action) {
      const { productId, unit } = action.payload;
      const warehouseReceiptDetail = state.warehouseReceiptDetails.find(
        (warehouseReceiptDetail) =>
          warehouseReceiptDetail.product.productId === productId,
      );
      warehouseReceiptDetail.unit = unit;
      const currentProductUnit =
        warehouseReceiptDetail.product.productUnits.find(
          (productUnit) => productUnit.unit.unitId === unit.unitId,
        );
      warehouseReceiptDetail.product.displayedProductUnit = currentProductUnit;
      warehouseReceiptDetail.unitPrice = currentProductUnit.purchasePrice;
    },
    clearWarehouseReceiptDetails(state) {
      state.warehouseReceiptDetails = [];
    },
    clearWarehouseReceipt(state) {
      state.supplier = null;
      state.warehouseReceiptDetails = [];
    },
  },
});

export const {
  setSupplier,
  addItem,
  removeItem,
  updateItemQuantity,
  updateItemUnit,
  clearWarehouseReceiptDetails,
  clearWarehouseReceipt,
} = warehouseReceiptSlice.actions;
export default warehouseReceiptSlice.reducer;

export const getWarehouseReceiptTotalValue = (state) =>
  state.warehouseReceipt.warehouseReceiptDetails.reduce(
    (total, warehouseReceiptDetail) =>
      total +
      warehouseReceiptDetail.unitPrice * warehouseReceiptDetail.quantity,
    0,
  );
