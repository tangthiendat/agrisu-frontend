import { useQuery } from "@tanstack/react-query";
import { supplierService } from "../../../services/supplierService";

export function useSearchSuppliers(query) {
  const { data: searchedSuppliers } = useQuery({
    queryKey: ["searchedSuppliers", query],
    queryFn: () => supplierService.search(query),
    keepPreviousData: true,
    enabled: query !== "",
  });
  return { searchedSuppliers };
}
