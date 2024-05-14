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
    data: suppliers,
    isLoading: isLoadingSuppliers,
    error: errorSuppliers,
  } = useQuery({
    queryKey: ["suppliers", { page, pageSize }],
    queryFn: () => supplierService.getSuppliers({ page, pageSize }),
  });

  const {
    data: suppliersNum,
    isLoading: isLoadingSuppliersNum,
    error: errorSuppliersNum,
  } = useQuery({
    queryKey: ["suppliersNum"],
    queryFn: supplierService.count,
  });

  const isLoading = isLoadingSuppliers || isLoadingSuppliersNum;
  const error = errorSuppliers || errorSuppliersNum;

  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu nhà cung cấp");
    }
  }, [error]);

  const pageCount = Math.ceil(suppliersNum / pageSize);
  if (page < pageCount) {
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
