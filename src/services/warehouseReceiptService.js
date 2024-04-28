import axios from "axios";
const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
class WarehouseReceiptService {
  async create(warehouseReceipt) {
    return (
      await axios.post(`${BASE_API_URL}/warehouse-receipts`, warehouseReceipt)
    ).data;
  }
}
export const warehouseReceiptService = new WarehouseReceiptService();
