import { type ICustomer } from "../customers/ICustomer.ts";
import {
  type INewWarehouseExportDetail,
  type IWarehouseExportDetail,
} from "./IWarehouseExportDetail.ts";

export interface IWarehouseExport {
  warehouseExportId: string;
  createdAt: Date;
  customer: ICustomer;
  totalValue: number;
  customerCurrentDebt: number;
  customerNextDebt: number;
  warehouseExportDetails: IWarehouseExportDetail[];
}

export interface INewWarehouseExport
  extends Omit<
    IWarehouseExport,
    "warehouseExportId" | "createdAt" | "warehouseExportDetails"
  > {
  warehouseExportDetails: INewWarehouseExportDetail[];
}
