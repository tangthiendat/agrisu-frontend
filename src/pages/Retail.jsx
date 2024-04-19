/* eslint-disable no-unused-vars */
import { Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import OrderDetailsTable from "../features/orders/OrderDetailsTable";
import CreateOrderForm from "../features/orders/CreateOrderForm";
import { clearOrderDetails } from "../features/orders/orderSlice";
import SearchOrderDetail from "../features/products/SearchOrderDetail";
import SearchOrderCustomer from "../features/customers/SearchOrderCustomer";
import CreateReceipt from "../features/receipts/CreateReceipt";

function Retail() {
  const dispatch = useDispatch();
  const [createOrderForm] = Form.useForm();
  const customer = useSelector((state) => state.order.customer);
  return (
    <div className="flex items-center justify-between">
      <div className="card min-h-[calc(100vh-64px-1.5rem*2)] basis-[68%] space-y-8">
        <div className="flex items-center justify-between">
          <SearchOrderDetail />
          <Button
            type="primary"
            danger
            onClick={() => dispatch(clearOrderDetails())}
          >
            Xóa tất cả chi tiết
          </Button>
        </div>
        <OrderDetailsTable />
      </div>
      <div className="card flex min-h-[calc(100vh-64px-1.5rem*2)] basis-[30%] flex-col justify-between gap-8">
        <div className="flex items-center justify-between">
          <SearchOrderCustomer />
          <CreateReceipt customer={customer} />
        </div>
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
