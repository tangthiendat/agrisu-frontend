import { useState } from "react";
import { useSelector } from "react-redux";
import { Space, Table } from "antd";
import UpdateCustomer from "./UpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";
import Spinner from "../../ui/Spinner";
import { useCustomers } from "./hooks/useCustomers";
import { useCountCustomers } from "./hooks/useCountCustomers";
import { formatCurrency } from "../../utils/helper";

function CustomerTable() {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const { isLoadingCustomers, customers } = useCustomers(
    pagination.current,
    pagination.pageSize,
  );
  const { customersNum } = useCountCustomers();
  const selectedCustomer = useSelector(
    (state) => state.customer.selectedCustomer,
  );
  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "customerId",
      key: "customerId",
      width: "15%",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "15%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "25%",
    },

    {
      title: "Công nợ",
      dataIndex: "receivable",
      key: "receivable",
      width: "15%",
      render: (receivable) => {
        return formatCurrency(receivable);
      },
    },

    {
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <UpdateCustomer customer={record} />
          <DeleteCustomer customerId={record.customerId} />
        </Space>
      ),
    },
  ];
  return (
    <Table
      rowKey={(record) => record.customerId}
      columns={columns}
      dataSource={selectedCustomer.length > 0 ? selectedCustomer : customers}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: customersNum,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} khách hàng`,
        onChange: (page, pageSize) => {
          setPagination({ current: page, pageSize });
        },
      }}
      loading={{
        indicator: <Spinner />,
        spinning: isLoadingCustomers,
      }}
      size="middle"
    />
  );
}

export default CustomerTable;
