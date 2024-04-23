/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, InputNumber, Modal } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getGoodReceiptTotalValue } from "./goodReceiptSlice";
import { formatCurrency, parseCurrency } from "../../utils/helper";

function CreateGoodReceiptForm({ form, onFinish }) {
  const totalGoodReceiptValue = useSelector(getGoodReceiptTotalValue);
  const goodReceiptDetails = useSelector(
    (state) => state.goodReceipt.goodReceiptDetails,
  );
  const supplier = useSelector((state) => state.goodReceipt.supplier);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    form.setFieldsValue({
      totalValue: totalGoodReceiptValue,
      supplierCurrentDebt: supplier?.payable || 0,
      supplierNextDebt:
        supplier && goodReceiptDetails.length > 0
          ? supplier.payable + totalGoodReceiptValue
          : supplier?.payable || 0,
    });
  }, [totalGoodReceiptValue, supplier, goodReceiptDetails.length, form]);

  function handleFinish(submittedGoodReceipt) {
    if (getGoodReceiptTotalValue.length == 0) {
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
    submittedGoodReceipt.supplier = supplier;
    submittedGoodReceipt.goodReceiptDetails = goodReceiptDetails;

    onFinish(submittedGoodReceipt);
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="createGoodReceiptForm"
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

export default CreateGoodReceiptForm;
