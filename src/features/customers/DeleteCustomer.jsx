import { MdDelete } from "react-icons/md";
import { Tooltip } from "antd";

function DeleteCustomer() {
  return (
    <Tooltip title="Xóa" placement="bottom">
      <MdDelete className="icon" color="var(--color-red-500)" />
    </Tooltip>
  );
}

export default DeleteCustomer;
