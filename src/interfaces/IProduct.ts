import { IProductUnit } from "./IProductUnit";

export interface IProduct {
  productId: string;
  productName: string;
  stockQuantity: number;
  productUnits: IProductUnit[];
  displayedProductUnit?: IProductUnit;
}
