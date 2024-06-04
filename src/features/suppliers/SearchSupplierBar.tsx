import { useCallback, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { debounce } from "lodash";
import { useSearchSuppliers } from "./hooks";
import { type ISupplier } from "../../interfaces";
import { useAppSelector } from "../../store/hooks.ts";

interface SearchSupplierBarProps {
  onSelectSupplier: (supplier: ISupplier) => void;
  onClear?: () => void;
  showSelectedLabel?: boolean;
}

const SearchSupplierBar: React.FC<SearchSupplierBarProps> = ({
  onSelectSupplier,
  onClear,
  showSelectedLabel = true,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { searchedSuppliers } = useSearchSuppliers(searchQuery);
  const warehouseReceiptSupplier: ISupplier = useAppSelector(
    (state) => state.warehouseReceipt.supplier,
  );

  useEffect(() => {
    if (inputValue === "") {
      onClear?.();
    }
  }, [inputValue, onClear]);

  // Clear the input value when the selected supplier is cleared
  useEffect(() => {
    if (!warehouseReceiptSupplier) {
      setInputValue("");
    }
  }, [warehouseReceiptSupplier]);

  function handleSearch(value: string) {
    setSearchQuery(value);
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const supplierOptions = searchedSuppliers?.map((supplier) => ({
    value: supplier.supplierId,
    label: supplier.supplierName,
  }));

  function handleSelect(value: string) {
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
};

export default SearchSupplierBar;
