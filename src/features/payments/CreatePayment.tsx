import { Button, Form, Modal } from "antd";
import { useState } from "react";
import CreatePaymentForm from "./CreatePaymentForm.tsx";
import { type IPayment, type ISupplier } from "../../interfaces";

interface CreatePaymentProps {
  supplier: ISupplier;
}

const CreatePayment: React.FC<CreatePaymentProps> = ({ supplier }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [createPaymentForm] = Form.useForm<IPayment>();

  if (supplier.payable === 0) {
    return (
      <Button type="primary" className="btn-primary" disabled>
        Lập phiếu chi
      </Button>
    );
  }

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    setIsOpenModal(false);
    createPaymentForm.resetFields();
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
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default CreatePayment;
