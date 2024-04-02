/* eslint-disable no-unused-vars */
import SearchProductBar from "../features/customers/SearchProductBar";
import OrderDetailsTable from "../features/orders/OrderDetailsTable";

function Retail() {
  return (
    <div className="flex items-center justify-between">
      <div className="card basis-[68%] space-y-8">
        <SearchProductBar />
        <OrderDetailsTable />
      </div>
      <div className="card basis-[30%]">iii</div>
    </div>
  );
}

export default Retail;
