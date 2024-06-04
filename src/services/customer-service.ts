import { type AxiosInstance } from "axios";
import {
  type ICustomerHistory,
  type ICustomer,
  type IPage,
  type IPagination,
} from "../interfaces";
import { createApiClient } from "./api-client.ts";

interface ICustomerService {
  getCustomers: (pagination: IPagination) => Promise<IPage<ICustomer>>;
  create: (newCustomer: Omit<ICustomer, "customerId">) => Promise<ICustomer>;
  update: (
    customerId: string,
    updatedCustomer: ICustomer,
  ) => Promise<ICustomer>;
  delete: (customerId: string) => Promise<void>;
  search: (query: string) => Promise<ICustomer[]>;
  getHistory: (customerId: string) => Promise<ICustomerHistory[]>;
}

const apiClient: AxiosInstance = createApiClient("customers");

class CustomerService implements ICustomerService {
  async getCustomers(pagination: IPagination): Promise<IPage<ICustomer>> {
    return (
      await apiClient.get("", {
        params: { page: pagination.page - 1, pageSize: pagination.pageSize },
      })
    ).data;
  }
  async create(newCustomer: Omit<ICustomer, "customerId">): Promise<ICustomer> {
    return (await apiClient.post("", newCustomer)).data;
  }

  async update(
    customerId: string,
    updatedCustomer: ICustomer,
  ): Promise<ICustomer> {
    return (await apiClient.put(`/${customerId}`, updatedCustomer)).data;
  }

  async delete(customerId: string): Promise<void> {
    return (await apiClient.delete(`/${customerId}`)).data;
  }

  async search(query: string): Promise<ICustomer[]> {
    return (await apiClient.get("/search", { params: { query } })).data;
  }

  async getHistory(customerId: string): Promise<ICustomerHistory[]> {
    return (await apiClient.get(`/${customerId}/history`)).data;
  }
}

export const customerService = new CustomerService();
