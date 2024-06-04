import { type ISupplier } from "../suppliers/ISupplier.ts";

export interface IPayment {
  paymentId: string;
  createdAt: Date;
  supplier: ISupplier;
  supplierCurrentDebt: number;
  paidAmount: number;
  supplierNextDebt: number;
}
