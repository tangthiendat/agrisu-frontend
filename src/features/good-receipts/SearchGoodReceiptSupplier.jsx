import { useState } from "react";
import { Button, Form, Modal, Space, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { setSupplier } from "./goodReceiptSlice";
import SearchSupplierBar from "../suppliers/SearchSupplierBar";
import UpdateSupplierForm from "../suppliers/UpdateSupplierForm";

function SearchGoodReceiptSupplier() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addSupplierForm] = Form.useForm();
  const dispatch = useDispatch();

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    addSupplierForm.resetFields();
    setIsOpenModal(false);
  }

  function handleSelectSupplier(selectedSupplier) {
    dispatch(setSupplier(selectedSupplier));
  }

  function handleClear() {
    dispatch(setSupplier(null));
  }

  return (
    <Space.Compact className="w-[65%]">
      <SearchSupplierBar
        onSelectSupplier={handleSelectSupplier}
        onClear={handleClear}
      />
      <Tooltip title="Thêm nhà cung cấp" placement="bottom">
        <Button
          style={{ borderRadius: "0 0.375rem 0.375rem 0" }}
          icon={<PlusOutlined onClick={showModal} />}
        />
      </Tooltip>
      <Modal
        open={isOpenModal}
        title={<span className="text-xl">Thêm nhà cung cấp</span>}
        width={1000}
        destroyOnClose
        footer={null}
        onCancel={handleCancel}
      >
        <UpdateSupplierForm form={addSupplierForm} />
      </Modal>
    </Space.Compact>
  );
}

export default SearchGoodReceiptSupplier;
