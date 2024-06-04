import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { warehouseExportService } from "../../../services/warehouse-export-service.ts";

export function useCreateWarehouseExport() {
  const queryClient = useQueryClient();
  const { mutate: createWarehouseExport, isPending: isCreating } = useMutation({
    mutationFn: warehouseExportService.create,
    onSuccess: () => {
      toast.success("Thêm phiếu xuất kho thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "warehouseExports",
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm phiếu xuất kho");
    },
  });
  return { createWarehouseExport, isCreating };
}
