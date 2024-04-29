import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "../../../services/customerService";
import { toast } from "react-toastify";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const { mutate: deleteCustomer, isPending: isDeleting } = useMutation({
    mutationFn: customerService.delete,
    onSuccess: () => {
      toast.success("Xóa khách hàng thành công");
      queryClient.invalidateQueries("customers");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi xóa khách hàng");
    },
  });
  return { deleteCustomer, isDeleting };
}
