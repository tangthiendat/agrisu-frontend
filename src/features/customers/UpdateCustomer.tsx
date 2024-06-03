import { MdOutlineEdit } from "react-icons/md";
import { Tooltip, Form, Modal, Tabs, Grid, TabsProps } from "antd";
import { useState } from "react";
import UpdateCustomerForm from "./UpdateCustomerForm.tsx";
import CustomerHistory from "./CustomerHistory.tsx";
import { type ICustomer } from "../../interfaces";

interface UpdateCustomerProps {
  customer: ICustomer;
}

const { useBreakpoint } = Grid;

const UpdateCustomer: React.FC<UpdateCustomerProps> = ({ customer }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateCustomerForm] = Form.useForm<ICustomer>();
  const screens = useBreakpoint();

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    setIsOpenModal(false);
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thông tin",
      children: (
        <UpdateCustomerForm
          form={updateCustomerForm}
          customerToUpdate={customer}
          onCancel={handleCancel}
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
};

export default UpdateCustomer;
