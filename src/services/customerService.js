import axios from "axios";
const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
class CustomerService {
  async getCustomers(pagination) {
    return (
      await axios.get(`${BASE_API_URL}/customers`, {
        params: { page: pagination.page - 1, pageSize: pagination.pageSize },
      })
    ).data;
  }
  async create(newCustomer) {
    return (await axios.post(`${BASE_API_URL}/customers`, newCustomer)).data;
  }

  async update(customerId, updatedCustomer) {
    return (
      await axios.put(
        `${BASE_API_URL}/customers/${customerId}`,
        updatedCustomer,
      )
    ).data;
  }
  async delete(customerId) {
    return (await axios.delete(`${BASE_API_URL}/customers/${customerId}`)).data;
  }

  async search(query) {
    return (
      await axios.get(`${BASE_API_URL}/customers/search`, {
        params: { query },
      })
    ).data;
  }

  async count() {
    return (await axios.get(`${BASE_API_URL}/customers/count`)).data;
  }

  async getHistory(customerId) {
    return (await axios.get(`${BASE_API_URL}/customers/${customerId}/history`))
      .data;
  }
}

export const customerService = new CustomerService();