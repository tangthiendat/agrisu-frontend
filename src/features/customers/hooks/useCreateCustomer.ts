import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { customerService } from "../../../services/customer-service.ts";

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  const { mutate: createCustomer, isPending: isCreating } = useMutation({
    mutationFn: customerService.create,
    onSuccess: () => {
      toast.success("Thêm khách hàng thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "customers",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Có lỗi xảy ra khi thêm khách hàng");
    },
  });
  return { createCustomer, isCreating };
}
