/* eslint-disable react/prop-types */
import { MdOutlineEdit } from "react-icons/md";
import { Tooltip, Form, Modal, Tabs, Grid } from "antd";
import { useState } from "react";
import UpdateCustomerForm from "./UpdateCustomerForm";
import CustomerHistory from "./CustomerHistory";

const { useBreakpoint } = Grid;
function UpdateCustomer({ customer }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateCustomerForm] = Form.useForm();
  const screens = useBreakpoint();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    updateCustomerForm.resetFields();
    setIsOpenModal(false);
  }

  const items = [
    {
      key: "1",
      label: "Thông tin",
      children: (
        <UpdateCustomerForm
          customerToUpdate={customer}
          setIsOpenModal={setIsOpenModal}
          form={updateCustomerForm}
        />
      ),
    },
    {
      key: "2",
      label: "Công nợ",
      children: <CustomerHistory customer={customer} onCancel={handleCancel} />,
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
        title={<span className="text-xl">Cập nhật khách hàng</span>}
        width={screens.lg ? "900px" : "85%"}
        footer={null}
        destroyOnClose
        onCancel={handleCancel}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Modal>
    </>
  );
}

export default UpdateCustomer;
