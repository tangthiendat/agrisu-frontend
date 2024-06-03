import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { supplierService } from "../../../services/supplier-service.ts";

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  const { mutate: createSupplier, isPending: isCreating } = useMutation({
    mutationFn: supplierService.create,
    onSuccess: () => {
      toast.success("Thêm nhà cung cấp thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "suppliers",
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm nhà cung cấp");
    },
  });
  return { createSupplier, isCreating };
}
