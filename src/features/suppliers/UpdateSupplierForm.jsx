/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Button, Col, Form, Input, InputNumber, Row, Space } from "antd";
import { useCreateSupplier } from "./hooks/useCreateSupplier";
import TextArea from "antd/es/input/TextArea";
import { formatCurrency, parseCurrency } from "../../utils/helper";
import { useUpdateSupplier } from "./hooks/useUpdateSupplier";

/* eslint-disable react/prop-types */
function UpdateSupplierForm({
  form,
  supplierToUpdate = {},
  setIsOpenModal,
  onCancel,
}) {
  const { createSupplier, isCreating } = useCreateSupplier();
  const { updateSupplier, isUpdating } = useUpdateSupplier();
  const isUpdateSession = Boolean(supplierToUpdate.supplierId);

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
      name="updateCustomerForm"
      form={form}
      onKeyDown={preventSubmission}
      onFinish={handleFinish}
      labelCol={{ span: 7 }}
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
      <Form.Item className="text-right">
        <Space>
          <Button onClick={onCancel}>Hủy</Button>
          <Button
            type="primary"
            className="btn-primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            Thêm
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default UpdateSupplierForm;
