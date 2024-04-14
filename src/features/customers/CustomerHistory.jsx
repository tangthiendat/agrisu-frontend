/* eslint-disable react/prop-types */
import CreateReceipt from "../receipts/CreateReceipt";

function CustomerHistory({ customer }) {
  return (
    <div>
      <div className="text-right">
        <CreateReceipt customer={customer} />
      </div>
    </div>
  );
}

export default CustomerHistory;
