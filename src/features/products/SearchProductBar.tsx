import { useCallback, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { debounce } from "lodash";
import { useSearchProducts } from "./hooks";
import { formatCurrency } from "../../utils/helper.ts";
import { type IProduct } from "../../interfaces";

interface SearchProductBarProps {
  onSelectProduct: (product: IProduct) => void;
  onClear?: () => void;
  showSelectedLabel?: boolean;
  useOriginalPrice?: boolean;
}

const SearchProductBar: React.FC<SearchProductBarProps> = ({
  onSelectProduct,
  onClear,
  showSelectedLabel = true,
  useOriginalPrice = true,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { searchedProducts } = useSearchProducts(searchQuery);

  useEffect(() => {
    if (inputValue === "") {
      onClear?.();
    }
  }, [inputValue, onClear]);

  function handleSearch(value: string) {
    setSearchQuery(value);
  }
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const productOptions = searchedProducts?.map((product) => ({
    value: product.productId,
    label: (
      <div className="px-1 py-2">
        <div className="mb-1 flex flex-wrap justify-between font-semibold">
          <div className="text-wrap">
            {product.productName}{" "}
            <span className="bg-sky-100 px-[3px] py-[3px] text-sky-600">
              {product.displayedProductUnit.unit.unitName}
            </span>
          </div>
          <div className="text-sky-600">
            {formatCurrency(
              useOriginalPrice
                ? product.displayedProductUnit.originalPrice
                : product.displayedProductUnit.sellingPrice,
            )}
          </div>
        </div>
        <div>
          <span
            className={`text-xs ${
              product.stockQuantity === 0 ? "text-red-500" : ""
            }`}
          >{`Tồn: ${product.stockQuantity}`}</span>
        </div>
      </div>
    ),
  }));

  function handleSelect(value: string) {
    const selectedProduct = searchedProducts.find(
      (product) => product.productId === value,
    );
    onSelectProduct(selectedProduct);

    if (showSelectedLabel) {
      setInputValue(selectedProduct.productName);
    } else {
      setInputValue("");
    }
    setSearchQuery("");
  }

  return (
    <AutoComplete
      value={inputValue}
      className="w-full"
      placeholder="Tìm sản phẩm..."
      options={productOptions}
      onSelect={handleSelect}
      allowClear
      onChange={setInputValue}
      onSearch={debouncedHandleSearch}
    />
  );
};

export default SearchProductBar;
