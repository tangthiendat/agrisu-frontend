/* eslint-disable react/prop-types */
// import { Form } from "antd";
// import { useState } from "react";

import { Button, Form, Modal } from "antd";
import CreateReceiptForm from "./CreateReceiptForm";
import { useState } from "react";

function CreateReceipt({ customer }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [createReceiptForm] = Form.useForm();

  if (!customer || customer.receivable === 0) {
    return (
      <Button type="primary" className="btn-primary" disabled>
        Thanh toán
      </Button>
    );
  }

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    createReceiptForm.resetFields();
    setIsOpenModal(false);
  }
  return (
    <>
      <Button type="primary" className="btn-primary" onClick={showModal}>
        Thanh toán
      </Button>

      <Modal
        open={isOpenModal}
        title={<span className="text-xl">Lập phiếu thu</span>}
        width={500}
        footer={null}
        destroyOnClose
        onCancel={handleCancel}
      >
        <CreateReceiptForm
          form={createReceiptForm}
          customer={customer}
          setIsOpenModal={setIsOpenModal}
        />
      </Modal>
    </>
  );
}

export default CreateReceipt;
