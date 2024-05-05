import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  warehouseExportDetails: [],
};

const warehouseExportSlice = createSlice({
  name: "warehouseExport",
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    addItem(state, action) {
      state.warehouseExportDetails.push(action.payload);
    },
    removeItem(state, action) {
      state.warehouseExportDetails = state.warehouseExportDetails.filter(
        (warehouseExportDetail) =>
          warehouseExportDetail.product.productId !== action.payload,
      );
    },
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const warehouseExportDetail = state.warehouseExportDetails.find(
        (warehouseExportDetail) =>
          warehouseExportDetail.product.productId === productId,
      );
      warehouseExportDetail.quantity = quantity;
    },
    updateItemUnit(state, action) {
      const { productId, unit } = action.payload;
      const warehouseExportDetail = state.warehouseExportDetails.find(
        (warehouseExportDetail) =>
          warehouseExportDetail.product.productId === productId,
      );
      warehouseExportDetail.unit = unit;
      const currentProductUnit =
        warehouseExportDetail.product.productUnits.find(
          (productUnit) => productUnit.unit.unitId === unit.unitId,
        );
      warehouseExportDetail.product.displayedProductUnit = currentProductUnit;
      warehouseExportDetail.unitPrice = currentProductUnit.sellingPrice;
    },
    clearWarehouseExportDetails(state) {
      state.warehouseExportDetails = [];
    },
    clearWarehouseExport(state) {
      state.customer = null;
      state.warehouseExportDetails = [];
    },
  },
});
export const {
  setCustomer,
  addItem,
  removeItem,
  updateItemQuantity,
  updateItemUnit,
  clearWarehouseExportDetails,
  clearWarehouseExport,
} = warehouseExportSlice.actions;
export default warehouseExportSlice.reducer;

export const getWarehouseExportTotalValue = (state) =>
  state.warehouseExport.warehouseExportDetails.reduce(
    (total, warehouseExportDetail) =>
      total + warehouseExportDetail.unitPrice * warehouseExportDetail.quantity,
    0,
  );
