import { createApiClient } from "./api";

class CustomerService {
  constructor() {
    this.api = createApiClient("/api/customers");
  }

  async getCustomers(page, pageSize) {
    return this.api.get("", { params: { page: page - 1, pageSize } });
  }
  async create(newCustomer) {
    return this.api.post("", newCustomer);
  }

  async update(customerId, updatedCustomer) {
    return this.api.put(`/${customerId}`, updatedCustomer);
  }
  async delete(customerId) {
    return this.api.delete(`/${customerId}`);
  }
}

export const customerService = new CustomerService();
