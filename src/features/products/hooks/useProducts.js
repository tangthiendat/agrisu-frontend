import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { productService } from "../../../services/productService";

export function useProducts(page, pageSize) {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: () => productService.getProducts(page, pageSize),
  });
  if (error) {
    toast.error("Có lỗi xảy ra khi tải dữ liệu sản phẩm");
  }
  return { isLoading, products };
}
