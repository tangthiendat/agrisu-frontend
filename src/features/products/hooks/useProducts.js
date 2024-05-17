import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { productService } from "../../../services/productService";
import { useSearchParams } from "react-router-dom";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const {
    isLoading: isLoading,
    data: { content: products, totalElements: productsNum, totalPages } = {},
    error,
  } = useQuery({
    queryKey: ["products", { page, pageSize }],
    queryFn: () => productService.getProducts({ page, pageSize }),
  });

  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu sản phẩm");
    }
  }, [error]);

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

  return { isLoading, products, productsNum };
}
