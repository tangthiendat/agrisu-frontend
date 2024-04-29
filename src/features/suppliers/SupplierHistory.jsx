/* eslint-disable no-unused-vars */

import { Button, Space } from "antd";
import CreatePayment from "../payments/CreatePayment";

/* eslint-disable react/prop-types */
function SupplierHistory({ supplier, onCancel }) {
  return (
    <>
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
