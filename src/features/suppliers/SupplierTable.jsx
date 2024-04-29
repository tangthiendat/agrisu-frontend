import { useState } from "react";
import { Space, Table } from "antd";
import { useSuppliers } from "./hooks/useSuppliers";
import { useCountSuppliers } from "./hooks/useCountSuppliers";
import { formatCurrency } from "../../utils/helper";
import Spinner from "../../ui/Spinner";
import UpdateSupplier from "./UpdateSupplier";
import DeleteSupplier from "./DeleteSupplier";

function SupplierTable() {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const { isLoadingSuppliers, suppliers } = useSuppliers(
    pagination.current,
    pagination.pageSize,
  );
  const { suppliersNum } = useCountSuppliers();

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
      dataSource={suppliers}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: suppliersNum,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} khách hàng`,
        onChange: (page, pageSize) => {
          setPagination({ current: page, pageSize });
        },
      }}
      loading={{
        indicator: <Spinner />,
        spinning: isLoadingSuppliers,
      }}
      size="middle"
    />
  );
}

export default SupplierTable;
