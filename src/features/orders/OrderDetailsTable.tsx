import { InputNumber, Select, Table, type TableProps, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import {
  removeItem,
  updateItemQuantity,
  updateItemUnit,
} from "./orderSlice.ts";
import { formatCurrency } from "../../utils/helper.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  type IUnit,
  type IProduct,
  type INewOrderDetail,
} from "../../interfaces";

const OrderDetailsTable: React.FC = () => {
  const orderDetails: INewOrderDetail[] = useAppSelector(
    (state) => state.order.orderDetails,
  );
  const dispatch = useAppDispatch();

  function handleQuantityChange(product: IProduct, quantity: number): void {
    const defaultProductUnit = product.productUnits.find(
      (productUnit) => productUnit.isDefault,
    );
    const currentStockQuantity: number =
      (product.stockQuantity * defaultProductUnit.baseQuantity) /
      product.displayedProductUnit.baseQuantity;
    //check if the quantity is greater than the current stock quantity
    if (quantity > currentStockQuantity) {
      return;
    }
    dispatch(updateItemQuantity({ productId: product.productId, quantity }));
  }

  const columns: TableProps<INewOrderDetail>["columns"] = [
    {
      title: "STT",
      dataIndex: "product",
      width: "5%",
      key: "index",
      render: (_, __, index: number) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      key: "productName",
      render: (product: IProduct) => product.productName,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      width: "15%",
      key: "unit",
      render: (unit: IUnit, record: INewOrderDetail) => {
        return (
          <Select
            style={{ width: "90%" }}
            value={unit.unitId}
            options={record.product.productUnits?.map((productUnit) => ({
              key: productUnit.unit.unitId,
              value: productUnit.unit.unitId,
              label: <span>{productUnit.unit.unitName}</span>,
            }))}
            onChange={(newUnitId: number) => {
              const selectedProductUnit = record.product.productUnits.find(
                (productUnit) => productUnit.unit.unitId === newUnitId,
              );

              dispatch(
                updateItemUnit({
                  productId: record.product.productId,
                  unit: selectedProductUnit.unit,
                }),
              );
            }}
          />
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "15%",
      key: "quantity",
      render: (quantity: number, record: INewOrderDetail) => {
        return (
          <InputNumber
            style={{ width: "90%" }}
            min={1}
            max={100000}
            value={quantity}
            onChange={(value) => handleQuantityChange(record.product, value)}
          />
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: "15%",
      render: (unitPrice: number) => formatCurrency(unitPrice),
    },
    {
      title: "Thành tiền",
      key: "amount",
      width: "15%",
      render: (record: INewOrderDetail) => (
        <span className="font-semibold">
          {formatCurrency(record.unitPrice * record.quantity)}
        </span>
      ),
    },
    {
      key: "action",
      render: (record: INewOrderDetail) => (
        <Tooltip title="Xóa" placement="top">
          <MdDelete
            className="icon"
            color="var(--color-red-500)"
            onClick={() => dispatch(removeItem(record.product.productId))}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record: INewOrderDetail) => record.product.productId}
      dataSource={orderDetails}
      columns={columns}
      pagination={false}
      size="middle"
    />
  );
};

export default OrderDetailsTable;
