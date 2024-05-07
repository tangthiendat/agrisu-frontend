/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Input, InputNumber, Row, Space, Grid } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCreateSupplier } from "./hooks/useCreateSupplier";
import { useUpdateSupplier } from "./hooks/useUpdateSupplier";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { setSelectedSupplier } from "./supplierSlice";

const { useBreakpoint } = Grid;
function UpdateSupplierForm({
  form,
  supplierToUpdate = {},
  setIsOpenModal,
  onCancel,
}) {
  const { createSupplier, isCreating } = useCreateSupplier();
  const { updateSupplier, isUpdating } = useUpdateSupplier();
  const isUpdateSession = Boolean(supplierToUpdate.supplierId);
  const selectedSupplier = useSelector(
    (state) => state.supplier.selectedSupplier,
  );
  const dispatch = useDispatch();
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

  function preventSubmission(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

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
            setIsOpenModal(false);
          },
        },
      );
    } else {
      createSupplier(submittedSupplier, {
        onSuccess: () => {
          form.resetFields();
          setIsOpenModal(false);
        },
      });
    }
  }

  return (
    <Form
      layout={screens.lg ? "horizontal" : "vertical"}
      name="updateSupplierForm"
      form={form}
      onKeyDown={preventSubmission}
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
}

export default UpdateSupplierForm;
