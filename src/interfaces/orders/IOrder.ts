import { type ICustomer } from "../customers/ICustomer.ts";
import { type INewOrderDetail, type IOrderDetail } from "./IOrderDetail.ts";

export interface IOrder {
  orderId: string;
  createdAt: Date;
  customer: ICustomer;
  totalValue: number;
  customerPayment: number;
  orderDetails: IOrderDetail[];
}

export interface INewOrder
  extends Omit<IOrder, "orderId" | "createdAt" | "orderDetails"> {
  orderDetails: INewOrderDetail[];
}
