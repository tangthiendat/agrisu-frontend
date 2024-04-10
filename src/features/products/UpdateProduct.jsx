/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Form, Modal, Tooltip } from "antd";
import UpdateProductForm from "./UpdateProductForm";
function UpdateProduct({ product }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateProductForm] = Form.useForm();
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
        width={1000}
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
}

export default UpdateProduct;
