import { useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Grid,
  FormInstance,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { formatCurrency, parseCurrency } from "../../utils/helper.ts";
import { setSelectedSupplier } from "./supplierSlice.ts";
import { type ISupplier } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { useCreateSupplier, useUpdateSupplier } from "./hooks";

interface UpdateSupplierFormProps {
  form: FormInstance<ISupplier>;
  supplierToUpdate?: ISupplier;
  onCancel: () => void;
}

const { useBreakpoint } = Grid;

const UpdateSupplierForm: React.FC<UpdateSupplierFormProps> = ({
  form,
  supplierToUpdate,
  onCancel,
}) => {
  const { createSupplier, isCreating } = useCreateSupplier();
  const { updateSupplier, isUpdating } = useUpdateSupplier();
  const isUpdateSession = Boolean(supplierToUpdate?.supplierId);
  const selectedSupplier = useAppSelector(
    (state) => state.supplier.selectedSupplier,
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
      form.setFieldsValue(supplierToUpdate);
    }
  }, [supplierToUpdate, isUpdateSession, form]);

  function handleFinish(submittedSupplier) {
    if (isUpdateSession) {
      updateSupplier(
        {
          id: supplierToUpdate.supplierId,
          supplier: submittedSupplier,
        },
        {
          onSuccess: () => {
            if (selectedSupplier.length > 0) {
              dispatch(setSelectedSupplier([submittedSupplier]));
            }
            onCancel();
          },
        },
      );
    } else {
      createSupplier(submittedSupplier, {
        onSuccess: () => {
          onCancel();
        },
      });
    }
  }

  return (
    <Form
      layout={screens.lg ? "horizontal" : "vertical"}
      name="updateSupplierForm"
      form={form}
      onFinish={handleFinish}
      {...formItemLayout}
      initialValues={{ payable: 0 }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Mã nhà cung cấp" name="supplierId">
            <Input
              placeholder="Mã tự động"
              className="w-[50%]"
              disabled={!isUpdateSession}
            />
          </Form.Item>
          <Form.Item
            label="Tên nhà cung cấp"
            name="supplierName"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên nhà cung cấp",
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
            name="payable"
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
          <Button onClick={onCancel}>Hủy</Button>
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

export default UpdateSupplierForm;
