import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { warehouseExportService } from "../../../services/warehouseExportService";

export function useCreateWarehouseExport() {
  const queryClient = useQueryClient();
  const { mutate: createWarehouseExport, isPending: isCreating } = useMutation({
    mutationFn: warehouseExportService.create,
    onSuccess: () => {
      toast.success("Thêm phiếu xuất kho thành công");
      queryClient.invalidateQueries("warehouseReceipts");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm phiếu xuất kho");
    },
  });
  return { createWarehouseExport, isCreating };
}
