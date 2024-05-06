import { useEffect } from "react";
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
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch products");
    }
  }, [error]);
  return { isLoading, products };
}
