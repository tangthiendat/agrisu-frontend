import { type AxiosInstance } from "axios";
import { type IPage, type IPagination, type IProduct } from "../interfaces";
import { createApiClient } from "./api-client.ts";

interface IProductService {
  getProducts: (pagination: IPagination) => Promise<IPage<IProduct>>;
  create: (newProduct: Omit<IProduct, "productId">) => Promise<IProduct>;
  update: (productId: string, updatedProduct: IProduct) => Promise<IProduct>;
  search: (query: string) => Promise<IProduct[]>;
}

const apiClient: AxiosInstance = createApiClient("products");

class ProductService implements IProductService {
  public async getProducts(pagination: IPagination): Promise<IPage<IProduct>> {
    return (
      await apiClient.get("", {
        params: { page: pagination.page - 1, pageSize: pagination.pageSize },
      })
    ).data;
  }

  public async create(
    newProduct: Omit<IProduct, "productId">,
  ): Promise<IProduct> {
    return (await apiClient.post("", newProduct)).data;
  }

  public async update(
    productId: string,
    updatedProduct: IProduct,
  ): Promise<IProduct> {
    return (await apiClient.put(`/${productId}`, updatedProduct)).data;
  }

  public async search(query: string): Promise<IProduct[]> {
    return (
      await apiClient.get("/search", {
        params: { query },
      })
    ).data;
  }
}

export const productService = new ProductService();
