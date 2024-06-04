import { useQuery } from "@tanstack/react-query";
import { supplierService } from "../../../services/supplier-service.ts";

export function useSupplierHistory(supplierId) {
  const {
    data: supplierHistory,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => supplierService.getHistory(supplierId),
    queryKey: ["supplierHistory", supplierId],
  });

  return { supplierHistory, isLoading, error };
}
