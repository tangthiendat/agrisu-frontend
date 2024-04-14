import axios from "axios";
const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

class ReceiptService {
  async getAll() {
    return (await axios.get(`${BASE_API_URL}/receipts`)).data;
  }

  async create(receipt) {
    return (await axios.post(`${BASE_API_URL}/receipts`, receipt)).data;
  }

  async delete(receiptId) {
    return (await axios.delete(`${BASE_API_URL}/receipts/${receiptId}`)).data;
  }
}

export const receiptService = new ReceiptService();
