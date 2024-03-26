import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

class ProductService {
  async getAll() {
    return (await axios.get(`${API_BASE_URL}/api/products/`)).data;
  }

  async create(newProduct) {
    return (await axios.post(`${API_BASE_URL}/api/products/`, newProduct)).data;
  }
}

export const productService = new ProductService();
