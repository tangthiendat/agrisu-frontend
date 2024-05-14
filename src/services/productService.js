import axios from "axios";

const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

class ProductService {
  async getProducts(pagination) {
    return (
      await axios.get(`${BASE_API_URL}/products`, {
        params: { page: pagination.page - 1, pageSize: pagination.pageSize },
      })
    ).data;
  }

  async create(newProduct) {
    return (await axios.post(`${BASE_API_URL}/products`, newProduct)).data;
  }

  async update(productId, updatedProduct) {
    return (
      await axios.put(`${BASE_API_URL}/products/${productId}`, updatedProduct)
    ).data;
  }
  async delete(productId) {
    return (await axios.delete(`${BASE_API_URL}/products/${productId}`)).data;
  }

  async count() {
    return (await axios.get(`${BASE_API_URL}/products/count`)).data;
  }

  async search(query) {
    return (
      await axios.get(`${BASE_API_URL}/products/search`, {
        params: { query },
      })
    ).data;
  }
}

export const productService = new ProductService();
