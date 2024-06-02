import { Button, Space } from "antd";
import CreateReceipt from "../receipts/CreateReceipt";
import CustomerHistoryTable from "./CustomerHistoryTable.tsx";
import { type ICustomer } from "../../interfaces";

interface CustomerHistoryProps {
  customer: ICustomer;
  onCancel: () => void;
}

const CustomerHistory: React.FC<CustomerHistoryProps> = ({
  customer,
  onCancel,
}) => {
  return (
    <>
      <CustomerHistoryTable customerId={customer.customerId} />
      <div className="mt-4 text-right">
        <Space>
          <Button onClick={onCancel}>Đóng</Button>
          <CreateReceipt customer={customer} />
        </Space>
      </div>
    </>
  );
};

export default CustomerHistory;
