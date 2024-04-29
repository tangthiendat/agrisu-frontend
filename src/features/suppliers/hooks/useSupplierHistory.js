import { useQuery } from "@tanstack/react-query";
import { supplierService } from "../../../services/supplierService";

export function useSupplierHistory(supplierId) {
  const { data: supplierHistory, isLoading } = useQuery({
    queryFn: () => supplierService.getHistory(supplierId),
    queryKey: ["supplierHistory", supplierId],
  });
  return { supplierHistory, isLoading };
}
