import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "../../../services/customerService";
import { toast } from "react-toastify";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  const { mutate: updateCustomer, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, customer }) => customerService.update(id, customer),
    onSuccess: () => {
      toast.success("Cập nhật khách hàng thành công");
      queryClient.invalidateQueries("customers");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật khách hàng");
    },
  });
  return { updateCustomer, isUpdating };
}
