import { type ICustomer } from "../customers/ICustomer.ts";

export interface IReceipt {
  receiptId: string;
  createdAt: Date;
  customer: ICustomer;
  customerCurrentDebt: number;
  paidAmount: number;
  customerNextDebt: number;
}
