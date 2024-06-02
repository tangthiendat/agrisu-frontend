import { useQuery } from "@tanstack/react-query";
import { customerService } from "../../../services/customer-service.ts";

export function useSearchCustomers(query: string) {
  const { data: searchedCustomers } = useQuery({
    queryKey: ["searchedCustomers", query],
    queryFn: () => customerService.search(query),
    enabled: query !== "",
  });
  return { searchedCustomers };
}
