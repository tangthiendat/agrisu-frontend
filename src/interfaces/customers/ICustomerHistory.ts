export interface ICustomerHistory {
  id: string;
  createdAt: Date;
  type: string;
  currentDebt: number;
  value: number;
  payment: number;
  nextDebt: number;
}
