import axios from "axios";
const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
class CustomerService {
  async getCustomers(page, pageSize) {
    return axios.get(`${BASE_API_URL}/customers`, {
      params: { page: page - 1, pageSize },
    }).data;
  }
  async create(newCustomer) {
    return axios.post(`${BASE_API_URL}/customers`, newCustomer).data;
  }

  async update(customerId, updatedCustomer) {
    return axios.put(`${BASE_API_URL}/customers/${customerId}`, updatedCustomer)
      .data;
  }
  async delete(customerId) {
    return axios.delete(`${BASE_API_URL}/customers/${customerId}`).data;
  }
}

export const customerService = new CustomerService();
