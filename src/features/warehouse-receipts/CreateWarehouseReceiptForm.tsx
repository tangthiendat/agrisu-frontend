import { useEffect } from "react";
import { Form, InputNumber, Modal, Grid, FormInstance } from "antd";
import { formatCurrency, parseCurrency } from "../../utils/helper.ts";
import { useAppSelector } from "../../store/hooks.ts";
import {
  type INewWarehouseReceipt,
  type ISupplier,
  type INewWarehouseReceiptDetail,
} from "../../interfaces";

interface CreateWarehouseReceiptFormProps {
  form: FormInstance<INewWarehouseReceipt>;
  onFinish: (submittedWarehouseReceipt: INewWarehouseReceipt) => void;
}

const { useBreakpoint } = Grid;

const CreateWarehouseReceiptForm: React.FC<CreateWarehouseReceiptFormProps> = ({
  form,
  onFinish,
}) => {
  const warehouseReceiptDetails: INewWarehouseReceiptDetail[] = useAppSelector(
    (state) => state.warehouseReceipt.warehouseReceiptDetails,
  );
  const warehouseReceiptTotalValue = warehouseReceiptDetails.reduce(
    (total, detail) => total + detail.quantity * detail.unitPrice,
    0,
  );
  const supplier: ISupplier = useAppSelector(
    (state) => state.warehouseReceipt.supplier,
  );
  const [modal, contextHolder] = Modal.useModal();
  const screens = useBreakpoint();
  const formItemLayout = screens.xl
    ? {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
    : null;

  useEffect(() => {
    form.setFieldsValue({
      totalValue: warehouseReceiptTotalValue,
      supplierCurrentDebt: supplier?.payable || 0,
      supplierNextDebt:
        supplier && warehouseReceiptDetails.length > 0
          ? supplier.payable + warehouseReceiptTotalValue
          : supplier?.payable || 0,
    });
  }, [
    warehouseReceiptTotalValue,
    supplier,
    warehouseReceiptDetails.length,
    form,
  ]);

  function handleFinish(submittedWarehouseReceipt: INewWarehouseReceipt): void {
    if (warehouseReceiptDetails.length == 0) {
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
        layout={screens.xl ? "horizontal" : "vertical"}
        form={form}
        name="createWarehouseReceiptForm"
        onFinish={handleFinish}
        {...formItemLayout}
        initialValues={{ customerPayment: 0 }}
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
};

export default CreateWarehouseReceiptForm;
