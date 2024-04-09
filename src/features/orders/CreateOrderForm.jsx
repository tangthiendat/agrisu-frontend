/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Form, InputNumber, Radio, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { clearOrder, getOrderTotalValue } from "./orderSlice";
import { useCreateOrder } from "./hooks/useCreateOrder";

function CreateOrderForm({ form }) {
  const totalOrderValue = useSelector(getOrderTotalValue);
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const customer = useSelector((state) => state.order.customer);
  const [isPaid, setIsPaid] = useState(true);
  const [change, setChange] = useState(0);
  const dispatch = useDispatch();
  const { createOrder } = useCreateOrder();

  useEffect(() => {
    form.setFieldsValue({
      totalValue: totalOrderValue,
    });
  }, [totalOrderValue, form]);

  function handleSaleFormChange(e) {
    if (e.target.value === "retail") {
      setIsPaid(true);
    } else {
      setIsPaid(false);
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
      Modal.error({
        title: "Không thể tạo hóa đơn",
        content: "Vui lòng chọn chi tiết hóa đơn.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }
    if (!customer) {
      Modal.error({
        title: "Không thể tạo hóa đơn",
        content: "Vui lòng chọn khách hàng.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }
    if (isPaid && submittedOrder.customerPayment < totalOrderValue) {
      Modal.error({
        title: "Không thể tạo hóa đơn",
        content: "Số tiền khách hàng trả không hợp lệ.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }

    submittedOrder.customer = customer;
    submittedOrder.orderDetails = orderDetails;
    submittedOrder.isPaid = isPaid;
    createOrder(submittedOrder, {
      onSuccess: () => {
        form.resetFields();
        dispatch(clearOrder());
        setChange(0);
      },
    });
  }

  return (
    <Form
      form={form}
      name="createOrderForm"
      onFinish={handleFinish}
      initialValues={{ customerPayment: 0 }}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 11, offset: 6 }}
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

      <Form.Item hidden={isPaid} label="Nợ cũ" colon={false}>
        <InputNumber
          className="w-full"
          readOnly={true}
          value={customer?.receivable || 0}
          formatter={formatCurrency}
          parser={parseCurrency}
          min={0}
          max={1000000000000}
          addonAfter="VND"
        />
      </Form.Item>

      <Form.Item hidden={isPaid} label="Nợ sau" colon={false}>
        <InputNumber
          className="w-full"
          readOnly={true}
          value={
            customer && orderDetails.length > 0
              ? customer.receivable + totalOrderValue
              : 0
          }
          formatter={formatCurrency}
          parser={parseCurrency}
          min={0}
          max={1000000000000}
          addonAfter="VND"
        />
      </Form.Item>
    </Form>
  );
}

export default CreateOrderForm;
