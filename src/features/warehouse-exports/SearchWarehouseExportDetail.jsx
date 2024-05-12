import { Button, Form, Modal, Space, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import SearchProductBar from "../products/SearchProductBar";
import { addItem } from "./warehouseExportSlice";
import UpdateProductForm from "../products/UpdateProductForm";

function SearchWarehouseExportDetail() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateProductForm] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const warehouseExportDetails = useSelector(
    (state) => state.warehouseExport.warehouseExportDetails,
  );
  const dispatch = useDispatch();
  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    updateProductForm.resetFields();
    setIsOpenModal(false);
  }

  function handleSelectProduct(selectedProduct) {
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
      const isProductInCart = warehouseExportDetails.some(
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
      <Space.Compact className="w-[60%] xl:w-[40%]">
        <SearchProductBar
          cartItems={warehouseExportDetails}
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
          <UpdateProductForm
            form={updateProductForm}
            setIsOpenModal={setIsOpenModal}
          />
        </Modal>
      </Space.Compact>
    </>
  );
}

export default SearchWarehouseExportDetail;
