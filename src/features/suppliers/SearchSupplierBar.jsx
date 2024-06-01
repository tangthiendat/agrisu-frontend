import { useCallback, useEffect, useState } from "react";
import { useSearchSuppliers } from "./hooks/useSearchSuppliers";
import { AutoComplete } from "antd";
import { debounce } from "lodash";
function SearchSupplierBar({
  onSelectSupplier,
  onClear,
  showSelectedLabel = true,
}) {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { searchedSuppliers } = useSearchSuppliers(searchQuery);

  useEffect(() => {
    if (inputValue === "") {
      onClear?.();
    }
  }, [inputValue, onClear]);

  function handleSearch(value) {
    setSearchQuery(value);
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const supplierOptions = searchedSuppliers?.map((supplier) => ({
    value: supplier.supplierId,
    label: supplier.supplierName,
  }));

  function handleSelect(value) {
    const selectedSupplier = searchedSuppliers.find(
      (supplier) => supplier.supplierId === value,
    );
    onSelectSupplier(selectedSupplier);
    if (showSelectedLabel) {
      setInputValue(selectedSupplier.supplierName);
    } else {
      setInputValue("");
    }
    setSearchQuery("");
  }

  return (
    <AutoComplete
      value={inputValue}
      className="w-full"
      placeholder="Tìm nhà cung cấp..."
      allowClear
      onChange={setInputValue}
      onSearch={debouncedHandleSearch}
      options={supplierOptions}
      onSelect={handleSelect}
    />
  );
}

export default SearchSupplierBar;
