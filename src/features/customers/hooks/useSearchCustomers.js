import { useQuery } from "@tanstack/react-query";
import { customerService } from "../../../services/customerService";
export function useSearchCustomers(query) {
  const { data: searchedCustomers } = useQuery({
    queryKey: ["searchedCustomers", query],
    queryFn: () => customerService.search(query),
    keepPreviousData: true,
    enabled: query !== "",
  });
  return { searchedCustomers };
}
