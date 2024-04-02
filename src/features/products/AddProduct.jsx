/* eslint-disable no-unused-vars */
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";

import UpdateProductForm from "./UpdateProductForm";
import { useCreateProduct } from "./hooks/useCreateProduct";

function AddProduct() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isCreating, createProduct } = useCreateProduct();
  const [addProductForm] = Form.useForm();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    addProductForm.resetFields();
    setIsOpenModal(false);
  }

  function handleCreateProduct(submittedProduct) {
    createProduct(submittedProduct, {
      onSettled: () => {
        addProductForm.resetFields();
        setIsOpenModal(false);
      },
    });
  }

  return (
    <>
      <Button
        type="primary"
        className="btn-primary h-10"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Thêm sản phẩm
      </Button>
      <Modal
        open={isOpenModal}
        title="Thêm sản phẩm"
        width={1000}
        okText="Thêm"
        destroyOnClose
        okButtonProps={{
          form: "updateProductForm",
          htmlType: "submit",
          className: "btn-primary",
          loading: isCreating,
        }}
        cancelText="Hủy"
        onCancel={handleCancel}
      >
        <UpdateProductForm
          form={addProductForm}
          onFinish={handleCreateProduct}
        />
      </Modal>
    </>
  );
}

export default AddProduct;
