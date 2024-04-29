import axios from "axios";
const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

class PaymentService {
  async create(payment) {
    return (await axios.post(`${BASE_API_URL}/payments`, payment)).data;
  }
}

export const paymentService = new PaymentService();
