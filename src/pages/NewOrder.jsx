/* eslint-disable no-unused-vars */
import { Button, Form, Grid } from "antd";
import { useDispatch, useSelector } from "react-redux";
import OrderDetailsTable from "../features/orders/OrderDetailsTable";
import CreateOrderForm from "../features/orders/CreateOrderForm";
import { clearOrder, clearOrderDetails } from "../features/orders/orderSlice";
import SearchOrderDetail from "../features/orders/SearchOrderDetail";
import SearchOrderCustomer from "../features/orders/SearchOrderCustomer";
import CreateReceipt from "../features/receipts/CreateReceipt";
import { useCreateOrder } from "../features/orders/hooks/useCreateOrder";

const { useBreakpoint } = Grid;
function NewOrder() {
  const dispatch = useDispatch();
  const [createOrderForm] = Form.useForm();
  const customer = useSelector((state) => state.order.customer);
  const { createOrder, isCreating } = useCreateOrder();
  const screens = useBreakpoint();

  function handleFinish(submittedOrder) {
    createOrder(submittedOrder, {
      onSuccess: () => {
        createOrderForm.resetFields();
        dispatch(clearOrder());
      },
    });
  }

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
          {screens.xl && <CreateReceipt customer={customer} />}
        </div>
        <div className="flex-1">
          <CreateOrderForm form={createOrderForm} onFinish={handleFinish} />
        </div>

        <div className="flex flex-col items-center justify-between gap-4">
          <Button
            className="btn-primary h-12 text-base"
            type="primary"
            htmlType="submit"
            form="createOrderForm"
            block
            loading={isCreating}
          >
            LẬP HÓA ĐƠN
          </Button>
          <Button
            className="btn-primary h-12 text-base"
            type="primary"
            block
            loading={isCreating}
          >
            LẬP VÀ IN HÓA ĐƠN
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
