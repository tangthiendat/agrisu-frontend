import { useState } from "react";
import { Button, Form, Modal, Grid } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UpdateSupplierForm from "./UpdateSupplierForm.tsx";
import { type ISupplier } from "../../interfaces";

const { useBreakpoint } = Grid;

const AddSupplier: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addSupplierForm] = Form.useForm<ISupplier>();
  const screens = useBreakpoint();

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    setIsOpenModal(false);
    addSupplierForm.resetFields();
  }

  return (
    <>
      <Button
        type="primary"
        className="btn-primary h-10"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Thêm nhà cung cấp
      </Button>
      <Modal
        open={isOpenModal}
        title={<span className="text-xl">Thêm nhà cung cấp</span>}
        width={screens.lg ? "900px" : "85%"}
        destroyOnClose
        footer={null}
        onCancel={handleCancel}
      >
        <UpdateSupplierForm form={addSupplierForm} onCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default AddSupplier;
