import { type AxiosInstance } from "axios";
import { type IPayment } from "../interfaces";
import { createApiClient } from "./api-client.ts";

interface IPaymentService {
  create: (
    newPayment: Omit<IPayment, "paymentId" | "createdAt">,
  ) => Promise<IPayment>;
}

const apiClient: AxiosInstance = createApiClient("payments");

class PaymentService implements IPaymentService {
  async create(
    newPayment: Omit<IPayment, "paymentId" | "createdAt">,
  ): Promise<IPayment> {
    return (await apiClient.post("", newPayment)).data;
  }
}

export const paymentService = new PaymentService();
