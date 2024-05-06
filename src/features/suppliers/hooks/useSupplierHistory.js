import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { supplierService } from "../../../services/supplierService";

export function useSupplierHistory(supplierId) {
  const {
    data: supplierHistory,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => supplierService.getHistory(supplierId),
    queryKey: ["supplierHistory", supplierId],
  });

  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải công nợ chi tiết của nhà cung cấp");
    }
  }, [error]);
  return { supplierHistory, isLoading };
}
