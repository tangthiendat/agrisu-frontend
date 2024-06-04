import { Button, Form, Modal, Space, Tooltip } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import SearchProductBar from "../products/SearchProductBar.tsx";
import UpdateProductForm from "../products/UpdateProductForm.tsx";
import { addItem } from "./warehouseReceiptSlice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  type INewWarehouseReceiptDetail,
  type IProduct,
} from "../../interfaces";

const SearchWarehouseReceiptDetail: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateProductForm] = Form.useForm<IProduct>();
  const [modal, contextHolder] = Modal.useModal();
  const warehouseReceiptDetails: INewWarehouseReceiptDetail[] = useAppSelector(
    (state) => state.warehouseReceipt.warehouseReceiptDetails,
  );
  const dispatch = useAppDispatch();

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    setIsOpenModal(false);
    updateProductForm.resetFields();
  }

  function handleSelectProduct(selectedProduct: IProduct): void {
    if (selectedProduct.stockQuantity === 0) {
      modal.error({
        title: "Sản phẩm đã hết hàng",
        content: "Vui lòng chọn sản phẩm khác.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
    } else {
      //check if the selected product is in cart
      const isProductInCart: boolean = warehouseReceiptDetails.some(
        (cartItem) => cartItem.product.productId === selectedProduct.productId,
      );
      if (isProductInCart) {
        modal.error({
          title: "Sản phẩm đã tồn tại trong giỏ hàng",
          content: "Vui lòng chọn sản phẩm khác.",
          okButtonProps: {
            className: "btn-primary",
          },
        });
      } else {
        dispatch(
          addItem({
            product: selectedProduct,
            quantity: 1,
            unit: selectedProduct.displayedProductUnit.unit,
            unitPrice: selectedProduct.displayedProductUnit.originalPrice,
          }),
        );
      }
    }
  }

  return (
    <>
      {contextHolder}
      <Space.Compact className="w-[50%] ">
        <SearchProductBar
          onSelectProduct={handleSelectProduct}
          showSelectedLabel={false}
          useOriginalPrice={true}
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
          <UpdateProductForm form={updateProductForm} onCancel={handleCancel} />
        </Modal>
      </Space.Compact>
    </>
  );
};

export default SearchWarehouseReceiptDetail;
