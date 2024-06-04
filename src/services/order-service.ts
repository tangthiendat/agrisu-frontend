import { type AxiosInstance } from "axios";
import { type INewOrder, type IOrder } from "../interfaces";
import { createApiClient } from "./api-client.ts";

interface IOrderService {
  create: (newOrder: INewOrder) => Promise<IOrder>;
}

const apiClient: AxiosInstance = createApiClient("orders");

class OrderService implements IOrderService {
  async create(newOrder: INewOrder): Promise<IOrder> {
    return (await apiClient.post("", newOrder)).data;
  }
}

export const orderService = new OrderService();
