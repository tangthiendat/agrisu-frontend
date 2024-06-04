import { Typography } from "antd";
import AddCustomer from "../features/customers/AddCustomer.tsx";
import CustomerTable from "../features/customers/CustomerTable.tsx";
import SearchCustomerBar from "../features/customers/SearchCustomerBar.tsx";
import { setSelectedCustomer } from "../features/customers/customerSlice.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { type ICustomer } from "../interfaces";

const { Title } = Typography;

const Customers: React.FC = () => {
  const dispatch = useAppDispatch();

  function handleSelectCustomer(selectedCustomer: ICustomer): void {
    dispatch(setSelectedCustomer([selectedCustomer]));
  }

  function handleClear(): void {
    dispatch(setSelectedCustomer([]));
  }

  return (
    <div className="card min-h-[calc(100vh-64px-1.5rem*2)]">
      <Title className="mb-2">Khách hàng</Title>
      <div className="mb-4 flex content-center items-center justify-between">
        <div className="basis-[30%]">
          <SearchCustomerBar
            onSelectCustomer={handleSelectCustomer}
            onClear={handleClear}
          />
        </div>
        <AddCustomer />
      </div>
      <div>
        <CustomerTable />
      </div>
    </div>
  );
};

export default Customers;
