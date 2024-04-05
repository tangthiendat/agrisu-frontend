import { InputNumber, Select, Table, Tooltip } from "antd";
import { useOrderStore } from "../../stores/useOrderStore";
import { formatCurrency } from "../../utils/helper";
import { MdDelete } from "react-icons/md";
function OrderDetailsTable() {
  const cart = useOrderStore((state) => state.cart);
  const updateItemUnit = useOrderStore((state) => state.updateItemUnit);
  const updateItemQuantity = useOrderStore((state) => state.updateItemQuantity);
  const removeItem = useOrderStore((state) => state.removeItem);

  function handleQuantityChange(product, quantity) {
    const defaultProuductUnit = product.productUnits.find(
      (productUnit) => productUnit.isDefault,
    );
    const currentStockQuantity = parseFloat(
      (product.stockQuantity * defaultProuductUnit.baseQuantity) /
        product.displayedProductUnit.baseQuantity,
    );
    //check if the quantity is greater than the current stock quantity
    if (quantity > currentStockQuantity) {
      return;
    }
    updateItemQuantity(product.productId, quantity);
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "product",
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
              updateItemUnit(
                record.product.productId,
                selectedProductUnit.unit,
              );
            }}
          />
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
            onChange={(value) => handleQuantityChange(record.product, value)}
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
            onClick={() => removeItem(record.product.productId)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record) => record.product.productId}
      dataSource={cart}
      columns={columns}
      pagination={false}
      size="middle"
    />
  );
}

export default OrderDetailsTable;
