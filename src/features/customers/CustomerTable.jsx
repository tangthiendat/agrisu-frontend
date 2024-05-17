import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Space, Table } from "antd";
import UpdateCustomer from "./UpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";
import Spinner from "../../ui/Spinner";
import { useCustomers } from "./hooks/useCustomers";
import { formatCurrency } from "../../utils/helper";

function CustomerTable() {
  const { isLoading, customers, customersNum } = useCustomers();
  const selectedCustomer = useSelector(
    (state) => state.customer.selectedCustomer,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const pageSize = Number(searchParams.get("pageSize"));

  //Set default page and pageSize in the URL
  useEffect(() => {
    if (!page) {
      searchParams.set("page", 1);
    }
    if (!pageSize) {
      searchParams.set("pageSize", 10);
    }
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, page, pageSize]);

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
        current: page || 1,
        pageSize: pageSize || 10,
        total: customersNum,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} khách hàng`,
        onChange: (page, pageSize) => {
          searchParams.set("page", page);
          searchParams.set("pageSize", pageSize);
          setSearchParams(searchParams);
        },
      }}
      loading={{
        indicator: <Spinner />,
        spinning: isLoading,
      }}
      size="middle"
    />
  );
}

export default CustomerTable;
