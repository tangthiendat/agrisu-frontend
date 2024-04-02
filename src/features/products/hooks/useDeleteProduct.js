import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../../services/productService";
import { toast } from "react-toastify";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      toast.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries("products");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi xóa sản phẩm");
    },
  });
  return { deleteProduct, isDeleting };
}
