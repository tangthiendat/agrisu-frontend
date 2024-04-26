import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplier: null,
  goodReceiptDetails: [],
};
const goodReceiptSlice = createSlice({
  name: "goodReceipt",
  initialState,
  reducers: {
    setSupplier(state, action) {
      state.supplier = action.payload;
    },
    addItem(state, action) {
      state.goodReceiptDetails.push(action.payload);
    },
    removeItem(state, action) {
      state.goodReceiptDetails = state.goodReceiptDetails.filter(
        (goodReceiptDetail) =>
          goodReceiptDetail.product.productId !== action.payload,
      );
    },
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const goodReceiptDetail = state.goodReceiptDetails.find(
        (goodReceiptDetail) =>
          goodReceiptDetail.product.productId === productId,
      );
      goodReceiptDetail.quantity = quantity;
    },
    updateItemUnit(state, action) {
      const { productId, unit } = action.payload;
      const goodReceiptDetail = state.goodReceiptDetails.find(
        (goodReceiptDetail) =>
          goodReceiptDetail.product.productId === productId,
      );
      goodReceiptDetail.unit = unit;
      const currentProductUnit = goodReceiptDetail.product.productUnits.find(
        (productUnit) => productUnit.unit.unitId === unit.unitId,
      );
      goodReceiptDetail.product.displayedProductUnit = currentProductUnit;
      goodReceiptDetail.unitPrice = currentProductUnit.purchasePrice;
    },
    clearGoodReceiptDetails(state) {
      state.goodReceiptDetails = [];
    },
    clearGoodReceipt(state) {
      state.supplier = null;
      state.goodReceiptDetails = [];
    },
  },
});

export const {
  setSupplier,
  addItem,
  removeItem,
  updateItemQuantity,
  updateItemUnit,
  clearGoodReceiptDetails,
  clearGoodReceipt,
} = goodReceiptSlice.actions;
export default goodReceiptSlice.reducer;

export const getGoodReceiptTotalValue = (state) =>
  state.goodReceipt.goodReceiptDetails.reduce(
    (total, goodReceiptDetail) =>
      total + goodReceiptDetail.unitPrice * goodReceiptDetail.quantity,
    0,
  );
