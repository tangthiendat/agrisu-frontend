import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { supplierService } from "../../../services/supplierService";

export function useSuppliers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const {
    isLoading: isLoading,
    data: { content: suppliers, totalElements: suppliersNum, totalPages } = {},
    error,
  } = useQuery({
    queryKey: ["suppliers", { page, pageSize }],
    queryFn: () => supplierService.getSuppliers({ page, pageSize }),
  });

  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu nhà cung cấp");
    }
  }, [error]);

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

  return { suppliers, isLoading, suppliersNum };
}
