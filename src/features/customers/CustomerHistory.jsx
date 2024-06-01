import { Button, Space } from "antd";
import CreateReceipt from "../receipts/CreateReceipt";
import CustomerHistoryTable from "./CustomerHistoryTable";

function CustomerHistory({ customer, onCancel }) {
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
}

export default CustomerHistory;
