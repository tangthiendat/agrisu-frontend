export interface ISupplier {
  supplierId: string;
  supplierName: string;
  phoneNumber: string;
  address?: string;
  payable: number;
  taxCode?: string;
}
