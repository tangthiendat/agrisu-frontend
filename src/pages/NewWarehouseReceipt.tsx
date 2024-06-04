/* eslint-disable no-unused-vars */
import { Button, Form } from "antd";
import SearchWarehouseReceiptSupplier from "../features/warehouse-receipts/SearchWarehouseReceiptSupplier.tsx";
import SearchWarehouseReceiptDetail from "../features/warehouse-receipts/SearchWarehouseReceiptDetail.tsx";
import WarehouseReceiptDetailTable from "../features/warehouse-receipts/WarehouseReceiptDetailTable.tsx";
import CreateWarehouseReceiptForm from "../features/warehouse-receipts/CreateWarehouseReceiptForm.tsx";
import { useCreateWarehouseReceipt } from "../features/warehouse-receipts/hooks";
import { useAppDispatch } from "../store/hooks.ts";
import { type INewWarehouseReceipt } from "../interfaces";
import { clearWarehouseReceipt } from "../features/warehouse-receipts/warehouseReceiptSlice.ts";

function NewWarehouseReceipt() {
  const [createWarehouseReceiptForm] = Form.useForm();
  const { createWarehouseReceipt, isCreating } = useCreateWarehouseReceipt();
  const dispatch = useAppDispatch();

  function handleFinish(submittedWarehouseReceipt: INewWarehouseReceipt): void {
    createWarehouseReceipt(submittedWarehouseReceipt, {
      onSuccess: () => {
        handleResetWarehouseReceipt();
      },
    });
  }

  function handleResetWarehouseReceipt(): void {
    dispatch(clearWarehouseReceipt());
    createWarehouseReceiptForm.resetFields();
  }

  return (
    <div className="flex items-center justify-between">
      <div className="card min-h-[calc(100vh-64px-1.5rem*2)] basis-[68%] space-y-8">
        <div className="flex items-center justify-between">
          <SearchWarehouseReceiptDetail />
          <Button
            type="primary"
            danger
            onClick={() => dispatch(handleResetWarehouseReceipt)}
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
          <Button className="btn-primary h-12 text-base" type="primary" block>
            LẬP VÀ IN PHIẾU NHẬP KHO
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewWarehouseReceipt;
