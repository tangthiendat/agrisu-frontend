import { type Dispatch, type SetStateAction, useEffect } from "react";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Button,
  Grid,
  FormInstance,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { formatCurrency, parseCurrency } from "../../utils/helper.ts";
import { setSelectedCustomer } from "./customerSlice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { useCreateCustomer, useUpdateCustomer } from "./hooks";
import { type ICustomer } from "../../interfaces";

interface UpdateCustomerFormProps {
  form: FormInstance<ICustomer>;
  customerToUpdate?: ICustomer;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

const { useBreakpoint } = Grid;

const UpdateCustomerForm: React.FC<UpdateCustomerFormProps> = ({
  form,
  customerToUpdate,
  setIsOpenModal,
}) => {
  const { createCustomer, isCreating } = useCreateCustomer();
  const { updateCustomer, isUpdating } = useUpdateCustomer();
  const isUpdateSession: boolean = Boolean(customerToUpdate?.customerId);
  const selectedCustomer: ICustomer[] = useAppSelector(
    (state) => state.customer.selectedCustomer,
  );
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();
  const formItemLayout = screens.lg
    ? {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      }
    : null;

  useEffect(() => {
    if (isUpdateSession) {
      form.setFieldsValue(customerToUpdate);
    }
  }, [customerToUpdate, form, isUpdateSession]);

  function handleFinish(submittedCustomer: ICustomer): void {
    if (isUpdateSession) {
      updateCustomer(
        {
          id: customerToUpdate.customerId,
          customer: submittedCustomer,
        },
        {
          onSuccess: () => {
            if (selectedCustomer.length > 0) {
              dispatch(setSelectedCustomer([submittedCustomer]));
            }
            setIsOpenModal(false);
          },
        },
      );
    } else {
      createCustomer(submittedCustomer, {
        onSuccess: () => {
          form.resetFields();
          setIsOpenModal(false);
        },
      });
    }
  }

  function handleCancel(): void {
    form.resetFields();
    setIsOpenModal(false);
  }

  return (
    <Form
      layout={screens.lg ? "horizontal" : "vertical"}
      name="updateCustomerForm"
      form={form}
      {...formItemLayout}
      onFinish={handleFinish}
      initialValues={{ receivable: 0 }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Mã khách hàng" name="customerId">
            <Input
              placeholder="Mã tự động"
              className="w-[50%]"
              disabled={!isUpdateSession}
            />
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
            <Input allowClear className="w-[80%]" />
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
          <Form.Item label="Địa chỉ" name="address">
            <TextArea
              allowClear
              autoSize={{ minRows: 2, maxRows: 4 }}
              className="w-[90%]"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Mã số thuế" name="taxCode">
            <Input allowClear className="w-[60%]" />
          </Form.Item>
          <Form.Item
            label={`Công nợ${isUpdateSession ? "" : " bắt đầu"}`}
            name="receivable"
          >
            <InputNumber
              className="w-[70%]"
              formatter={formatCurrency}
              parser={parseCurrency}
              min={0}
              max={1000000000000}
              addonAfter="VND"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button
            type="primary"
            className="btn-primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {isUpdateSession ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateCustomerForm;
