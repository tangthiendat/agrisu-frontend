import { useQuery } from "@tanstack/react-query";
import { supplierService } from "../../../services/supplier-service.ts";

export function useSearchSuppliers(query: string) {
  const { data: searchedSuppliers } = useQuery({
    queryKey: ["searchedSuppliers", query],
    queryFn: () => supplierService.search(query),
    enabled: query !== "",
  });
  return { searchedSuppliers };
}
