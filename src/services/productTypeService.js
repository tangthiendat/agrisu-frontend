import axios from "axios";

const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
class ProductTypeService {
  async getAll() {
    return (await axios.get(`${BASE_API_URL}/product-types`)).data;
  }
}

export const productTypeService = new ProductTypeService();
