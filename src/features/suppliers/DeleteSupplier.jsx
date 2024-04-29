import { Tooltip } from "antd";
import { MdDelete } from "react-icons/md";

function DeleteSupplier() {
  return (
    <Tooltip title="Xóa" placement="bottom">
      <MdDelete className="icon" color="var(--color-red-500)" />
    </Tooltip>
  );
}

export default DeleteSupplier;
