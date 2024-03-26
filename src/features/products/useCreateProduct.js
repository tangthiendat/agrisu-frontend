import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { productService } from "../../services/productService";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate: createProduct } = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      toast.success("Thêm sản phẩm thành công");
      queryClient.invalidateQueries("products");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm sản phẩm");
    },
  });

  return { createProduct };
}
