/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { AutoComplete, Button, Form, Modal, Space, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSearchCustomers } from "./hooks/useSearchCustomers";
import UpdateCustomerForm from "./UpdateCustomerForm";
import { setCustomer } from "../orders/orderSlice";

function SearchCustomerBar() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addCustomerForm] = Form.useForm();
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { searchedCustomers } = useSearchCustomers(searchQuery);
  const dispatch = useDispatch();

  function handleSearch(value) {
    setSearchQuery(value);
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const customerOptions = searchedCustomers?.map((customer) => ({
    value: customer.customerId,
    label: customer.customerName,
  }));

  function handleSelect(value) {
    const selectedCustomer = searchedCustomers.find(
      (customer) => customer.customerId === value,
    );
    dispatch(setCustomer(selectedCustomer));
    setInputValue(selectedCustomer.customerName);
    setSearchQuery("");
  }

  function showModal() {
    setIsOpenModal(true);
  }

  function handleCancel() {
    addCustomerForm.resetFields();
    setIsOpenModal(false);
  }

  return (
    <Space.Compact className="w-[70%]">
      <AutoComplete
        value={inputValue}
        className="w-[80%]"
        placeholder="Tìm khách hàng..."
        allowClear
        onChange={setInputValue}
        onSearch={debouncedHandleSearch}
        options={customerOptions}
        onSelect={handleSelect}
        onClear={() => dispatch(setCustomer(null))}
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
        okText="Thêm"
        destroyOnClose
        okButtonProps={{
          form: "updateCustomerForm",
          htmlType: "submit",
          className: "btn-primary",
        }}
        cancelText="Hủy"
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

export default SearchCustomerBar;
