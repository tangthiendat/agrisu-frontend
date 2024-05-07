import { Button, Form, Modal, Space, Tooltip } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UpdateCustomerForm from "../customers/UpdateCustomerForm";
import SearchCustomerBar from "../customers/SearchCustomerBar";
import { useDispatch } from "react-redux";
import { setCustomer } from "./orderSlice";

function SearchOrderCustomer() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addCustomerForm] = Form.useForm();
  const dispatch = useDispatch();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    addCustomerForm.resetFields();
    setIsOpenModal(false);
  }

  function handleSelectCustomer(selectedCustomer) {
    dispatch(setCustomer(selectedCustomer));
  }

  function handleClear() {
    dispatch(setCustomer(null));
  }

  return (
    <Space.Compact className="w-full xl:w-[60%]">
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
        <UpdateCustomerForm
          form={addCustomerForm}
          setIsOpenModal={setIsOpenModal}
        />
      </Modal>
    </Space.Compact>
  );
}

export default SearchOrderCustomer;
