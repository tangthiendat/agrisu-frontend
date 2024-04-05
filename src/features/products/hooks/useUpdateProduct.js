import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../../services/productService";
import { toast } from "react-toastify";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, product }) => productService.update(id, product),

    onSuccess: () => {
      toast.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries("products");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm");
    },
  });
  return { updateProduct, isUpdating };
}
