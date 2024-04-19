/* eslint-disable react/prop-types */
import { Table } from "antd";
import { formatCurrency, formatDateTime } from "../../utils/helper";
import Spinner from "../../ui/Spinner";
import { useCustomerHistory } from "./hooks/useCustomerHistory";

function CustomerHistoryTable({ customerId }) {
  const { customerHistory, isLoading } = useCustomerHistory(customerId);
  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "id",
      key: "id",
      width: "15%",
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => formatDateTime(createdAt),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
      render: (value) => (
        <span className={`${value > 0 ? "text-green-500" : "text-red-500"}`}>
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      title: "Dư nợ khách hàng",
      dataIndex: "nextDebt",
      key: "nextDebt",
      render: (value) => formatCurrency(value),
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
}

export default CustomerHistoryTable;
