import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../../services/product-service.ts";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page: number = Number(searchParams.get("page")) || 1;
  const pageSize: number = Number(searchParams.get("pageSize")) || 10;

  const {
    isLoading: isLoading,
    data: { content: products, totalElements: numProducts, totalPages } = {},
    error,
  } = useQuery({
    queryKey: ["products", { page, pageSize }],
    queryFn: () => productService.getProducts({ page, pageSize }),
  });

  //PREFETCH
  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["products", { page: page + 1, pageSize }],
      queryFn: () => productService.getProducts({ page: page + 1, pageSize }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["products", { page: page - 1, pageSize }],
      queryFn: () => productService.getProducts({ page: page - 1, pageSize }),
    });
  }

  return { isLoading, products, numProducts, error };
}
