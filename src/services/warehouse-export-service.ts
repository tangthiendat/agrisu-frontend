import { type AxiosInstance } from "axios";
import { type IWarehouseExport, type INewWarehouseExport } from "../interfaces";
import { createApiClient } from "./api-client.ts";

interface IWarehouseExportService {
  create(newWarehouseExport: INewWarehouseExport): Promise<IWarehouseExport>;
}

const apiClient: AxiosInstance = createApiClient("warehouse-exports");

class WarehouseExportService implements IWarehouseExportService {
  async create(
    newWarehouseExport: INewWarehouseExport,
  ): Promise<IWarehouseExport> {
    return (await apiClient.post("", newWarehouseExport)).data;
  }
}
export const warehouseExportService = new WarehouseExportService();
