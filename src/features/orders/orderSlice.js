import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  orderDetails: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    addItem(state, action) {
      state.orderDetails.push(action.payload);
    },
    removeItem(state, action) {
      state.orderDetails = state.orderDetails.filter(
        (orderDetail) => orderDetail.product.productId !== action.payload,
      );
    },
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const orderDetail = state.orderDetails.find(
        (orderDetail) => orderDetail.product.productId === productId,
      );
      orderDetail.quantity = quantity;
    },
    updateItemUnit(state, action) {
      const { productId, unit } = action.payload;
      const orderDetail = state.orderDetails.find(
        (orderDetail) => orderDetail.product.productId === productId,
      );
      orderDetail.unit = unit;
      const currentProductUnit = orderDetail.product.productUnits.find(
        (productUnit) => productUnit.unit.unitId === unit.unitId,
      );
      orderDetail.product.displayedProductUnit = currentProductUnit;
      orderDetail.unitPrice = currentProductUnit.sellingPrice;
    },
    clearOrderDetails(state) {
      state.orderDetails = [];
    },
    clearOrder(state) {
      state.customer = null;
      state.orderDetails = [];
    },
  },
});

export const {
  setCustomer,
  addItem,
  removeItem,
  updateItemQuantity,
  updateItemUnit,
  clearOrderDetails,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

export const getOrderTotalValue = (state) =>
  state.order.orderDetails.reduce(
    (total, orderDetail) =>
      total + orderDetail.unitPrice * orderDetail.quantity,
    0,
  );
