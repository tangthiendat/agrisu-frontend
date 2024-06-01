import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { productService } from "../../../services/product-service.ts";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      toast.success("Thêm sản phẩm thành công");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm sản phẩm");
    },
  });

  return { createProduct, isCreating };
}
