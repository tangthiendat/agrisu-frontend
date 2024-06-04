import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Grid } from "antd";
import UpdateProductForm from "./UpdateProductForm.tsx";
import { type IProduct } from "../../interfaces";

const { useBreakpoint } = Grid;

const AddProduct: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addProductForm] = Form.useForm<IProduct>();
  const screens = useBreakpoint();

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    setIsOpenModal(false);
    addProductForm.resetFields();
  }

  return (
    <>
      <Button
        type="primary"
        className="btn-primary h-10"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Thêm sản phẩm
      </Button>
      <Modal
        open={isOpenModal}
        title={<span className="text-xl">Thêm sản phẩm</span>}
        width={screens.lg ? "900px" : "85%"}
        footer={null}
        destroyOnClose
        onCancel={handleCancel}
      >
        <UpdateProductForm form={addProductForm} onCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default AddProduct;
