import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/productService";

export function useProducts(page, pageSize) {
  const { isLoading, data: products } = useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: () => productService.getProducts(page, pageSize),
  });
  return { isLoading, products };
}
