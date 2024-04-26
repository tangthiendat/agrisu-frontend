import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { goodReceiptService } from "../../../services/goodReceiptService";

export function useCreateGoodReceipt() {
  const queryClient = useQueryClient();
  const { mutate: createGoodReceipt, isPending: isCreating } = useMutation({
    mutationFn: goodReceiptService.create,
    onSuccess: () => {
      toast.success("Thêm phiếu nhập hàng thành công");
      queryClient.invalidateQueries("goodReceipts");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm phiếu nhập hàng");
    },
  });
  return { createGoodReceipt, isCreating };
}
