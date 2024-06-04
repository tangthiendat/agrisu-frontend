import { Button, Form, Modal, Space, Tooltip } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UpdateCustomerForm from "../customers/UpdateCustomerForm.tsx";
import SearchCustomerBar from "../customers/SearchCustomerBar.tsx";
import { setCustomer } from "./orderSlice";
import { useAppDispatch } from "../../store/hooks.ts";
import { type ICustomer } from "../../interfaces";

const SearchOrderCustomer: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addCustomerForm] = Form.useForm<ICustomer>();
  const dispatch = useAppDispatch();

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    setIsOpenModal(false);
    addCustomerForm.resetFields();
  }

  function handleSelectCustomer(selectedCustomer: ICustomer): void {
    dispatch(setCustomer(selectedCustomer));
  }

  function handleClear(): void {
    dispatch(setCustomer(null));
  }

  return (
    <Space.Compact className="w-full">
      <SearchCustomerBar
        onSelectCustomer={handleSelectCustomer}
        onClear={handleClear}
      />
      <Tooltip title="Thêm khách hàng" placement="bottom">
        <Button
          style={{ borderRadius: "0 0.375rem 0.375rem 0" }}
          icon={<PlusOutlined onClick={showModal} />}
        />
      </Tooltip>
      <Modal
        open={isOpenModal}
        title={<span className="text-xl">Thêm khách hàng</span>}
        width={1000}
        destroyOnClose
        footer={null}
        onCancel={handleCancel}
      >
        <UpdateCustomerForm form={addCustomerForm} onCancel={handleCancel} />
      </Modal>
    </Space.Compact>
  );
};

export default SearchOrderCustomer;
