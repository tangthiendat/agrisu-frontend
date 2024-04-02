/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Form, Modal, Tooltip } from "antd";
import UpdateProductForm from "./UpdateProductForm";
import { useUpdateProduct } from "./hooks/useUpdateProduct";
function UpdateProduct({ product }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isUpdating, updateProduct } = useUpdateProduct();
  const [updateProductForm] = Form.useForm();
  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    updateProductForm.resetFields();
    setIsOpenModal(false);
  }

  function handleUpdateProduct(submittedProduct) {
    updateProduct(
      { id: product.productId, product: submittedProduct },
      {
        onSettled: () => {
          updateProductForm.resetFields();
          setIsOpenModal(false);
        },
      },
    );
  }

  return (
    <>
      <Tooltip title="Chỉnh sửa" placement="bottom">
        <MdOutlineEdit
          className="icon"
          color="var(--color-green-500)"
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        open={isOpenModal}
        destroyOnClose
        title="Cập nhật sản phẩm"
        width={1000}
        okText="Cập nhật"
        okButtonProps={{
          form: "updateProductForm",
          htmlType: "submit",
          className: "btn-primary",
          loading: isUpdating,
        }}
        cancelText="Hủy"
        onCancel={handleCancel}
      >
        <UpdateProductForm
          form={updateProductForm}
          setIsOpenModal={setIsOpenModal}
          productToUpdate={product}
          onFinish={handleUpdateProduct}
        />
      </Modal>
    </>
  );
}

export default UpdateProduct;
