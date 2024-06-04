import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type IUnit,
  type INewWarehouseReceiptDetail,
  type ISupplier,
} from "../../interfaces";

interface WarehouseReceiptState {
  supplier: ISupplier;
  warehouseReceiptDetails: INewWarehouseReceiptDetail[];
}

const initialState: WarehouseReceiptState = {
  supplier: null,
  warehouseReceiptDetails: [],
};

export const warehouseReceiptSlice = createSlice({
  name: "warehouseReceipt",
  initialState,
  reducers: {
    setSupplier(state, action: PayloadAction<ISupplier>) {
      state.supplier = action.payload;
    },
    addItem(state, action: PayloadAction<INewWarehouseReceiptDetail>) {
      state.warehouseReceiptDetails.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.warehouseReceiptDetails = state.warehouseReceiptDetails.filter(
        (warehouseReceiptDetail) =>
          warehouseReceiptDetail.product.productId !== action.payload,
      );
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const { productId, quantity } = action.payload;
      const warehouseReceiptDetail = state.warehouseReceiptDetails.find(
        (warehouseReceiptDetail) =>
          warehouseReceiptDetail.product.productId === productId,
      );
      warehouseReceiptDetail.quantity = quantity;
    },
    updateItemUnit(
      state,
      action: PayloadAction<{ productId: string; unit: IUnit }>,
    ) {
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
      warehouseReceiptDetail.unitPrice = currentProductUnit.originalPrice;
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
  clearWarehouseReceipt,
} = warehouseReceiptSlice.actions;
export default warehouseReceiptSlice.reducer;
