import { useEffect } from "react";
import { Space, Table } from "antd";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useSuppliers } from "./hooks/useSuppliers";
import { formatCurrency } from "../../utils/helper";
import Spinner from "../../ui/Spinner";
import UpdateSupplier from "./UpdateSupplier";
import DeleteSupplier from "./DeleteSupplier";

function SupplierTable() {
  const { isLoading, suppliers, suppliersNum } = useSuppliers();
  const selectedSupplier = useSelector(
    (state) => state.supplier.selectedSupplier,
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
      title: "Mã nhà cung cấp",
      dataIndex: "supplierId",
      key: "supplierId",
      width: "15%",
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "supplierName",
      key: "supplierName",
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
      dataIndex: "payable",
      key: "payable",
      width: "15%",
      render: (payable) => {
        return formatCurrency(payable);
      },
    },

    {
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <UpdateSupplier supplier={record} />
          <DeleteSupplier supplierId={record.supplierId} />
        </Space>
      ),
    },
  ];
  return (
    <Table
      rowKey={(record) => record.supplierId}
      columns={columns}
      dataSource={selectedSupplier.length > 0 ? selectedSupplier : suppliers}
      pagination={{
        current: page || 1,
        pageSize: pageSize || 10,
        total: suppliersNum,
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

export default SupplierTable;
