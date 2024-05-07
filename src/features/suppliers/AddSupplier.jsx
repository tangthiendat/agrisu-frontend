import { useState } from "react";
import { Button, Form, Modal, Grid } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UpdateSupplierForm from "./UpdateSupplierForm";

const { useBreakpoint } = Grid;
function AddSupplier() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addSupplierForm] = Form.useForm();
  const screens = useBreakpoint();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    addSupplierForm.resetFields();
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
        <UpdateSupplierForm
          form={addSupplierForm}
          onCancel={handleCancel}
          setIsOpenModal={setIsOpenModal}
        />
      </Modal>
    </>
  );
}

export default AddSupplier;
