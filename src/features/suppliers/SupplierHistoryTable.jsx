import { Table } from "antd";
import Spinner from "../../ui/Spinner";
import { formatCurrency, formatDateTime } from "../../utils/helper";
import { useSupplierHistory } from "./hooks/useSupplierHistory";

function SupplierHistoryTable({ supplierId }) {
  const { supplierHistory, isLoading } = useSupplierHistory(supplierId);
  const columns = [
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
      render: (createdAt) => formatDateTime(createdAt),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        switch (type) {
          case "WAREHOUSE_RECEIPT":
            return "Nhập hàng";
          case "PAYMENT":
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
      render: (currentDebt) => formatCurrency(currentDebt),
    },
    {
      title: "Phát sinh",
      dataIndex: "value",
      key: "value",
      render: (value) =>
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
      render: (payment) =>
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
      render: (value) => formatCurrency(value),
    },
  ];
  return (
    <Table
      dataSource={supplierHistory}
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

export default SupplierHistoryTable;
