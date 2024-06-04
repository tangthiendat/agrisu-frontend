import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import SearchWarehouseExportCustomer from "../features/warehouse-exports/SearchWarehouseExportCustomer";
import SearchWarehouseExportDetail from "../features/warehouse-exports/SearchWarehouseExportDetail";
import WarehouseExportDetailTable from "../features/warehouse-exports/WarehouseExportDetailTable";
import CreateWarehouseExportForm from "../features/warehouse-exports/CreateWarehouseExportForm";
import {
  clearWarehouseExport,
  clearWarehouseExportDetails,
} from "../features/warehouse-exports/warehouseExportSlice";
import { useCreateWarehouseExport } from "../features/warehouse-exports/hooks/useCreateWarehouseExport";

function NewWarehouseExport() {
  const dispatch = useDispatch();
  const [createWarehouseExportForm] = Form.useForm();
  const { createWarehouseExport, isCreating } = useCreateWarehouseExport();

  function handleFinish(submittedWareHouseExport) {
    createWarehouseExport(submittedWareHouseExport, {
      onSuccess: () => {
        createWarehouseExportForm.resetFields();
        dispatch(clearWarehouseExport());
      },
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="card min-h-[calc(100vh-64px-1.5rem*2)] basis-[68%] space-y-8">
        <div className="flex items-center justify-between">
          <SearchWarehouseExportDetail />
          <Button
            type="primary"
            danger
            onClick={() => dispatch(clearWarehouseExportDetails())}
          >
            Xóa tất cả chi tiết
          </Button>
        </div>
        <WarehouseExportDetailTable />
      </div>
      <div className="card flex min-h-[calc(100vh-64px-1.5rem*2)] basis-[30%] flex-col justify-between gap-8">
        <SearchWarehouseExportCustomer />
        <div className="flex-1">
          <CreateWarehouseExportForm
            form={createWarehouseExportForm}
            onFinish={handleFinish}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4">
          <Button
            className="btn-primary h-12 text-base"
            type="primary"
            htmlType="submit"
            form="createWarehouseExportForm"
            block
            loading={isCreating}
          >
            LẬP PHIẾU XUẤT KHO
          </Button>
          <Button
            className="btn-primary h-12 text-base"
            type="primary"
            block
            // loading={isCreating}
          >
            LẬP VÀ IN PHIẾU XUẤT KHO
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewWarehouseExport;