import { useEffect, useState } from "react";
import { Select, Space, Table, type TableProps } from "antd";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import UpdateProduct from "./UpdateProduct.tsx";
import Spinner from "../../ui/Spinner.tsx";
import { useProducts } from "./hooks";
import { formatCurrency } from "../../utils/helper.ts";
import { useAppSelector } from "../../store/hooks.ts";
import { type IProduct, type IProductUnit } from "../../interfaces";

const ProductTable: React.FC = () => {
  const { isLoading, products, numProducts, error } = useProducts();
  const [productsDataSource, setProductsDataSource] =
    useState<IProduct[]>(products);
  const selectedProduct: IProduct[] = useAppSelector(
    (state) => state.product.selectedProduct,
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
    setProductsDataSource(products);
  }, [products]);

  useEffect(() => {
    if (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu sản phẩm. ");
    }
  }, [error]);

  function handleUnitChange(productId: string, newProductUnitId: number): void {
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

  const columns: TableProps<IProduct>["columns"] = [
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
      render: (productUnits: IProductUnit[], record: IProduct) => {
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
            onChange={(newProductUnitId: number) =>
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
      render: (displayedProductUnit: IProductUnit) => {
        return formatCurrency(displayedProductUnit.sellingPrice);
      },
    },
    {
      title: "Số lượng tồn",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      width: "15%",
      render: (stockQuantity: number, record: IProduct) => {
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
      render: (record: IProduct) => {
        return (
          <Space size="middle">
            <UpdateProduct product={record} />
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      rowKey={(record: IProduct) => record.productId}
      dataSource={
        selectedProduct.length > 0 ? selectedProduct : productsDataSource
      }
      columns={columns}
      pagination={{
        current: page || 1,
        pageSize: pageSize || 10,
        total: numProducts,
        showSizeChanger: true,
        showTotal: (total: number) => `Tổng ${total} sản phẩm`,
        onChange: (page: number, pageSize: number) => {
          searchParams.set("page", String(page));
          searchParams.set("pageSize", String(pageSize));
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

export default ProductTable;
