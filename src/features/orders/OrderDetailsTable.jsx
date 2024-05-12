import { InputNumber, Select, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { removeItem, updateItemQuantity, updateItemUnit } from "./orderSlice";
import { formatCurrency } from "../../utils/helper";
function OrderDetailsTable() {
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const dispatch = useDispatch();

  function handleQuantityChange(product, quantity) {
    const defaultProductUnit = product.productUnits.find(
      (productUnit) => productUnit.isDefault,
    );
    const currentStockQuantity = parseFloat(
      (product.stockQuantity * defaultProductUnit.baseQuantity) /
        product.displayedProductUnit.baseQuantity,
    );
    //check if the quantity is greater than the current stock quantity
    if (quantity > currentStockQuantity) {
      return;
    }
    dispatch(updateItemQuantity({ productId: product.productId, quantity }));
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "product",
      width: "5%",
      key: "index",
      render: (product, _, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      key: "productName",
      render: (product) => product.productName,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      width: "15%",
      key: "unit",
      render: (unit, record) => {
        return (
          <Select
            style={{ width: "90%" }}
            value={unit.unitId}
            options={record.product.productUnits?.map((productUnit) => ({
              key: productUnit.unit.unitId,
              value: productUnit.unit.unitId,
              label: <span>{productUnit.unit.unitName}</span>,
            }))}
            onChange={(newUnitId) => {
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
      render: (quantity, record) => {
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
      render: (unitPrice) => formatCurrency(unitPrice),
    },
    {
      title: "Thành tiền",
      key: "amount",
      width: "15%",
      render: (record) => (
        <span className="font-semibold">
          {formatCurrency(record.unitPrice * record.quantity)}
        </span>
      ),
    },
    {
      key: "action",
      render: (record) => (
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
      rowKey={(record) => record.product.productId}
      dataSource={orderDetails}
      columns={columns}
      pagination={false}
      size="middle"
    />
  );
}

export default OrderDetailsTable;
