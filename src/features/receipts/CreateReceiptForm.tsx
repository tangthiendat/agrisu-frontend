import {
  Button,
  Form,
  type FormInstance,
  Input,
  InputNumber,
  Space,
} from "antd";
import { formatCurrency, parseCurrency } from "../../utils/helper.ts";
import { useCreateReceipt } from "./hooks";
import { type ICustomer, type IReceipt } from "../../interfaces";

interface CreateReceiptFormProps {
  form: FormInstance<IReceipt>;
  customer: ICustomer;
  onCancel: () => void;
}

const CreateReceiptForm: React.FC<CreateReceiptFormProps> = ({
  form,
  customer,
  onCancel,
}) => {
  const { createReceipt, isCreating } = useCreateReceipt();

  function handlePaidAmountChange(paidAmount: number): void {
    const customerNextDebt = customer.receivable - paidAmount;
    form.setFieldsValue({ customerNextDebt });
  }

  function handleFinish(submittedReceipt: Omit<IReceipt, "createdAt">): void {
    submittedReceipt.customer = customer;
    createReceipt(submittedReceipt, {
      onSuccess: () => {
        onCancel();
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
            validator: (_, value: number) => {
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
          <Button onClick={onCancel}>Hủy</Button>
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
};

export default CreateReceiptForm;
