/* eslint-disable react/prop-types */
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import CreatePaymentForm from "./CreatePaymentForm";

function CreatePayment({ supplier }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [createPaymentForm] = Form.useForm();

  if (!supplier || supplier.payable === 0) {
    return (
      <Button type="primary" className="btn-primary" disabled>
        Lập phiếu chi
      </Button>
    );
  }

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    createPaymentForm.resetFields();
    setIsOpenModal(false);
  }
  return (
    <>
      <Button type="primary" className="btn-primary" onClick={showModal}>
        Lập phiếu chi
      </Button>

      <Modal
        open={isOpenModal}
        title={<span className="text-xl">Lập phiếu chi</span>}
        width={500}
        footer={null}
        destroyOnClose
        onCancel={handleCancel}
      >
        <CreatePaymentForm
          form={createPaymentForm}
          supplier={supplier}
          setIsOpenModal={setIsOpenModal}
        />
      </Modal>
    </>
  );
}

export default CreatePayment;
