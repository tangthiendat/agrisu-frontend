import { Button, Form, Modal } from "antd";
import CreateReceiptForm from "./CreateReceiptForm";
import { useState } from "react";

function CreateReceipt({ customer }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [createReceiptForm] = Form.useForm();

  if (!customer || customer.receivable === 0) {
    return (
      <Button type="primary" className="btn-primary" disabled>
        Lập phiếu thu
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
        Lập phiếu thu
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
