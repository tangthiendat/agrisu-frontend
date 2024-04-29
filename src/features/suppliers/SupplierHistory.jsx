/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Space } from "antd";
import CreatePayment from "../payments/CreatePayment";
import SupplierHistoryTable from "./SupplierHistoryTable";

function SupplierHistory({ supplier, onCancel }) {
  return (
    <>
      <SupplierHistoryTable supplierId={supplier.supplierId} />
      <div className="mt-4 text-right">
        <Space>
          <Button onClick={onCancel}>Đóng</Button>
          <CreatePayment supplier={supplier} />
        </Space>
      </div>
    </>
  );
}

export default SupplierHistory;
