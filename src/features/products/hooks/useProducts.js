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
    isLoading: isLoadingProducts,
    data: products,
    error: errorProducts,
  } = useQuery({
    queryKey: ["products", { page, pageSize }],
    queryFn: () => productService.getProducts({ page, pageSize }),
  });

  const {
    isLoading: isLoadingProductsNum,
    data: productsNum,
    error: errorProductsNum,
  } = useQuery({
    queryKey: ["productsNum"],
    queryFn: productService.count,
  });

  const isLoading = isLoadingProducts || isLoadingProductsNum;
  const error = errorProducts || errorProductsNum;

  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu sản phẩm");
    }
  }, [error]);

  //PREFETCH
  const pageCount = Math.ceil(productsNum / pageSize);
  if (page < pageCount) {
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
