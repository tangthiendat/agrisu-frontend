import axios from "axios";

const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

class OrderService {
  async getOrders(page, pageSize) {
    return (
      await axios.get(`${BASE_API_URL}/orders`, {
        params: { page: page - 1, pageSize },
      })
    ).data;
  }

  async create(newOrder) {
    return (await axios.post(`${BASE_API_URL}/orders`, newOrder)).data;
  }

  async delete(orderId) {
    return (await axios.delete(`${BASE_API_URL}/orders/${orderId}`)).data;
  }

  async count() {
    return (await axios.get(`${BASE_API_URL}/orders/count`)).data;
  }
}

export const orderService = new OrderService();
