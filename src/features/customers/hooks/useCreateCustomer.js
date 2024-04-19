import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { customerService } from "../../../services/customerService";

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  const { mutate: createCustomer, isPending: isCreating } = useMutation({
    mutationFn: customerService.create,
    onSuccess: () => {
      toast.success("Thêm khách hàng thành công");
      queryClient.invalidateQueries("customers");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm khách hàng");
    },
  });
  return { createCustomer, isCreating };
}
