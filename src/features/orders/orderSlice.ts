import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type INewOrderDetail,
  type ICustomer,
  type IUnit,
} from "../../interfaces";

interface OrderState {
  customer: ICustomer;
  orderDetails: INewOrderDetail[];
}

const initialState: OrderState = {
  customer: null,
  orderDetails: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<ICustomer>) {
      state.customer = action.payload;
    },
    addItem(state, action: PayloadAction<INewOrderDetail>) {
      state.orderDetails.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.orderDetails = state.orderDetails.filter(
        (orderDetail) => orderDetail.product.productId !== action.payload,
      );
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const { productId, quantity } = action.payload;
      const orderDetail = state.orderDetails.find(
        (orderDetail) => orderDetail.product.productId === productId,
      );
      orderDetail.quantity = quantity;
    },
    updateItemUnit(
      state,
      action: PayloadAction<{ productId: string; unit: IUnit }>,
    ) {
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
  clearOrder,
} = orderSlice.actions;
