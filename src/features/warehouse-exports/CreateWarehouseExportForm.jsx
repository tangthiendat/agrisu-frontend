/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, InputNumber, Modal } from "antd";
import { getWarehouseExportTotalValue } from "./warehouseExportSlice";
import { formatCurrency, parseCurrency } from "../../utils/helper";

function CreateWarehouseExportForm({ form, onFinish }) {
  const totalWarehouseExportValue = useSelector(getWarehouseExportTotalValue);
  const warehouseExportDetails = useSelector(
    (state) => state.warehouseExport.warehouseExportDetails,
  );
  const customer = useSelector((state) => state.warehouseExport.customer);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    form.setFieldsValue({
      totalValue: totalWarehouseExportValue,
      customerCurrentDebt: customer?.receivable || 0,
      customerNextDebt:
        customer && warehouseExportDetails.length > 0
          ? customer.receivable + totalWarehouseExportValue
          : customer?.receivable || 0,
    });
  }, [
    totalWarehouseExportValue,
    customer,
    warehouseExportDetails.length,
    form,
  ]);

  function handleFinish(submittedWarehouseExport) {
    if (warehouseExportDetails.length == 0) {
      modal.error({
        title: "Không thể tạo phiếu xuất kho",
        content: "Vui lòng chọn chi tiết phiếu xuất kho.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }
    if (!customer) {
      modal.error({
        title: "Không thể tạo phiếu xuất kho",
        content: "Vui lòng chọn khách hàng.",
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }
    submittedWarehouseExport.customer = customer;
    submittedWarehouseExport.warehouseExportDetails = warehouseExportDetails;

    onFinish(submittedWarehouseExport);
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="createWarehouseExportForm"
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

        <Form.Item label="Nợ cũ" name="customerCurrentDebt" colon={false}>
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

        <Form.Item label="Nợ sau" name="customerNextDebt" colon={false}>
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

export default CreateWarehouseExportForm;
