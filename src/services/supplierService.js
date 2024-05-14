import axios from "axios";
const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

class SupplierService {
  async getSuppliers(pagination) {
    return (
      await axios.get(`${BASE_API_URL}/suppliers`, {
        params: { page: pagination.page - 1, pageSize: pagination.pageSize },
      })
    ).data;
  }
  async create(newSupplier) {
    return (await axios.post(`${BASE_API_URL}/suppliers`, newSupplier)).data;
  }
  async update(supplierId, updatedSupplier) {
    return (
      await axios.put(
        `${BASE_API_URL}/suppliers/${supplierId}`,
        updatedSupplier,
      )
    ).data;
  }
  async delete(supplierId) {
    return (await axios.delete(`${BASE_API_URL}/suppliers/${supplierId}`)).data;
  }
  async search(query) {
    return (
      await axios.get(`${BASE_API_URL}/suppliers/search`, {
        params: { query },
      })
    ).data;
  }
  async count() {
    return (await axios.get(`${BASE_API_URL}/suppliers/count`)).data;
  }
  async getHistory(supplierId) {
    return (await axios.get(`${BASE_API_URL}/suppliers/${supplierId}/history`))
      .data;
  }
}
export const supplierService = new SupplierService();
