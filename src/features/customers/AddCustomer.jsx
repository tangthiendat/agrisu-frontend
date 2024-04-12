/* eslint-disable no-unused-vars */
import { Button, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateCustomerForm from "./UpdateCustomerForm";

function AddCustomer() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addCustomerForm] = Form.useForm();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    addCustomerForm.resetFields();
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
        Thêm khách hàng
      </Button>
      <Modal
        open={isOpenModal}
        title={<span className="text-xl">Thêm khách hàng</span>}
        width={1000}
        destroyOnClose
        footer={null}
        onCancel={handleCancel}
      >
        <UpdateCustomerForm
          form={addCustomerForm}
          setIsOpenModal={setIsOpenModal}
        />
      </Modal>
    </>
  );
}

export default AddCustomer;
