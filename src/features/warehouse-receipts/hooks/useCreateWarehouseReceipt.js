import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { warehouseReceiptService } from "../../../services/warehouseReceiptService";

export function useCreateWarehouseReceipt() {
  const queryClient = useQueryClient();
  const { mutate: createWarehouseReceipt, isPending: isCreating } = useMutation(
    {
      mutationFn: warehouseReceiptService.create,
      onSuccess: () => {
        toast.success("Thêm phiếu nhập kho thành công");
        queryClient.invalidateQueries("warehouseReceipts");
      },
      onError: () => {
        toast.error("Có lỗi xảy ra khi thêm phiếu nhập hàng");
      },
    },
  );
  return { createWarehouseReceipt, isCreating };
}
