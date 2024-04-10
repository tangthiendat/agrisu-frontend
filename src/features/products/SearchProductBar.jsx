import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AutoComplete, Modal, Space, Tooltip, Button, Form } from "antd";
import { debounce } from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import { useSearchProducts } from "./hooks/useSearchProducts";
import { formatCurrency } from "../../utils/helper";
import UpdateProductForm from "./UpdateProductForm";
import { addItem } from "../orders/orderSlice";

function SearchProductBar() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { searchedProducts } = useSearchProducts(searchQuery);
  const [modal, contextHolder] = Modal.useModal();

  const orderDetails = useSelector((state) => state.order.orderDetails);
  const dispatch = useDispatch();
  const [updateProductForm] = Form.useForm();

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

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    updateProductForm.resetFields();
    setIsOpenModal(false);
  }

  return (
    <>
      {contextHolder}
      <Space.Compact className="w-[40%]">
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
        <Tooltip title="Thêm sản phẩm" placement="bottom">
          <Button
            style={{ borderRadius: "0 0.375rem 0.375rem 0" }}
            icon={<PlusOutlined onClick={showModal} />}
          />
        </Tooltip>
        <Modal
          open={isOpenModal}
          title={<span className="text-xl">Thêm sản phẩm</span>}
          width={1000}
          okText="Thêm"
          destroyOnClose
          okButtonProps={{
            form: "updateProductForm",
            htmlType: "submit",
            className: "btn-primary",
          }}
          cancelText="Hủy"
          onCancel={handleCancel}
        >
          <UpdateProductForm
            form={updateProductForm}
            setIsOpenModal={setIsOpenModal}
          />
        </Modal>
      </Space.Compact>
    </>
  );
}

export default SearchProductBar;
