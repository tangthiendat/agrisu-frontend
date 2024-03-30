import { Typography } from "antd";
import AddCustomer from "../features/customers/AddCustomer";

const { Title } = Typography;
function Customers() {
  return (
    <div className="container">
      <Title className="mb-2">Khách hàng</Title>
      <div className="mb-4 flex content-center items-center justify-end">
        <AddCustomer />
      </div>
      <div>{/* <ProductTable /> */}</div>
    </div>
  );
}

export default Customers;
