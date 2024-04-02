import { useCallback, useState } from "react";
import { useSearchProducts } from "../products/hooks/useSearchProducts";
import { debounce } from "lodash";
import { formatCurrency } from "../../utils/helper";
import { AutoComplete, Modal } from "antd";
import { useCartStore } from "../../store/useCartStore";

function SearchProductBar() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { searchedProducts } = useSearchProducts(searchQuery);
  const addToCart = useCartStore((state) => state.addToCart);

  function handleSearch(value) {
    setSearchQuery(value);
  }
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [
    handleSearch,
  ]);

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
    setInputValue("");
    const selectedProduct = searchedProducts.find(
      (product) => product.productId === value,
    );

    if (selectedProduct.stockQuantity === 0) {
      Modal.error({
        title: "Hết hàng",
        content: "Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      setSearchQuery("");
      return;
    }
    addToCart({
      product: selectedProduct,
      quantity: 1,
      unit: selectedProduct.displayedProductUnit.unit,
      unitPrice: selectedProduct.displayedProductUnit.sellingPrice,
    });
  }

  return (
    <AutoComplete
      value={inputValue}
      className="w-[40%]"
      placeholder="Tìm tên sản phẩm..."
      options={productOptions}
      onSelect={handleSelect}
      allowClear
      onChange={(value) => setInputValue(value)}
      onSearch={debouncedHandleSearch}
    />
  );
}

export default SearchProductBar;
