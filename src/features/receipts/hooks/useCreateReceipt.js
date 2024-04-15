import { useMutation, useQueryClient } from "@tanstack/react-query";
import { receiptService } from "../../../services/receiptService";
import { toast } from "react-toastify";

export function useCreateReceipt() {
  const queryClient = useQueryClient();
  const { mutate: createReceipt } = useMutation({
    mutationFn: receiptService.create,
    onSuccess: () => {
      toast.success("Tạo phiếu thu thành công");
      queryClient.invalidateQueries("receipts");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi tạo phiếu thu");
    },
  });
  return { createReceipt };
}
