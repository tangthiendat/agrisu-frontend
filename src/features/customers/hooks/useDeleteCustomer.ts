import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { customerService } from "../../../services/customer-service.ts";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const { mutate: deleteCustomer, isPending: isDeleting } = useMutation({
    mutationFn: customerService.delete,
    onSuccess: () => {
      toast.success("Xóa khách hàng thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "customers",
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi xóa khách hàng");
    },
  });
  return { deleteCustomer, isDeleting };
}
