import { Button, Form, Modal, Space, Tooltip } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import SearchProductBar from "../products/SearchProductBar.tsx";
import UpdateProductForm from "../products/UpdateProductForm.tsx";
import { addItem } from "./warehouseExportSlice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  type INewWarehouseExportDetail,
  type IProduct,
} from "../../interfaces";

const SearchWarehouseExportDetail: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateProductForm] = Form.useForm<IProduct>();
  const [modal, contextHolder] = Modal.useModal();
  const warehouseExportDetails: INewWarehouseExportDetail[] = useAppSelector(
    (state) => state.warehouseExport.warehouseExportDetails,
  );
  const dispatch = useAppDispatch();

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    setIsOpenModal(false);
    updateProductForm.resetFields();
  }

  function handleSelectProduct(selectedProduct: IProduct) {
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
      const isProductInCart: boolean = warehouseExportDetails.some(
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
            unitPrice: selectedProduct.displayedProductUnit.sellingPrice,
          }),
        );
      }
    }
  }

  return (
    <>
      {contextHolder}
      <Space.Compact className="w-[50%]">
        <SearchProductBar
          onSelectProduct={handleSelectProduct}
          showSelectedLabel={false}
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

export default SearchWarehouseExportDetail;
