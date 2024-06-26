import { useQuery } from "@tanstack/react-query";
import { productService } from "../../../services/product-service.ts";

export function useSearchProducts(query: string) {
  const { data: searchedProducts } = useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => productService.search(query),
    enabled: query !== "",
  });
  return { searchedProducts };
}
