/* eslint-disable no-unused-vars */
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Grid } from "antd";

import UpdateProductForm from "./UpdateProductForm";

const { useBreakpoint } = Grid;

function AddProduct() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addProductForm] = Form.useForm();
  const screens = useBreakpoint();

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
        width={screens.lg ? "900px" : "85%"}
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
