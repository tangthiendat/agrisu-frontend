import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supplierService } from "../../../services/supplierService";
import { toast } from "react-toastify";

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  const { mutate: createSupplier, isPending: isCreating } = useMutation({
    mutationFn: supplierService.create,
    onSuccess: () => {
      toast.success("Thêm nhà cung cấp thành công");
      queryClient.invalidateQueries("suppliers");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm nhà cung cấp");
    },
  });
  return { createSupplier, isCreating };
}
