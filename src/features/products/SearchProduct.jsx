import { useState } from "react";
import { Button, Form, Modal, Space, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SearchProductBar from "./SearchProductBar";
import UpdateProductForm from "./UpdateProductForm";

function SearchProduct() {
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
    <Space.Compact className="w-[40%]">
      <SearchProductBar />
      <Tooltip title="Thêm sản phẩm" placement="bottom">
        <Button
          style={{ borderRadius: "0 0.375rem 0.375rem 0" }}
          icon={<PlusOutlined onClick={showModal} />}
        />
      </Tooltip>
      <Modal
        open={isOpenModal}
        title={<span className="text-xl">Thêm sản phẩm</span>}
        width={1000}
        okText="Thêm"
        destroyOnClose
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
        />
      </Modal>
    </Space.Compact>
  );
}

export default SearchProduct;
