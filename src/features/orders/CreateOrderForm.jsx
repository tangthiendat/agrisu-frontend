/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Form, InputNumber, Radio, Modal } from "antd";
import { useSelector } from "react-redux";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { getOrderTotalValue } from "./orderSlice";

function CreateOrderForm({ form, onFinish }) {
  const totalOrderValue = useSelector(getOrderTotalValue);
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const customer = useSelector((state) => state.order.customer);
  const [isPaid, setIsPaid] = useState(true);
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

  function handleSaleFormChange(e) {
    if (e.target.value === "retail") {
      setIsPaid(true);
    } else {
      setIsPaid(false);
      setChange(0);
      form.setFieldsValue({ customerPayment: 0 });
    }
  }

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
    submittedOrder.isPaid = isPaid;
    if (isPaid) {
      submittedOrder.customerNextDebt = customer.receivable;
    }
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
          label="Hình thức"
          valuePropName="checked"
          colon={false}
          wrapperCol={{ span: 9, offset: 8 }}
        >
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            defaultValue="retail"
            options={[
              { value: "retail", label: "Bán lẻ" },
              { value: "debt", label: "Bán nợ" },
            ]}
            onChange={handleSaleFormChange}
          />
        </Form.Item>

        <Form.Item
          hidden={!isPaid}
          label="Thanh toán"
          name="customerPayment"
          rules={[
            {
              validator: (_, value) => {
                if (isPaid && value < totalOrderValue) {
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
            readOnly={!isPaid}
            formatter={formatCurrency}
            parser={parseCurrency}
            min={0}
            max={1000000000000}
            addonAfter="VND"
            onChange={handleCustomerPaymentChange}
          />
        </Form.Item>

        <Form.Item hidden={!isPaid} label="Còn lại" colon={false}>
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

        <Form.Item
          hidden={isPaid}
          label="Nợ cũ"
          name="customerCurrentDebt"
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
          hidden={isPaid}
          label="Nợ sau"
          name="customerNextDebt"
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
      </Form>
    </>
  );
}

export default CreateOrderForm;
