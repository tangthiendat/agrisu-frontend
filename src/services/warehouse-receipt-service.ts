import { type AxiosInstance } from "axios";
import {
  type INewWarehouseReceipt,
  type IWarehouseReceipt,
} from "../interfaces";
import { createApiClient } from "./api-client.ts";

interface IWarehouseReceiptService {
  create: (
    newWarehouseReceipt: INewWarehouseReceipt,
  ) => Promise<IWarehouseReceipt>;
}

const apiClient: AxiosInstance = createApiClient("warehouse-receipts");

class WarehouseReceiptService implements IWarehouseReceiptService {
  async create(
    newWarehouseReceipt: INewWarehouseReceipt,
  ): Promise<IWarehouseReceipt> {
    return (await apiClient.post("", newWarehouseReceipt)).data;
  }
}
export const warehouseReceiptService = new WarehouseReceiptService();
