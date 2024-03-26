/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Button, Form, Modal } from "antd";

import UpdateProductForm from "./UpdateProductForm";
import { useCreateProduct } from "./useCreateProduct";

function AddProduct() {
  const { createProduct } = useCreateProduct();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateProductForm] = Form.useForm();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    updateProductForm.resetFields();
    setIsOpenModal(false);
  }

  function handleUpdate(submittedProduct) {
    createProduct(submittedProduct, {
      onSettled: () => {
        updateProductForm.resetFields();
      },
    });
  }
  return (
    <>
      <Button
        type="primary"
        className="btn-primary h-10"
        icon={<FaPlus />}
        onClick={showModal}
      >
        Thêm sản phẩm
      </Button>
      <Modal
        open={isOpenModal}
        title="Cập nhật sản phẩm"
        width={1000}
        okText="Cập nhật"
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
          onFinish={handleUpdate}
          setIsOpenModal={setIsOpenModal}
        />
      </Modal>
    </>
  );
}

export default AddProduct;
