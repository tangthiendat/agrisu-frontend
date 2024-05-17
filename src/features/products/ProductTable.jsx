/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Select, Space, Table } from "antd";

import { useProducts } from "./hooks/useProducts";
// import { useCountProducts } from "./hooks/useCountProducts";
import UpdateProduct from "./UpdateProduct";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helper";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function ProductTable() {
  const { isLoading, products, productsNum } = useProducts();
  const [productsDataSource, setProductsDataSource] = useState(products);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
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

  useEffect(() => {
    setProductsDataSource(products);
  }, [products, searchParams, setSearchParams]);

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
        const currentStockQuantity = parseFloat(
          (
            (stockQuantity * defaultProductUnit.baseQuantity) /
            record.displayedProductUnit.baseQuantity
          ).toFixed(2),
        );
        return (
          <span
            className={`${currentStockQuantity === 0 ? " text-red-500" : ""}`}
          >
            {currentStockQuantity}
          </span>
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
            {/* <DeleteProduct productId={record.productId} /> */}
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      rowKey={(record) => record.productId}
      dataSource={
        selectedProduct.length > 0 ? selectedProduct : productsDataSource
      }
      columns={columns}
      pagination={{
        current: page || 1,
        pageSize: pageSize || 10,
        total: productsNum,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} sản phẩm`,
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

export default ProductTable;
