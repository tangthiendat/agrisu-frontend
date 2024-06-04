import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../../services/order-service.ts";
import { toast } from "react-toastify";
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: orderService.create,
    onSuccess: () => {
      toast.success("Thêm hoá đơn thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "orders",
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm hóa đơn");
    },
  });
  return { createOrder, isCreating };
}
