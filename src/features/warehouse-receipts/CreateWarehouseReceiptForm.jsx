/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, InputNumber, Modal } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getWarehouseReceiptTotalValue } from "./warehouseReceiptSlice";
import { formatCurrency, parseCurrency } from "../../utils/helper";

function CreateWarehouseReceiptForm({ form, onFinish }) {
  const totalWarehouseReceiptValue = useSelector(getWarehouseReceiptTotalValue);
  const warehouseReceiptDetails = useSelector(
    (state) => state.warehouseReceipt.warehouseReceiptDetails,
  );
  const supplier = useSelector((state) => state.warehouseReceipt.supplier);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    form.setFieldsValue({
      totalValue: totalWarehouseReceiptValue,
      supplierCurrentDebt: supplier?.payable || 0,
      supplierNextDebt:
        supplier && warehouseReceiptDetails.length > 0
          ? supplier.payable + totalWarehouseReceiptValue
          : supplier?.payable || 0,
    });
  }, [
    totalWarehouseReceiptValue,
    supplier,
    warehouseReceiptDetails.length,
    form,
  ]);

  function handleFinish(submittedWarehouseReceipt) {
    if (getWarehouseReceiptTotalValue.length == 0) {
      modal.error({
        title: "Không thể tạo phiếu nhập hàng",
        content: "Vui lòng chọn chi tiết phiếu nhập hàng.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }
    if (!supplier) {
      modal.error({
        title: "Không thể tạo phiếu nhập hàng",
        content: "Vui lòng chọn khách hàng.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }
    submittedWarehouseReceipt.supplier = supplier;
    submittedWarehouseReceipt.warehouseReceiptDetails = warehouseReceiptDetails;

    onFinish(submittedWarehouseReceipt);
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="createWarehouseReceiptForm"
        onFinish={handleFinish}
        initialValues={{ customerPayment: 0 }}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12, offset: 5 }}
      >
        <Form.Item
          label="Tổng tiền"
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

        <Form.Item label="Nợ cũ" name="supplierCurrentDebt" colon={false}>
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

        <Form.Item label="Nợ sau" name="supplierNextDebt" colon={false}>
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
      </Form>
    </>
  );
}

export default CreateWarehouseReceiptForm;
