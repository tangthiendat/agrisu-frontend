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
        title="Cập nhật sản phẩm"
        width={1000}
        okText="Cập nhật"
        okButtonProps={{
          form: "updateProductForm",
          htmlType: "submit",
          className: "btn-primary",
        }}
        cancelText="Hủy"
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
