/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { Popconfirm, Tooltip } from "antd";
import { useDeleteCustomer } from "./hooks/useDeleteCustomer";

function DeleteCustomer({ customerId }) {
  const { deleteCustomer, isDeleting } = useDeleteCustomer();
  return (
    <Popconfirm
      title="Xóa sản phẩm"
      description="Bạn có chắc muốn xóa sản phẩm này không?"
      okText="Xóa"
      okButtonProps={{ danger: true, loading: isDeleting }}
      onConfirm={() => deleteCustomer(customerId)}
      cancelText="Hủy"
    >
      <Tooltip title="Xóa" placement="bottom">
        <MdDelete className="icon" color="var(--color-red-500)" />
      </Tooltip>
    </Popconfirm>
  );
}

export default DeleteCustomer;
