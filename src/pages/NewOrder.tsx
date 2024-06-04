import { Button, Form } from "antd";
import OrderDetailsTable from "../features/orders/OrderDetailsTable.tsx";
import CreateOrderForm from "../features/orders/CreateOrderForm.tsx";
import SearchOrderDetail from "../features/orders/SearchOrderDetail.tsx";
import SearchOrderCustomer from "../features/orders/SearchOrderCustomer.tsx";
import { clearOrder } from "../features/orders/orderSlice.ts";
import { useCreateOrder } from "../features/orders/hooks";
import { useAppDispatch } from "../store/hooks.ts";
import { type INewOrder } from "../interfaces";

const NewOrder: React.FC = () => {
  const dispatch = useAppDispatch();
  const [createOrderForm] = Form.useForm<INewOrder>();
  const { createOrder, isCreating } = useCreateOrder();

  function handleFinish(submittedOrder: INewOrder): void {
    createOrder(submittedOrder, {
      onSuccess: () => {
        handleResetOrder();
      },
    });
  }

  function handleResetOrder(): void {
    createOrderForm.resetFields();
    dispatch(clearOrder());
  }

  return (
    <div className="flex items-center justify-between">
      <div className="card min-h-[calc(100vh-64px-1.5rem*2)] basis-[68%] space-y-8">
        <div className="flex items-center justify-between">
          <SearchOrderDetail />
          <Button type="primary" danger onClick={handleResetOrder}>
            Xóa tất cả chi tiết
          </Button>
        </div>
        <OrderDetailsTable />
      </div>
      <div className="card flex min-h-[calc(100vh-64px-1.5rem*2)] basis-[30%] flex-col justify-between gap-8">
        <SearchOrderCustomer />
        <div className="flex-1">
          <CreateOrderForm
            form={createOrderForm}
            onFinish={handleFinish}
            onClear={handleResetOrder}
          />
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
            // loading={isCreating}
          >
            LẬP VÀ IN HÓA ĐƠN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
