import { type IProduct } from "../products/IProduct.ts";
import { type IUnit } from "../products/IUnit.ts";

export interface IOrderDetail {
  id: number;
  product: IProduct;
  unit: IUnit;
  unitPrice: number;
  quantity: number;
}

export interface INewOrderDetail extends Omit<IOrderDetail, "id"> {}
