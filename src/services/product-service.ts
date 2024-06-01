import axios from "axios";
import { IPage, IPagination, IProduct } from "../interfaces";

const API_URL = import.meta.env.VITE_API_URL;

interface IProductService {
  getProducts: (pagination: IPagination) => Promise<IPage<IProduct>>;
  create: (newProduct: Omit<IProduct, "productId">) => Promise<IProduct>;
  update: (productId: string, updatedProduct: IProduct) => Promise<IProduct>;
  search: (query: string) => Promise<IProduct[]>;
}

class ProductService implements IProductService {
  public async getProducts(pagination: IPagination): Promise<IPage<IProduct>> {
    return (
      await axios.get(`${API_URL}/products`, {
        params: { page: pagination.page - 1, pageSize: pagination.pageSize },
      })
    ).data;
  }

  public async create(
    newProduct: Omit<IProduct, "productId">,
  ): Promise<IProduct> {
    return (await axios.post(`${API_URL}/products`, newProduct)).data;
  }

  public async update(
    productId: string,
    updatedProduct: IProduct,
  ): Promise<IProduct> {
    return (await axios.put(`${API_URL}/products/${productId}`, updatedProduct))
      .data;
  }

  public async search(query: string): Promise<IProduct[]> {
    return (
      await axios.get(`${API_URL}/products/search`, {
        params: { query },
      })
    ).data;
  }
}

export const productService = new ProductService();
