import { useQuery } from "@tanstack/react-query";
import { supplierService } from "../../../services/supplierService";

export function useSuppliers(page, pageSize) {
  const { data: suppliers, isLoading: isLoadingSuppliers } = useQuery({
    queryKey: ["suppliers", page, pageSize],
    queryFn: () => supplierService.getSuppliers(page, pageSize),
  });
  return { suppliers, isLoadingSuppliers };
}
