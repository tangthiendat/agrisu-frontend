export interface ISupplierHistory {
  id: string;
  createdDate: Date;
  type: string;
  currentDebt: number;
  value: number;
  payment: number;
  nextDebt: number;
}
