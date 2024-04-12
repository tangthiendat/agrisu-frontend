import { Typography } from "antd";
import AddCustomer from "../features/customers/AddCustomer";
import CustomerTable from "../features/customers/CustomerTable";

const { Title } = Typography;
function Customers() {
  return (
    <div className="card min-h-[calc(100vh-64px-1.5rem*2)]">
      <Title className="mb-2">Khách hàng</Title>
      <div className="mb-4 flex content-center items-center justify-end">
        <AddCustomer />
      </div>
      <div>
        <CustomerTable />
      </div>
    </div>
  );
}

export default Customers;
