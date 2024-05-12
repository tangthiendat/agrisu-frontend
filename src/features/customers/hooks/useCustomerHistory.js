import { useQuery } from "@tanstack/react-query";
import { customerService } from "../../../services/customerService";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useCustomerHistory(customerId) {
  const {
    data: customerHistory,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => customerService.getHistory(customerId),
    queryKey: ["customerHistory", customerId],
  });
  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải công nợ chi tiết của khách hàng");
    }
  }, [error]);
  return { customerHistory, isLoading };
}
