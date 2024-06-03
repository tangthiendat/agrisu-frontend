import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { supplierService } from "../../../services/supplier-service.ts";
import { type ISupplier } from "../../../interfaces";

interface MutationArgs {
  id: string;
  supplier: ISupplier;
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  const { mutate: updateSupplier, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, supplier }: MutationArgs) =>
      supplierService.update(id, supplier),
    onSuccess: () => {
      toast.success("Cập nhật nhà cung cấp thành công");
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật nhà cung cấp");
    },
  });
  return { updateSupplier, isUpdating };
}
