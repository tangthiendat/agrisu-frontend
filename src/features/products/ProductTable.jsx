/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Select, Space, Table } from "antd";

import { useProducts } from "./hooks/useProducts";
import { useCountProducts } from "./hooks/useCountProducts";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helper";

function ProductTable() {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const { productsNum } = useCountProducts();
  const { isLoading, products } = useProducts(
    pagination.current,
    pagination.pageSize,
  );
  const [productsDataSource, setProductsDataSource] = useState(products);

  useEffect(() => {
    setProductsDataSource(products);
  }, [products]);

  function handleUnitChange(productId, newProductUnitId) {
    setProductsDataSource((products) =>
      products.map((product) =>
        product.productId === productId
          ? {
              ...product,
              displayedProductUnit: product.productUnits.find(
                (productUnit) => productUnit.id === newProductUnitId,
              ),
            }
          : product,
      ),
    );
  }

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productId",
      key: "productId",
      width: "10%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: "20%",
    },
    {
      title: "Đơn vị tính",
      dataIndex: "productUnits",
      key: "productUnits",
      width: "15%",
      render: (productUnits, record) => {
        return (
          <Select
            style={{ width: 85 }}
            defaultValue={
              record.productUnits.find((productUnits) => productUnits.isDefault)
                .id
            }
            options={productUnits.map((productUnit) => ({
              key: productUnit.id,
              value: productUnit.id,
              label: <span>{productUnit.unit.unitName}</span>,
            }))}
            onChange={(newProductUnitId) =>
              handleUnitChange(record.productId, newProductUnitId)
            }
          ></Select>
        );
      },
    },

    {
      title: "Giá bán",
      dataIndex: "displayedProductUnit",
      key: "sellingPrice",
      width: "15%",
      render: (displayedProductUnit) => {
        return formatCurrency(displayedProductUnit.sellingPrice);
      },
    },
    {
      title: "Số lượng tồn",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      width: "15%",
      render: (stockQuantity, record) => {
        const defaultProductUnit = record.productUnits.find(
          (productUnit) => productUnit.isDefault,
        );
        return parseFloat(
          (
            (stockQuantity * defaultProductUnit.baseQuantity) /
            record.displayedProductUnit.baseQuantity
          ).toFixed(2),
        );
      },
    },
    {
      key: "action",
      width: "10%",
      className: "text-center",
      render: (record) => {
        return (
          <Space size="middle">
            <UpdateProduct product={record} />
            <DeleteProduct productId={record.productId} />
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      rowKey={(record) => record.productId}
      dataSource={productsDataSource}
      columns={columns}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: productsNum,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} sản phẩm`,
        onChange: (page, pageSize) => {
          setPagination({ current: page, pageSize });
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

export default ProductTable;
