/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Form, InputNumber, Modal } from "antd";
import { useSelector } from "react-redux";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { getOrderTotalValue } from "./orderSlice";

function CreateOrderForm({ form, onFinish }) {
  const totalOrderValue = useSelector(getOrderTotalValue);
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const customer = useSelector((state) => state.order.customer);
  const [change, setChange] = useState(0);

  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    form.setFieldsValue({
      totalValue: totalOrderValue,
      customerCurrentDebt: customer?.receivable || 0,
      customerNextDebt:
        customer && orderDetails.length > 0
          ? customer.receivable + totalOrderValue
          : customer?.receivable || 0,
    });
  }, [totalOrderValue, form, customer, orderDetails.length]);

  function handleCustomerPaymentChange(customerPayment) {
    if (customerPayment >= totalOrderValue) {
      setChange(customerPayment - totalOrderValue);
    } else {
      setChange(0);
    }
  }

  function handleFinish(submittedOrder) {
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
        form={form}
        name="createOrderForm"
        onFinish={handleFinish}
        initialValues={{ customerPayment: 0 }}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12, offset: 5 }}
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
              validator: (_, value) => {
                if (value < totalOrderValue) {
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
}

export default CreateOrderForm;
