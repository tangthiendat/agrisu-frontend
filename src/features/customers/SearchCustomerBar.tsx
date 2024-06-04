import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { AutoComplete } from "antd";
import { useSearchCustomers } from "./hooks/useSearchCustomers";
import { type ICustomer } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";

interface SearchCustomerBarProps {
  onSelectCustomer: (customer: ICustomer) => void;
  onClear?: () => void;
  showSelectedLabel?: boolean;
}

const SearchCustomerBar: React.FC<SearchCustomerBarProps> = ({
  onSelectCustomer,
  onClear,
  showSelectedLabel = true,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { searchedCustomers } = useSearchCustomers(searchQuery);
  const orderCustomer: ICustomer = useAppSelector(
    (state) => state.order.customer,
  );

  useEffect(() => {
    if (inputValue === "") {
      onClear?.();
    }
  }, [inputValue, onClear]);

  // clear the input value when the selected customer is cleared
  useEffect(() => {
    if (!orderCustomer) {
      setInputValue("");
    }
  }, [orderCustomer, showSelectedLabel]);

  function handleSearch(value: string) {
    setSearchQuery(value);
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const customerOptions = searchedCustomers?.map((customer) => ({
    value: customer.customerId,
    label: customer.customerName,
  }));

  function handleSelect(value: string) {
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
};

export default SearchCustomerBar;
