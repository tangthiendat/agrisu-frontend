import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

class ProductService {
  async getProducts(page, pageSize) {
    return (
      await axios.get(
        `${API_BASE_URL}/api/products?page=${page - 1}&pageSize=${pageSize}`,
      )
    ).data;
  }

  async create(newProduct) {
    return (await axios.post(`${API_BASE_URL}/api/products`, newProduct)).data;
  }

  async update(productId, updatedProduct) {
    return (
      await axios.put(
        `${API_BASE_URL}/api/products/${productId}`,
        updatedProduct,
      )
    ).data;
  }
  async delete(productId) {
    return (await axios.delete(`${API_BASE_URL}/api/products/${productId}`))
      .data;
  }

  async count() {
    return (await axios.get(`${API_BASE_URL}/api/products/count`)).data;
  }
}

export const productService = new ProductService();
