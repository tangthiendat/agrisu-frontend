import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { supplierService } from "../../../services/supplierService";

export function useSuppliers(page, pageSize) {
  const {
    data: suppliers,
    isLoading: isLoadingSuppliers,
    error,
  } = useQuery({
    queryKey: ["suppliers", page, pageSize],
    queryFn: () => supplierService.getSuppliers(page, pageSize),
  });
  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu nhà cung cấp");
    }
  }, [error]);

  return { suppliers, isLoadingSuppliers };
}
