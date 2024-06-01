import { Button, Form, Input, InputNumber, Space } from "antd";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { useCreateReceipt } from "./hooks/useCreateReceipt";

function CreateReceiptForm({ form, customer, setIsOpenModal }) {
  const { createReceipt, isCreating } = useCreateReceipt();

  function handlePaidAmountChange(paidAmount) {
    const customerNextDebt = customer.receivable - paidAmount;
    form.setFieldsValue({ customerNextDebt });
  }

  function handleCancel() {
    form.resetFields();
    setIsOpenModal(false);
  }

  function handleFinish(submittedReceipt) {
    submittedReceipt.customer = customer;
    createReceipt(submittedReceipt, {
      onSuccess: () => {
        form.resetFields();
        setIsOpenModal(false);
      },
    });
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      initialValues={{
        customerNextDebt: 0,
        customerCurrentDebt: customer.receivable,
      }}
      onFinish={handleFinish}
    >
      <Form.Item label="Mã phiếu thu" name="receiptId">
        <Input disabled className="w-[60%]" placeholder="Mã tự động" />
      </Form.Item>
      <Form.Item label="Tên khách hàng">
        <Input readOnly value={customer.customerName} className="w-[80%]" />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input readOnly value={customer.phoneNumber} className="w-[40%]" />
      </Form.Item>
      <Form.Item label="Nợ cũ" name="customerCurrentDebt">
        <InputNumber
          className="w-[55%]"
          readOnly
          formatter={formatCurrency}
          parser={parseCurrency}
          addonAfter="VND"
        />
      </Form.Item>
      <Form.Item
        label="Thanh toán"
        name="paidAmount"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số tiền thanh toán",
          },
          {
            validator: (_, value) => {
              if (value > customer.receivable) {
                return Promise.reject("Số tiền thanh toán không hợp lệ");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber
          className="w-[55%]"
          formatter={formatCurrency}
          parser={parseCurrency}
          addonAfter="VND"
          onChange={handlePaidAmountChange}
        />
      </Form.Item>
      <Form.Item label="Nợ sau" name="customerNextDebt">
        <InputNumber
          className="w-[55%]"
          readOnly
          formatter={formatCurrency}
          parser={parseCurrency}
          addonAfter="VND"
        />
      </Form.Item>
      <Form.Item className="text-right">
        <Space>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button
            type="primary"
            className="btn-primary"
            htmlType="submit"
            loading={isCreating}
          >
            Tạo phiếu thu
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default CreateReceiptForm;
