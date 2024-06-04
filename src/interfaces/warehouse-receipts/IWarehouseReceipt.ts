import { type ISupplier } from "../suppliers/ISupplier.ts";
import {
  type INewWarehouseReceiptDetail,
  type IWarehouseReceiptDetail,
} from "./IWarehouseReceiptDetail.ts";

export interface IWarehouseReceipt {
  warehouseReceiptId: string;
  createdAt: Date;
  supplier: ISupplier;
  totalValue: number;
  supplierCurrentDebt: number;
  supplierNextDebt: number;
  warehouseReceiptDetails: IWarehouseReceiptDetail[];
}

export interface INewWarehouseReceipt
  extends Omit<
    IWarehouseReceipt,
    "warehouseReceiptId" | "createdAt" | "warehouseReceiptDetails"
  > {
  warehouseReceiptDetails: INewWarehouseReceiptDetail[];
}
