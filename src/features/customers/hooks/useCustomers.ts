import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { customerService } from "../../../services/customer-service.ts";

export function useCustomers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page: number = Number(searchParams.get("page")) || 1;
  const pageSize: number = Number(searchParams.get("pageSize")) || 10;

  //PAGINATION
  const {
    isLoading: isLoading,
    data: { content: customers, totalElements: numCustomers, totalPages } = {},
    error,
  } = useQuery({
    queryKey: ["customers", { page, pageSize }],
    queryFn: () => customerService.getCustomers({ page, pageSize }),
  });

  //PREFETCH
  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["customers", { page: page + 1, pageSize }],
      queryFn: () => customerService.getCustomers({ page: page + 1, pageSize }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["customers", { page: page - 1, pageSize }],
      queryFn: () => customerService.getCustomers({ page: page - 1, pageSize }),
    });
  }

  return { isLoading, customers, numCustomers, error };
}
