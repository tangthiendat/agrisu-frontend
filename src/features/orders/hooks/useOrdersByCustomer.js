import { useQuery } from "react-query";
import orderService from "../../../services/orderService";
export function useOrderByCustomer(customerId) {
  const { data: customerOrders, isLoading: isLoadingCustomerOrders } = useQuery(
    {
      queryKey: ["orders", customerId],
      queryFn: orderService.getOrdersByCustomerId,
    },
  );
  return { customerOrders, isLoadingCustomerOrders };
}
