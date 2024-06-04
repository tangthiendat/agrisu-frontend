import { type IProduct } from "../products/IProduct.ts";
import { type IUnit } from "../products/IUnit.ts";

export interface IWarehouseReceiptDetail {
  id: number;
  product: IProduct;
  unit: IUnit;
  unitPrice: number;
  quantity: number;
}

export interface INewWarehouseReceiptDetail
  extends Omit<IWarehouseReceiptDetail, "id"> {}
