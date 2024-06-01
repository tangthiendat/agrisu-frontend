import { Button, Form, Input, InputNumber, Space } from "antd";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { useCreatePayment } from "./hooks/useCreatePayment";

function CreatePaymentForm({ form, supplier, setIsOpenModal }) {
  const { createPayment, isCreating } = useCreatePayment();

  function handlePaidAmountChange(paidAmount) {
    const supplierNextDebt = supplier.payable - paidAmount;
    form.setFieldsValue({ supplierNextDebt });
  }

  function handleCancel() {
    form.resetFields();
    setIsOpenModal(false);
  }

  function handleFinish(submittedPayment) {
    submittedPayment.supplier = supplier;
    console.log(submittedPayment);
    createPayment(submittedPayment, {
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
        supplierNextDebt: 0,
        supplierCurrentDebt: supplier.payable,
      }}
      onFinish={handleFinish}
    >
      <Form.Item label="Mã phiếu chi" name="paymentId">
        <Input disabled className="w-[60%]" placeholder="Mã tự động" />
      </Form.Item>
      <Form.Item label="Tên nhà cung cấp">
        <Input readOnly value={supplier.supplierName} className="w-[80%]" />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input readOnly value={supplier.phoneNumber} className="w-[40%]" />
      </Form.Item>
      <Form.Item label="Nợ cũ" name="supplierCurrentDebt">
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
              if (value > supplier.payable) {
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
      <Form.Item label="Nợ sau" name="supplierNextDebt">
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
            Tạo phiếu chi
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default CreatePaymentForm;
