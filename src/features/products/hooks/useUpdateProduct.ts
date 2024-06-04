import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { productService } from "../../../services/product-service.ts";
import { type IProduct } from "../../../interfaces";

interface MutationArgs {
  id: string;
  product: IProduct;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, product }: MutationArgs) =>
      productService.update(id, product),
    onSuccess: () => {
      toast.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "products",
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm");
    },
  });
  return { updateProduct, isUpdating };
}
