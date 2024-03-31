import { createApiClient } from "./api";

class ProductService {
  constructor() {
    this.api = createApiClient("/api/products");
  }

  async getProducts(page, pageSize) {
    return (await this.api.get("", { params: { page: page - 1, pageSize } }))
      .data;
  }

  async create(newProduct) {
    return (await this.api.post("", newProduct)).data;
  }

  async update(productId, updatedProduct) {
    return (await this.api.put(`/${productId}`, updatedProduct)).data;
  }
  async delete(productId) {
    return (await this.api.delete(`/${productId}`)).data;
  }

  async count() {
    return (await this.api.get("/count")).data;
  }
}

export const productService = new ProductService();
