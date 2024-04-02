import { InputNumber, Select, Table } from "antd";
import { useCartStore } from "../../store/useCartStore";
import { formatCurrency } from "../../utils/helper";
function OrderDetailsTable() {
  const cart = useCartStore((state) => state.cart);
  const updateItemUnit = useCartStore((state) => state.updateItemUnit);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      key: "productName",
      render: (product) => product.productName,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
      render: (unit, record) => {
        return (
          <Select
            style={{ width: 85 }}
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
              console.log("selectedProductUnit", selectedProductUnit);
              updateItemUnit(
                record.product.productId,
                selectedProductUnit.unit,
              );
            }}
          ></Select>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => {
        return (
          <InputNumber
            min={1}
            max={100000}
            value={quantity}
            onChange={(newQuantity) => {
              console.log("newQuantity", newQuantity);

              updateItemQuantity(record.product.productId, newQuantity);
            }}
          />
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (unitPrice) => formatCurrency(unitPrice),
    },
    {
      title: "Thành tiền",
      key: "amount",
      render: (record) => formatCurrency(record.quantity * record.unitPrice),
    },
  ];

  console.log("cart", cart);

  return (
    <Table
      rowKey={(record) => record.product.productId}
      pagination={false}
      columns={columns}
      dataSource={cart}
      size="middle"
    />
  );
}

export default OrderDetailsTable;
