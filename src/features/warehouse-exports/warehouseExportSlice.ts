import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type INewWarehouseExportDetail,
  type ICustomer,
  type IUnit,
} from "../../interfaces";

interface WarehouseExportState {
  customer: ICustomer;
  warehouseExportDetails: INewWarehouseExportDetail[];
}

const initialState: WarehouseExportState = {
  customer: null,
  warehouseExportDetails: [],
};

export const warehouseExportSlice = createSlice({
  name: "warehouseExport",
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<ICustomer>) {
      state.customer = action.payload;
    },
    addItem(state, action: PayloadAction<INewWarehouseExportDetail>) {
      state.warehouseExportDetails.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.warehouseExportDetails = state.warehouseExportDetails.filter(
        (warehouseExportDetail) =>
          warehouseExportDetail.product.productId !== action.payload,
      );
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const { productId, quantity } = action.payload;
      const warehouseExportDetail = state.warehouseExportDetails.find(
        (warehouseExportDetail) =>
          warehouseExportDetail.product.productId === productId,
      );
      warehouseExportDetail.quantity = quantity;
    },
    updateItemUnit(
      state,
      action: PayloadAction<{ productId: string; unit: IUnit }>,
    ) {
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
  clearWarehouseExport,
} = warehouseExportSlice.actions;
