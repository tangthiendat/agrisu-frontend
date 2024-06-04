import { useEffect, useState } from "react";
import { Form, InputNumber, Modal, Grid, FormInstance } from "antd";
import { formatCurrency, parseCurrency } from "../../utils/helper.ts";
import { useAppSelector } from "../../store/hooks.ts";
import {
  type INewOrderDetail,
  type ICustomer,
  type INewOrder,
} from "../../interfaces";

const { useBreakpoint } = Grid;

interface CreateOrderFormProps {
  form: FormInstance<INewOrder>;
  onFinish: (submittedOrder: INewOrder) => void;
  onClear: () => void;
}

const CreateOrderForm: React.FC<CreateOrderFormProps> = ({
  form,
  onFinish,
}) => {
  const orderDetails: INewOrderDetail[] = useAppSelector(
    (state) => state.order.orderDetails,
  );
  const orderTotalValue: number = orderDetails.reduce(
    (total, detail) => total + detail.unitPrice * detail.quantity,
    0,
  );
  const customer: ICustomer = useAppSelector((state) => state.order.customer);
  const [change, setChange] = useState<number>(0);
  const screens = useBreakpoint();
  const formItemLayout = screens.xl
    ? {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
    : null;

  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    form.setFieldsValue({
      totalValue: orderTotalValue,
    });
    if (orderTotalValue === 0) {
      setChange(0);
    }
  }, [orderTotalValue, form]);

  function handleCustomerPaymentChange(customerPayment: number): void {
    if (customerPayment >= orderTotalValue) {
      setChange(customerPayment - orderTotalValue);
    } else {
      setChange(0);
    }
  }

  function handleFinish(submittedOrder: INewOrder): void {
    if (orderDetails.length == 0) {
      modal.error({
        title: "Không thể tạo hóa đơn",
        content: "Vui lòng chọn chi tiết hóa đơn.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }
    if (!customer) {
      modal.error({
        title: "Không thể tạo hóa đơn",
        content: "Vui lòng chọn khách hàng.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }
    submittedOrder.customer = customer;
    submittedOrder.orderDetails = orderDetails;
    setChange(0);
    onFinish(submittedOrder);
  }

  return (
    <>
      {contextHolder}
      <Form
        layout={screens.xl ? "horizontal" : "vertical"}
        form={form}
        name="createOrderForm"
        onFinish={handleFinish}
        {...formItemLayout}
        initialValues={{ customerPayment: 0 }}
      >
        <Form.Item
          label="Tổng tiền"
          name="totalValue"
          className="w-full"
          colon={false}
        >
          <InputNumber
            className="w-full"
            readOnly={true}
            formatter={formatCurrency}
            parser={parseCurrency}
            min={0}
            max={1000000000000}
            addonAfter="VND"
          />
        </Form.Item>

        <Form.Item
          label="Thanh toán"
          name="customerPayment"
          rules={[
            {
              validator: (_, value: number) => {
                if (value < orderTotalValue) {
                  return Promise.reject("Số tiền thanh toán không hợp lệ");
                }
                return Promise.resolve();
              },
            },
          ]}
          colon={false}
        >
          <InputNumber
            className="w-full"
            formatter={formatCurrency}
            parser={parseCurrency}
            min={0}
            max={1000000000000}
            addonAfter="VND"
            onChange={handleCustomerPaymentChange}
          />
        </Form.Item>

        <Form.Item label="Còn lại" colon={false}>
          <InputNumber
            className="w-full"
            readOnly={true}
            value={change}
            formatter={formatCurrency}
            parser={parseCurrency}
            min={0}
            max={1000000000000}
            addonAfter="VND"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateOrderForm;
