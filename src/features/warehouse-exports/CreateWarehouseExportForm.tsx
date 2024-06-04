import { useEffect } from "react";
import { Form, InputNumber, Modal, Grid, FormInstance } from "antd";
import { formatCurrency, parseCurrency } from "../../utils/helper.ts";
import { useAppSelector } from "../../store/hooks.ts";
import {
  type ICustomer,
  type INewWarehouseExport,
  type INewWarehouseExportDetail,
} from "../../interfaces";

interface CreateWarehouseExportFormProps {
  form: FormInstance<INewWarehouseExport>;
  onFinish: (submittedWarehouseExport: INewWarehouseExport) => void;
}

const { useBreakpoint } = Grid;

const CreateWarehouseExportForm: React.FC<CreateWarehouseExportFormProps> = ({
  form,
  onFinish,
}) => {
  const warehouseExportDetails: INewWarehouseExportDetail[] = useAppSelector(
    (state) => state.warehouseExport.warehouseExportDetails,
  );
  const warehouseExportTotalValue: number = warehouseExportDetails.reduce(
    (total, detail) => total + detail.unitPrice * detail.quantity,
    0,
  );
  const customer: ICustomer = useAppSelector(
    (state) => state.warehouseExport.customer,
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
      totalValue: warehouseExportTotalValue,
      customerCurrentDebt: customer?.receivable || 0,
      customerNextDebt:
        customer && warehouseExportDetails.length > 0
          ? customer.receivable + warehouseExportTotalValue
          : customer?.receivable || 0,
    });
  }, [
    warehouseExportTotalValue,
    customer,
    warehouseExportDetails.length,
    form,
  ]);

  function handleFinish(submittedWarehouseExport: INewWarehouseExport): void {
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
        layout={screens.xl ? "horizontal" : "vertical"}
        form={form}
        name="createWarehouseExportForm"
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
};

export default CreateWarehouseExportForm;
