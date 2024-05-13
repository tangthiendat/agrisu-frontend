/* eslint-disable no-unused-vars */
import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import SearchWarehouseReceiptDetail from "../features/warehouse-receipts/SearchWarehouseReceiptDetail";
import { clearWarehouseReceiptDetails } from "../features/warehouse-receipts/warehouseReceiptSlice";
import WarehouseReceiptDetailTable from "../features/warehouse-receipts/WarehouseReceiptDetailTable";
import CreateWarehouseReceiptForm from "../features/warehouse-receipts/CreateWarehouseReceiptForm";
import { useCreateWarehouseReceipt } from "../features/warehouse-receipts/hooks/useCreateWarehouseReceipt";
import SearchWarehouseReceiptSupplier from "../features/warehouse-receipts/SearchWarehouseReceiptSupplier";
import CreatePayment from "../features/payments/CreatePayment";

function NewWarehouseReceipt() {
  const dispatch = useDispatch();
  const [createWarehouseReceiptForm] = Form.useForm();
  const { createWarehouseReceipt, isCreating } = useCreateWarehouseReceipt();

  function handleFinish(submittedWarehouseReceipt) {
    createWarehouseReceipt(submittedWarehouseReceipt, {
      onSuccess: () => {
        createWarehouseReceiptForm.resetFields();
        dispatch(clearWarehouseReceiptDetails());
      },
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="card min-h-[calc(100vh-64px-1.5rem*2)] basis-[68%] space-y-8">
        <div className="flex items-center justify-between">
          <SearchWarehouseReceiptDetail />
          <Button
            type="primary"
            danger
            onClick={() => dispatch(clearWarehouseReceiptDetails())}
          >
            Xóa tất cả chi tiết
          </Button>
        </div>
        <WarehouseReceiptDetailTable />
      </div>
      <div className="card flex min-h-[calc(100vh-64px-1.5rem*2)] basis-[30%] flex-col justify-between gap-8">
        <SearchWarehouseReceiptSupplier />
        <div className="flex-1">
          <CreateWarehouseReceiptForm
            form={createWarehouseReceiptForm}
            onFinish={handleFinish}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4">
          <Button
            className="btn-primary h-12 text-base"
            type="primary"
            htmlType="submit"
            form="createWarehouseReceiptForm"
            block
            loading={isCreating}
          >
            LẬP PHIẾU NHẬP KHO
          </Button>
          <Button
            className="btn-primary h-12 text-base"
            type="primary"
            block
            // loading={isCreating}
          >
            LẬP VÀ IN PHIẾU NHẬP KHO
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewWarehouseReceipt;
