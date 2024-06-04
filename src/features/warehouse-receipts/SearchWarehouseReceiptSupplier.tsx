import { useState } from "react";
import { Button, Form, Modal, Space, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SearchSupplierBar from "../suppliers/SearchSupplierBar.tsx";
import UpdateSupplierForm from "../suppliers/UpdateSupplierForm.tsx";
import { setSupplier } from "./warehouseReceiptSlice.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import { type ISupplier } from "../../interfaces";

const SearchWarehouseReceiptSupplier: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addSupplierForm] = Form.useForm<ISupplier>();
  const dispatch = useAppDispatch();

  function showModal(): void {
    setIsOpenModal(true);
  }

  function handleCancel(): void {
    setIsOpenModal(false);
    addSupplierForm.resetFields();
  }

  function handleSelectSupplier(selectedSupplier: ISupplier): void {
    dispatch(setSupplier(selectedSupplier));
  }

  function handleClear(): void {
    dispatch(setSupplier(null));
  }

  return (
    <Space.Compact className="w-full">
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
        <UpdateSupplierForm form={addSupplierForm} onCancel={handleCancel} />
      </Modal>
    </Space.Compact>
  );
};

export default SearchWarehouseReceiptSupplier;
