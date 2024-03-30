import { useQuery } from "@tanstack/react-query";
import { customerService } from "../../../services/customerService";

export function useCountCustomer() {
  const { data: customersNum } = useQuery({
    queryKey: "customersNum",
    queryFn: customerService.count,
  });
  return { customersNum };
}
