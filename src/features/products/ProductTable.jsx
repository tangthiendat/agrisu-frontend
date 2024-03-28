/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { Select, Space, Table, Tooltip } from "antd";

import Spinner from "../../ui/Spinner";
import { useProducts } from "./useProducts";
import UpdateProduct from "./UpdateProduct";

function ProductTable() {
  const { isLoading, products } = useProducts();
  const [productsDataSource, setProductsDataSource] = useState(products);

  useEffect(() => {
    setProductsDataSource(products);
  }, [products]);

  if (isLoading) {
    return <Spinner />;
  }

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
      width: "15%",
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
      with: "15%",
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
      title: "Loại sản phẩm",
      dataIndex: "productType",
      key: "productType",
      width: "20%",
      render: (productType) => {
        return productType.productTypeName;
      },
    },
    {
      title: "Số lượng tồn",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      width: "10%",
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
      width: "20%",
      className: "text-center",
      render: (record) => {
        return (
          <Space size="middle">
            <UpdateProduct product={record} />
            <Tooltip title="Xóa" placement="bottom">
              <MdDelete className="icon" color="var(--color-red-500)" />
            </Tooltip>
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
      size="middle"
    />
  );
}

export default ProductTable;
