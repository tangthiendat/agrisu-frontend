import { useEffect } from "react";
import { Space, Table, type TableProps } from "antd";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner.tsx";
import DeleteSupplier from "./DeleteSupplier.tsx";
import UpdateSupplier from "./UpdateSupplier.tsx";
import { formatCurrency } from "../../utils/helper.ts";
import { useSuppliers } from "./hooks/useSuppliers.ts";
import { type ISupplier } from "../../interfaces";
import { useAppSelector } from "../../store/hooks.ts";

const SupplierTable: React.FC = () => {
  const { isLoading, suppliers, numSuppliers, error } = useSuppliers();
  const selectedSupplier = useAppSelector(
    (state) => state.supplier.selectedSupplier,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const pageSize = Number(searchParams.get("pageSize"));

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
      toast.error("Có lỗi xảy ra khi tải dữ liệu nhà cung cấp");
    }
  }, [error]);

  const columns: TableProps<ISupplier>["columns"] = [
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
      render: (payable: number) => {
        return formatCurrency(payable);
      },
    },

    {
      key: "action",
      render: (record: ISupplier) => (
        <Space size="middle">
          <UpdateSupplier supplier={record} />
          <DeleteSupplier supplierId={record.supplierId} />
        </Space>
      ),
    },
  ];
  return (
    <Table
      rowKey={(record: ISupplier) => record.supplierId}
      columns={columns}
      dataSource={selectedSupplier.length > 0 ? selectedSupplier : suppliers}
      pagination={{
        current: page || 1,
        pageSize: pageSize || 10,
        total: numSuppliers,
        showSizeChanger: true,
        showTotal: (total: number) => `Tổng ${total} khách hàng`,
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
      locale={{
        emptyText: <p className="py-8">Không có dữ liệu nhà cung cấp</p>,
      }}
      size="middle"
    />
  );
};

export default SupplierTable;
