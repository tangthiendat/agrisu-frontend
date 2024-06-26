import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { supplierService } from "../../../services/supplier-service.ts";

export function useDeleteSupplier() {
  const queryClient = useQueryClient();
  const { mutate: deleteSupplier, isPending: isDeleting } = useMutation({
    mutationFn: supplierService.delete,
    onSuccess: () => {
      toast.success("Xóa nhà cung cấp thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "suppliers",
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi xóa nhà cung cấp");
    },
  });
  return { deleteSupplier, isDeleting };
}
