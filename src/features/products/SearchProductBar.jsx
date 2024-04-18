import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AutoComplete, Modal } from "antd";
import { debounce } from "lodash";
import { useSearchProducts } from "./hooks/useSearchProducts";
import { formatCurrency } from "../../utils/helper";
import { addItem } from "../orders/orderSlice";

function SearchProductBar() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { searchedProducts } = useSearchProducts(searchQuery);
  const [modal, contextHolder] = Modal.useModal();

  const orderDetails = useSelector((state) => state.order.orderDetails);
  const dispatch = useDispatch();

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
    setInputValue("");
    const selectedProduct = searchedProducts.find(
      (product) => product.productId === value,
    );

    //check if the selected product is in cart
    const isProductInCart = orderDetails.some(
      (cartItem) => cartItem.product.productId === selectedProduct.productId,
    );
    if (isProductInCart) {
      modal.error({
        title: "Sản phẩm đã có trong giỏ hàng",
        content: "Vui lòng chọn sản phẩm khác.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      setSearchQuery("");
      return;
    }

    if (selectedProduct.stockQuantity === 0) {
      modal.error({
        title: "Sản phẩm đã hết hàng",
        content: "Vui lòng chọn sản phẩm khác.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      setSearchQuery("");
      return;
    }
    dispatch(
      addItem({
        product: selectedProduct,
        quantity: 1,
        unit: selectedProduct.displayedProductUnit.unit,
        unitPrice: selectedProduct.displayedProductUnit.sellingPrice,
      }),
    );
    setSearchQuery("");
  }

  return (
    <>
      {contextHolder}
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
    </>
  );
}

export default SearchProductBar;
