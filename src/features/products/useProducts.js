import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/productService";

export function useProducts() {
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });
  return { isLoading, products };
}
