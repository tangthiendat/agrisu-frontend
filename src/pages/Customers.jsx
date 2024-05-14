import { Typography } from "antd";
import AddCustomer from "../features/customers/AddCustomer";
import CustomerTable from "../features/customers/CustomerTable";
import SearchCustomerBar from "../features/customers/SearchCustomerBar";
import { useDispatch } from "react-redux";
import { setSelectedCustomer } from "../features/customers/customerSlice";

const { Title } = Typography;
function Customers() {
  const dispatch = useDispatch();

  function handleSelectCustomer(selectedCustomer) {
    dispatch(setSelectedCustomer([selectedCustomer]));
  }

  function handleClear() {
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
}

export default Customers;
