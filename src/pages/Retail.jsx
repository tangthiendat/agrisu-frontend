/* eslint-disable no-unused-vars */
import { Button, Form } from "antd";
import SearchProductBar from "../features/products/SearchProductBar";
import OrderDetailsTable from "../features/orders/OrderDetailsTable";
import SearchCustomerBar from "../features/customers/SearchCustomerBar";
import { useOrderStore } from "../stores/useOrderStore";
import CreateOrderForm from "../features/orders/CreateOrderForm";

function Retail() {
  const clearCart = useOrderStore((state) => state.clearCart);

  const [createOrderForm] = Form.useForm();
  return (
    <div className="flex items-center justify-between">
      <div className="card min-h-[calc(100vh-64px-1.5rem*2)] basis-[68%] space-y-8">
        <div className="flex items-center justify-between">
          <SearchProductBar />
          <Button type="primary" danger onClick={clearCart}>
            Xóa tất cả chi tiết
          </Button>
        </div>
        <OrderDetailsTable />
      </div>
      <div className="card flex min-h-[calc(100vh-64px-1.5rem*2)] basis-[30%] flex-col justify-between gap-8">
        <SearchCustomerBar />
        <div className="flex-1">
          <CreateOrderForm form={createOrderForm} />
        </div>

        <Button
          className="btn-primary h-12 text-base"
          type="primary"
          htmlType="submit"
          form="createOrderForm"
          block
        >
          THANH TOÁN
        </Button>
      </div>
    </div>
  );
}

export default Retail;
