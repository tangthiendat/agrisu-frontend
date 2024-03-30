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
        title="Thêm khách hàng"
        width={1000}
        okText="Thêm"
        destroyOnClose
        okButtonProps={{
          form: "updateCustomerForm",
          htmlType: "submit",
          className: "btn-primary",
        }}
        cancelText="Hủy"
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
