import { IUnit } from "./IUnit";

export interface IProductUnit {
  id: number;
  unit: IUnit;
  baseQuantity: number;
  originalPrice: number;
  sellingPrice: number;
  isDefault: boolean;
}
