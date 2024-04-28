import axios from "axios";
const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

class WarehouseExportService {
  async create(warehouseExport) {
    return (
      await axios.post(`${BASE_API_URL}/warehouse-exports`, warehouseExport)
    ).data;
  }
}
export const warehouseExportService = new WarehouseExportService();
