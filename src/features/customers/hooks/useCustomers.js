import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { customerService } from "../../../services/customerService";
export function useCustomers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  //PAGINATION
  const {
    isLoading: isLoading,
    data: { content: customers, totalElements: customersNum, totalPages } = {},
    error,
  } = useQuery({
    queryKey: ["customers", { page, pageSize }],
    queryFn: () => customerService.getCustomers({ page, pageSize }),
  });

  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu khách hàng");
    }
  }, [error]);

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

  return { isLoading, customers, customersNum };
}
