import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Space, Table, type TableProps } from "antd";
import { toast } from "react-toastify";
import UpdateCustomer from "./UpdateCustomer.tsx";
import DeleteCustomer from "./DeleteCustomer.tsx";
import Spinner from "../../ui/Spinner.tsx";
import { useCustomers } from "./hooks";
import { formatCurrency } from "../../utils/helper.ts";
import { useAppSelector } from "../../store/hooks.ts";
import { type ICustomer } from "../../interfaces";

const CustomerTable: React.FC = () => {
  const { isLoading, customers, numCustomers, error } = useCustomers();
  const selectedCustomer = useAppSelector(
    (state) => state.customer.selectedCustomer,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const page: number = Number(searchParams.get("page"));
  const pageSize: number = Number(searchParams.get("pageSize"));

  //Set default page and pageSize in the URL
  useEffect(() => {
    if (!page) {
      searchParams.set("page", "1");
    }
    if (!pageSize) {
      searchParams.set("pageSize", "10");
    }
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, page, pageSize]);

  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu khách hàng. ");
    }
  }, [error]);

  const columns: TableProps<ICustomer>["columns"] = [
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
      render: (receivable: number) => {
        return formatCurrency(receivable);
      },
    },

    {
      key: "action",
      render: (record: ICustomer) => (
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
        total: numCustomers,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} khách hàng`,
        onChange: (page: number, pageSize: number) => {
          searchParams.set("page", `${page}`);
          searchParams.set("pageSize", `${pageSize}`);
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
};

export default CustomerTable;
