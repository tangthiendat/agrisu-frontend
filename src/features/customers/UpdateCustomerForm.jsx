/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Col, Form, Input, InputNumber, Row, Space, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { useCreateCustomer } from "./hooks/useCreateCustomer";
import { useUpdateCustomer } from "./hooks/useUpdateCustomer";

function UpdateCustomerForm({ form, setIsOpenModal, customerToUpdate = {} }) {
  const { createCustomer } = useCreateCustomer();
  const { updateCustomer } = useUpdateCustomer();
  const isUpdateSession = Boolean(customerToUpdate.customerId);

  if (isUpdateSession) {
    form.setFieldsValue({
      customerId: customerToUpdate.customerId,
      customerName: customerToUpdate.customerName,
      phoneNumber: customerToUpdate.phoneNumber,
      address: customerToUpdate.address,
      receivable: customerToUpdate.receivable,
    });
  }

  function preventSubmission(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function handleFinish(submittedCustomer) {
    setIsOpenModal(false);
    form.resetFields();

    if (isUpdateSession) {
      console.log("submittedCustomer", submittedCustomer);
      updateCustomer({
        id: customerToUpdate.customerId,
        customer: submittedCustomer,
      });
    } else {
      createCustomer(submittedCustomer);
    }
  }

  function handleCancel() {
    form.resetFields();
    setIsOpenModal(false);
  }

  return (
    <Form
      name="updateCustomerForm"
      form={form}
      onKeyDown={preventSubmission}
      onFinish={handleFinish}
      labelCol={{ span: 7 }}
      initialValues={{ receivable: 0 }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Mã khách hàng" name="customerId">
            <Input placeholder="Mã tự động" className="w-[50%]" />
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
            <Input className="w-[80%]" />
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
            <Input allowClear className="w-[60%]" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Địa chỉ" name="address">
            <TextArea
              allowClear
              autoSize={{ minRows: 2, maxRows: 4 }}
              className="w-[90%]"
            />
          </Form.Item>
          <Form.Item
            label={`Công nợ${isUpdateSession ? "" : " bắt đầu"}`}
            name="receivable"
          >
            <InputNumber
              className="w-[55%]"
              formatter={formatCurrency}
              parser={parseCurrency}
              min={0}
              max={1000000000000}
              addonAfter="VND"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="text-right">
        <Space>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary" className="btn-primary" htmlType="submit">
            Thêm
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default UpdateCustomerForm;
