import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { customerService } from "../../../services/customer-service.ts";
import { type ICustomer } from "../../../interfaces";

interface MutationArgs {
  id: string;
  customer: ICustomer;
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  const { mutate: updateCustomer, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, customer }: MutationArgs) =>
      customerService.update(id, customer),
    onSuccess: () => {
      toast.success("Cập nhật khách hàng thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "customers",
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật khách hàng");
    },
  });
  return { updateCustomer, isUpdating };
}
