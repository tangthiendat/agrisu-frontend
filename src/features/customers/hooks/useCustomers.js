import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { customerService } from "../../../services/customerService";
export function useCustomers(page, pageSize) {
  const {
    isLoading: isLoadingCustomers,
    data: customers,
    error,
  } = useQuery({
    queryKey: ["customers", page, pageSize],
    queryFn: () => customerService.getCustomers(page, pageSize),
  });
  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu khách hàng");
    }
  }, [error]);

  return { isLoadingCustomers, customers };
}
