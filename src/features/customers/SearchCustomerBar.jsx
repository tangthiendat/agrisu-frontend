/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { AutoComplete } from "antd";
import { useSearchCustomers } from "./hooks/useSearchCustomers";

function SearchCustomerBar({
  onSelectCustomer,
  onClear,
  showSelectedLabel = true,
}) {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { searchedCustomers } = useSearchCustomers(searchQuery);

  useEffect(() => {
    if (inputValue === "") {
      onClear?.();
    }
  }, [inputValue, onClear]);

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
    onSelectCustomer(selectedCustomer);
    if (showSelectedLabel) {
      setInputValue(selectedCustomer.customerName);
    } else {
      setInputValue("");
    }
    setSearchQuery("");
  }

  return (
    <AutoComplete
      value={inputValue}
      className="w-full"
      placeholder="Tìm khách hàng..."
      allowClear
      onChange={setInputValue}
      onSearch={debouncedHandleSearch}
      options={customerOptions}
      onSelect={handleSelect}
    />
  );
}

export default SearchCustomerBar;
