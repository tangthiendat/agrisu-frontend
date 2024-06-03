import { useState } from "react";
import { Form, Modal, Tabs, Tooltip, Grid, type TabsProps } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import UpdateSupplierForm from "./UpdateSupplierForm.tsx";
import SupplierHistory from "./SupplierHistory.tsx";
import { type ISupplier } from "../../interfaces";

const { useBreakpoint } = Grid;

interface UpdateSupplierProps {
  supplier: ISupplier;
}

const UpdateSupplier: React.FC<UpdateSupplierProps> = ({ supplier }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [updateSupplierForm] = Form.useForm<ISupplier>();
  const screens = useBreakpoint();

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    updateSupplierForm.resetFields();
    setIsOpenModal(false);
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thông tin",
      children: (
        <UpdateSupplierForm
          supplierToUpdate={supplier}
          setIsOpenModal={setIsOpenModal}
          form={updateSupplierForm}
          onCancel={handleCancel}
        />
      ),
    },
    {
      key: "2",
      label: "Công nợ",
      children: <SupplierHistory supplier={supplier} onCancel={handleCancel} />,
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

export default UpdateSupplier;
