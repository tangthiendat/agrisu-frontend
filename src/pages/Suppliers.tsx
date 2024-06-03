import Title from "antd/es/typography/Title";
import AddSupplier from "../features/suppliers/AddSupplier.tsx";
import SupplierTable from "../features/suppliers/SupplierTable.tsx";
import { setSelectedSupplier } from "../features/suppliers/supplierSlice.ts";
import SearchSupplierBar from "../features/suppliers/SearchSupplierBar.tsx";
import { useAppDispatch } from "../store/hooks.ts";
import { type ISupplier } from "../interfaces";

function Suppliers() {
  const dispatch = useAppDispatch();

  function handleSelectSupplier(selectedSupplier: ISupplier): void {
    dispatch(setSelectedSupplier([selectedSupplier]));
  }

  function handleClear(): void {
    dispatch(setSelectedSupplier([]));
  }

  return (
    <div className="card min-h-[calc(100vh-64px-1.5rem*2)]">
      <Title className="mb-2">Nhà cung cấp</Title>
      <div className="mb-4 flex content-center items-center justify-between">
        <div className="basis-[30%]">
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
