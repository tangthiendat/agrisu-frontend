import { useQuery } from "@tanstack/react-query";
import { customerService } from "../../../services/customerService";

export function useCustomerHistory(customerId) {
  const { data: customerHistory, isLoading } = useQuery({
    queryFn: () => customerService.getHistory(customerId),
    queryKey: ["customerHistory", customerId],
  });
  return { customerHistory, isLoading };
}
