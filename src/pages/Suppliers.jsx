import { useDispatch } from "react-redux";
import Title from "antd/es/typography/Title";
import AddSupplier from "../features/suppliers/AddSupplier";
import SupplierTable from "../features/suppliers/SupplierTable";
import { setSelectedSupplier } from "../features/suppliers/supplierSlice";
import SearchSupplierBar from "../features/suppliers/SearchSupplierBar";

function Suppliers() {
  const dispatch = useDispatch();

  function handleSelectSupplier(selectedSupplier) {
    dispatch(setSelectedSupplier([selectedSupplier]));
  }

  function handleClear() {
    dispatch(setSelectedSupplier([]));
  }

  return (
    <div className="card min-h-[calc(100vh-64px-1.5rem*2)]">
      <Title className="mb-2">Nhà cung cấp</Title>
      <div className="mb-4 flex content-center items-center justify-between">
        <div className="basis-[20%]">
          <SearchSupplierBar
            onSelectSupplier={handleSelectSupplier}
            onClear={handleClear}
          />
        </div>
        <AddSupplier />
      </div>
      <div>
        <SupplierTable />
      </div>
    </div>
  );
}

export default Suppliers;
