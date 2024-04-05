/* eslint-disable react/prop-types */
import { Form, InputNumber, Radio } from "antd";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { useOrderStore } from "../../stores/useOrderStore";
import { useEffect, useState } from "react";

function CreateOrderForm({ form }) {
  const totalCartPrice = useOrderStore((state) => state.totalCartPrice());
  const cart = useOrderStore((state) => state.cart);
  const customer = useOrderStore((state) => state.customer);
  const [isPaid, setIsPaid] = useState(true);
  const [change, setChange] = useState(0);

  useEffect(() => {
    form.setFieldsValue({
      totalValue: totalCartPrice,
    });
  }, [totalCartPrice, form]);

  function handleSaleFormChange(e) {
    if (e.target.value === "retail") {
      setIsPaid(true);
    } else {
      setIsPaid(false);
      form.setFieldsValue({ customerPayment: 0 });
    }
  }

  function handleCustomerPaymentChange(customerPayment) {
    if (customerPayment >= totalCartPrice) {
      setChange(customerPayment - totalCartPrice);
    } else {
      setChange(0);
    }
  }

  function handleFinish(submittedOrder) {
    submittedOrder.customer = customer;
    submittedOrder.orderDetails = cart;
    submittedOrder.isPaid = isPaid;
    console.log(submittedOrder);
  }

  return (
    <Form
      form={form}
      name="createOrderForm"
      onFinish={handleFinish}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 11, offset: 6 }}
    >
      <Form.Item
        label="Tổng tiền hàng"
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
      <Form.Item label="Khách thanh toán" name="customerPayment" colon={false}>
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
      <Form.Item hidden={!isPaid} label="Tiền thừa" colon={false}>
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
      <Form.Item hidden={isPaid} label="Tính vào công nợ" colon={false}>
        <InputNumber
          className="w-full"
          readOnly={true}
          value={totalCartPrice}
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
