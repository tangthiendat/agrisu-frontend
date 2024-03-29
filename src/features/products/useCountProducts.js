import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/productService";

export function useCountProducts() {
  const { data: productsNum } = useQuery({
    queryKey: "productsNum",
    queryFn: productService.count,
  });
  return { productsNum };
}
