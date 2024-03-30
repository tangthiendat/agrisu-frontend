import { useQuery } from "@tanstack/react-query";
import { productTypeService } from "../../../services/productTypeService";

export function useProductTypes() {
  const { data: productTypes } = useQuery({
    queryKey: ["productTypes"],
    queryFn: productTypeService.getAll,
  });
  return { productTypes };
}
