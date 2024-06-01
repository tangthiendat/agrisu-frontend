import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Form, Modal, Tooltip, Grid } from "antd";
import UpdateProductForm from "./UpdateProductForm.tsx";
import { IProduct } from "../../interfaces";

const { useBreakpoint } = Grid;

interface UpdateProductProps {
  product: IProduct;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ product }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateProductForm] = Form.useForm();
  const screens = useBreakpoint();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    updateProductForm.resetFields();
    setIsOpenModal(false);
  }

  return (
    <>
      <Tooltip title="Chỉnh sửa" placement="bottom">
        <MdOutlineEdit
          className="icon"
          color="var(--color-green-500)"
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        open={isOpenModal}
        destroyOnClose
        title={<span className="text-xl">Cập nhật sản phẩm</span>}
        width={screens.lg ? "900px" : "85%"}
        footer={null}
        onCancel={handleCancel}
      >
        <UpdateProductForm
          form={updateProductForm}
          setIsOpenModal={setIsOpenModal}
          productToUpdate={product}
        />
      </Modal>
    </>
  );
};

export default UpdateProduct;
