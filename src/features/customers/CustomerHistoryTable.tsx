import { Table, TableProps } from "antd";
import Spinner from "../../ui/Spinner.tsx";
import { formatCurrency, formatDateTime } from "../../utils/helper.ts";
import { useCustomerHistory } from "./hooks";
import { type ICustomerHistory } from "../../interfaces";

interface CustomerHistoryTableProps {
  customerId: string;
}

const CustomerHistoryTable: React.FC<CustomerHistoryTableProps> = ({
  customerId,
}) => {
  const { customerHistory, isLoading } = useCustomerHistory(customerId);
  const columns: TableProps<ICustomerHistory>["columns"] = [
    {
      title: "Mã phiếu",
      dataIndex: "id",
      key: "id",
      width: "12%",
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      width: "16%",
      key: "createdAt",
      render: (createdAt: Date) => formatDateTime(createdAt),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        switch (type) {
          case "WAREHOUSE_EXPORT":
            return "Mua hàng";
          case "RECEIPT":
            return "Thanh toán nợ";
          default:
            return "";
        }
      },
    },
    {
      title: "Nợ cũ",
      dataIndex: "currentDebt",
      key: "currentDebt",
      render: (currentDebt: number) => formatCurrency(currentDebt),
    },
    {
      title: "Phát sinh",
      dataIndex: "value",
      key: "value",
      render: (value: number) =>
        value > 0 ? (
          <span className="text-green-500">{formatCurrency(value)}</span>
        ) : (
          ""
        ),
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
      render: (payment: number) =>
        payment > 0 ? (
          <span className="text-red-500">{formatCurrency(payment)}</span>
        ) : (
          ""
        ),
    },
    {
      title: "Còn lại",
      dataIndex: "nextDebt",
      key: "nextDebt",
      render: (value: number) => formatCurrency(value),
    },
  ];
  return (
    <Table
      dataSource={customerHistory}
      rowKey={(record) => record.id}
      columns={columns}
      pagination={{ pageSize: 50 }}
      size="small"
      loading={{
        indicator: <Spinner />,
        spinning: isLoading,
      }}
      scroll={{ y: 300 }}
    />
  );
};

export default CustomerHistoryTable;
