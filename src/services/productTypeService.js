import { createApiClient } from "./api";

class ProductTypeService {
  constructor() {
    this.api = createApiClient("/api/product-types");
  }
  async getAll() {
    return this.api.get("");
  }
}

export const productTypeService = new ProductTypeService();
