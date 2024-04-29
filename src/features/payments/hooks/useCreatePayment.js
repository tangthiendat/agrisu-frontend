import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { paymentService } from "../../../services/paymentService";

export function useCreatePayment() {
  const queryClient = useQueryClient();
  const { mutate: createPayment, isPending: isCreating } = useMutation({
    mutationFn: paymentService.create,
    onSuccess: () => {
      toast.success("Tạo phiếu chi thành công");
      queryClient.invalidateQueries("payments");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi tạo phiếu chi");
    },
  });
  return { createPayment, isCreating };
}
