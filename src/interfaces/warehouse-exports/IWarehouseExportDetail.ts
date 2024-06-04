import { type IProduct } from "../products/IProduct.ts";
import { type IUnit } from "../products/IUnit.ts";

export interface IWarehouseExportDetail {
  id: number;
  product: IProduct;
  unit: IUnit;
  unitPrice: number;
  quantity: number;
}

export interface INewWarehouseExportDetail
  extends Omit<IWarehouseExportDetail, "id"> {}
