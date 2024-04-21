/* eslint-disable no-unused-vars */
import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import SearchGoodReceiptDetail from "../features/good-receipts/SearchGoodReceiptDetail";
import { clearGoodReceiptDetails } from "../features/good-receipts/goodReceiptSlice";
import GoodReceiptDetailTable from "../features/good-receipts/GoodReceiptDetailTable";

function GoodReceipt() {
  const dispatch = useDispatch();
  const [createGoodReceiptForm] = Form.useForm();

  return (
    <div className="flex items-center justify-between">
      <div className="card min-h-[calc(100vh-64px-1.5rem*2)] basis-[68%] space-y-8">
        <div className="flex items-center justify-between">
          <SearchGoodReceiptDetail />
          <Button
            type="primary"
            danger
            onClick={() => dispatch(clearGoodReceiptDetails())}
          >
            Xóa tất cả chi tiết
          </Button>
        </div>
        <GoodReceiptDetailTable />
      </div>
      <div className="card flex min-h-[calc(100vh-64px-1.5rem*2)] basis-[30%] flex-col justify-between gap-8">
        <div className="flex items-center justify-between"></div>
        <div className="flex-1"></div>

        <Button
          className="btn-primary h-12 text-base"
          type="primary"
          htmlType="submit"
          form="createGoodReceiptForm"
          block
        >
          THANH TOÁN
        </Button>
      </div>
    </div>
  );
}

export default GoodReceipt;
