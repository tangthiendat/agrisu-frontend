/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { debounce } from "lodash";
import { useSearchProducts } from "./hooks/useSearchProducts";
import { formatCurrency } from "../../utils/helper";

function SearchProductBar({ onSelectProduct, onClear }) {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { searchedProducts } = useSearchProducts(searchQuery);

  useEffect(() => {
    if (inputValue === "") {
      onClear?.();
    }
  }, [inputValue, onClear]);

  function handleSearch(value) {
    setSearchQuery(value);
  }
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const productOptions = searchedProducts?.map((product) => ({
    value: product.productId,
    label: (
      <div className="px-1 py-2">
        <div className="mb-1 flex justify-between font-semibold">
          <div>
            {product.productName}{" "}
            <span className="bg-sky-100 px-[3px] py-[3px] text-sky-600">
              {product.displayedProductUnit.unit.unitName}
            </span>
          </div>
          <div className="text-sky-600">
            {formatCurrency(product.displayedProductUnit.sellingPrice)}
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

  function handleSelect(value) {
    const selectedProduct = searchedProducts.find(
      (product) => product.productId === value,
    );
    onSelectProduct(selectedProduct);
    setInputValue(selectedProduct.productName);
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
}

export default SearchProductBar;
