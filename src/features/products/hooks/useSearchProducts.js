import { useQuery } from "@tanstack/react-query";
import { productService } from "../../../services/productService";
export function useSearchProducts(query) {
  const { data: searchedProducts } = useQuery({
    queryKey: ["searchedProducts", query],
    queryFn: () => productService.search(query),
    keepPreviousData: true,
    enabled: query !== "",
  });
  return { searchedProducts };
}
