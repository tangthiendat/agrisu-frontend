/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Modal, Tabs, Tooltip } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import UpdateSupplierForm from "./UpdateSupplierForm";

function UpdateSupplier({ supplier }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateSupplierForm] = Form.useForm();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    updateSupplierForm.resetFields();
    setIsOpenModal(false);
  }

  const items = [
    {
      key: "1",
      label: "Thông tin",
      children: (
        <UpdateSupplierForm
          supplierToUpdate={supplier}
          setIsOpenModal={setIsOpenModal}
          form={updateSupplierForm}
        />
      ),
    },
    {
      key: "2",
      label: "Công nợ",
      children: "CONG NO",
    },
  ];

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
        title={<span className="text-xl">Cập nhật nhà cung cấp</span>}
        width={1000}
        footer={null}
        destroyOnClose
        onCancel={handleCancel}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Modal>
    </>
  );
}

export default UpdateSupplier;
