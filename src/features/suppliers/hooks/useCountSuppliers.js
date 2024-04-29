import { useQuery } from "@tanstack/react-query";
import { supplierService } from "../../../services/supplierService";

export function useCountSuppliers() {
  const { data: suppliersNum } = useQuery({
    queryKey: ["suppliersNum"],
    queryFn: supplierService.count,
  });
  return { suppliersNum };
}
