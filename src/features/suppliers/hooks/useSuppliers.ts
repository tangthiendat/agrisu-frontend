import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { supplierService } from "../../../services/supplier-service.ts";

export function useSuppliers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page: number = Number(searchParams.get("page")) || 1;
  const pageSize: number = Number(searchParams.get("pageSize")) || 10;

  const {
    isLoading: isLoading,
    data: { content: suppliers, totalElements: numSuppliers, totalPages } = {},
    error,
  } = useQuery({
    queryKey: ["suppliers", { page, pageSize }],
    queryFn: () => supplierService.getSuppliers({ page, pageSize }),
  });

  //PREFETCH
  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["suppliers", { page: page + 1, pageSize }],
      queryFn: () => supplierService.getSuppliers({ page: page + 1, pageSize }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["suppliers", { page: page - 1, pageSize }],
      queryFn: () => supplierService.getSuppliers({ page: page - 1, pageSize }),
    });
  }

  return { suppliers, isLoading, numSuppliers, error };
}
