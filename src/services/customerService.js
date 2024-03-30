import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

class CustomerService {
  async getCustomers(page, pageSize) {
    return (
      await axios.get(
        `${API_BASE_URL}/api/customers?page=${page - 1}&pageSize=${pageSize}`,
      )
    ).data;
  }
  async create(newCustomer) {
    return (await axios.post(`${API_BASE_URL}/api/customers`, newCustomer))
      .data;
  }

  async update(customerId, updatedCustomer) {
    return (
      await axios.put(
        `${API_BASE_URL}/api/customers/${customerId}`,
        updatedCustomer,
      )
    ).data;
  }
  async delete(customerId) {
    return (await axios.delete(`${API_BASE_URL}/api/customers/${customerId}`))
      .data;
  }
}

export const customerService = new CustomerService();
