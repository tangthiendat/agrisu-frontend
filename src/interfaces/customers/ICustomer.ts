export interface ICustomer {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  address?: string;
  receivable: number;
  taxCode?: string;
}
