import { useQuery } from "@tanstack/react-query";
import { customerService } from "../../../services/customerService";
export function useCustomers(page, pageSize) {
  const { isLoading: isLoadingCustomers, data: customers } = useQuery({
    queryKey: ["customers", page, pageSize],
    queryFn: () => customerService.getCustomers(page, pageSize),
  });
  return { isLoadingCustomers, customers };
}
