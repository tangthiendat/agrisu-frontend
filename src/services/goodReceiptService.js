import axios from "axios";
const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
class GoodReceiptService {
  async create(goodReceipt) {
    return (await axios.post(`${BASE_API_URL}/good-receipts`, goodReceipt))
      .data;
  }
}
export const goodReceiptService = new GoodReceiptService();
