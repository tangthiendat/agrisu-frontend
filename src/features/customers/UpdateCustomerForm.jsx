/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Col, Form, Input, InputNumber, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { useCreateCustomer } from "./hooks/useCreateCustomer";

function UpdateCustomerForm({ form, setIsOpenModal }) {
  const { createCustomer } = useCreateCustomer();
  function preventSubmission(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function handleFinish(submittedCustomer) {
    console.log(submittedCustomer);
    setIsOpenModal(false);
    createCustomer(submittedCustomer, {
      onSettled: () => {
        form.resetFields();
      },
    });
  }

  return (
    <Form
      name="updateCustomerForm"
      onKeyDown={preventSubmission}
      onFinish={handleFinish}
      labelCol={{ span: 7 }}
      initialValues={{ receivable: 0 }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Mã khách hàng" name="customerId">
            <Input placeholder="Mã tự động" className="w-[50%]"></Input>
          </Form.Item>
          <Form.Item
            label="Tên khách hàng"
            name="customerName"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên khách hàng",
              },
            ]}
          >
            <Input className="w-[80%]"></Input>
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại",
              },
              {
                pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: "Hãy nhập số điện thoại hợp lệ",
              },
            ]}
          >
            <Input allowClear className="w-[60%]"></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Địa chỉ" name="address">
            <TextArea
              allowClear
              autoSize={{ minRows: 2, maxRows: 4 }}
              className="w-[90%]"
            ></TextArea>
          </Form.Item>
          <Form.Item label="Công nợ bắt đầu" name="receivable">
            <InputNumber
              className="w-[55%]"
              formatter={formatCurrency}
              parser={parseCurrency}
              min={0}
              max={1000000000000}
              addonAfter="VND"
            ></InputNumber>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default UpdateCustomerForm;
