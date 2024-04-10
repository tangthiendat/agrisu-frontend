/* eslint-disable no-unused-vars */
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";

import UpdateProductForm from "./UpdateProductForm";

function AddProduct() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addProductForm] = Form.useForm();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    addProductForm.resetFields();
    setIsOpenModal(false);
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
        title={<span className="text-xl">Thêm sản phẩm</span>}
        width={1000}
        footer={null}
        destroyOnClose
        onCancel={handleCancel}
      >
        <UpdateProductForm
          form={addProductForm}
          setIsOpenModal={setIsOpenModal}
        />
      </Modal>
    </>
  );
}

export default AddProduct;
