import { type AxiosInstance } from "axios";
import { type IReceipt } from "../interfaces";
import { createApiClient } from "./api-client.ts";

interface IReceiptService {
  create(newReceipt: Omit<IReceipt, "receiptId">): Promise<IReceipt>;
}

const apiClient: AxiosInstance = createApiClient("receipts");

class ReceiptService implements IReceiptService {
  async create(
    newReceipt: Omit<IReceipt, "receiptId" | "createdAt">,
  ): Promise<IReceipt> {
    return (await apiClient.post("", newReceipt)).data;
  }
}

export const receiptService = new ReceiptService();
