import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

class ProductTypeService {
  async getAll() {
    return (await axios.get(`${API_BASE_URL}/api/product-types/`)).data;
  }
}

export const productTypeService = new ProductTypeService();
