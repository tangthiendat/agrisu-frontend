import { Button, Form, Modal } from "antd";
import CreateReceiptForm from "./CreateReceiptForm.tsx";
import { useState } from "react";
import { type IReceipt, type ICustomer } from "../../interfaces";

interface CreateReceiptProps {
  customer: ICustomer;
}

const CreateReceipt: React.FC<CreateReceiptProps> = ({ customer }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [createReceiptForm] = Form.useForm<IReceipt>();

  if (customer.receivable === 0) {
    return (
      <Button type="primary" className="btn-primary" disabled>
        Lập phiếu thu
      </Button>
    );
  }

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    setIsOpenModal(false);
    createReceiptForm.resetFields();
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
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default CreateReceipt;
