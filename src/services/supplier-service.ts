import { AxiosInstance } from "axios";
import {
  type IPage,
  type IPagination,
  type ISupplier,
  type ISupplierHistory,
} from "../interfaces";
import { createApiClient } from "./api-client.ts";

interface ISupplierService {
  getSuppliers(pagination: IPagination): Promise<IPage<ISupplier>>;
  create(newSupplier: Omit<ISupplier, "supplierId">): Promise<ISupplier>;
  update(supplierId: string, updatedSupplier: ISupplier): Promise<ISupplier>;
  delete(supplierId: string): Promise<void>;
  search(query: string): Promise<ISupplier[]>;
  getHistory(supplierId: string): Promise<ISupplierHistory[]>;
}

const apiClient: AxiosInstance = createApiClient("suppliers");

class SupplierService implements ISupplierService {
  async getSuppliers(pagination: IPagination): Promise<IPage<ISupplier>> {
    return (
      await apiClient.get("", {
        params: { page: pagination.page - 1, pageSize: pagination.pageSize },
      })
    ).data;
  }
  async create(newSupplier: Omit<ISupplier, "supplierId">): Promise<ISupplier> {
    return (await apiClient.post("", newSupplier)).data;
  }
  async update(
    supplierId: string,
    updatedSupplier: ISupplier,
  ): Promise<ISupplier> {
    return (await apiClient.put(`/${supplierId}`, updatedSupplier)).data;
  }
  async delete(supplierId: string): Promise<void> {
    return (await apiClient.delete(`/${supplierId}`)).data;
  }
  async search(query: string): Promise<ISupplier[]> {
    return (await apiClient.get("/search", { params: { query } })).data;
  }

  async getHistory(supplierId: string): Promise<ISupplierHistory[]> {
    return (await apiClient.get(`/${supplierId}/history`)).data;
  }
}
export const supplierService = new SupplierService();
