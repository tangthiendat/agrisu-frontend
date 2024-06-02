import { type AxiosInstance } from "axios";
import { type IPage, type IPagination, type IProduct } from "../interfaces";
import { createApiClient } from "./api";

interface IProductService {
  apiClient: AxiosInstance;
  getProducts: (pagination: IPagination) => Promise<IPage<IProduct>>;
  create: (newProduct: Omit<IProduct, "productId">) => Promise<IProduct>;
  update: (productId: string, updatedProduct: IProduct) => Promise<IProduct>;
  search: (query: string) => Promise<IProduct[]>;
}

class ProductService implements IProductService {
  public apiClient: AxiosInstance;

  constructor() {
    this.apiClient = createApiClient("products");
  }

  public async getProducts(pagination: IPagination): Promise<IPage<IProduct>> {
    return (
      await this.apiClient.get("", {
        params: { page: pagination.page - 1, pageSize: pagination.pageSize },
      })
    ).data;
  }

  public async create(
    newProduct: Omit<IProduct, "productId">,
  ): Promise<IProduct> {
    return (await this.apiClient.post("", newProduct)).data;
  }

  public async update(
    productId: string,
    updatedProduct: IProduct,
  ): Promise<IProduct> {
    return (await this.apiClient.put(`/${productId}`, updatedProduct)).data;
  }

  public async search(query: string): Promise<IProduct[]> {
    return (
      await this.apiClient.get("/search", {
        params: { query },
      })
    ).data;
  }
}

export const productService = new ProductService();
