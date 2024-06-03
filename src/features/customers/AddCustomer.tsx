import { Button, Form, Modal, Grid } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateCustomerForm from "./UpdateCustomerForm.tsx";
import { type ICustomer } from "../../interfaces";

const { useBreakpoint } = Grid;

const AddCustomer: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addCustomerForm] = Form.useForm<ICustomer>();
  const screens = useBreakpoint();

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
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
        width={screens.lg ? "900px" : "85%"}
        destroyOnClose
        footer={null}
        onCancel={handleCancel}
      >
        <UpdateCustomerForm
          form={addCustomerForm}
          setIsOpenModal={setIsOpenModal}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default AddCustomer;
