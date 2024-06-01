import { MdDelete } from "react-icons/md";
import { Popconfirm, Tooltip } from "antd";
import { useDeleteCustomer } from "./hooks/useDeleteCustomer";
import { useDispatch } from "react-redux";
import { setSelectedCustomer } from "./customerSlice";

function DeleteCustomer({ customerId }) {
  const { deleteCustomer, isDeleting } = useDeleteCustomer();
  const dispatch = useDispatch();
  return (
    <Popconfirm
      title="Xóa khách hàng"
      description="Bạn có chắc muốn xóa khách hàng này không?"
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true, loading: isDeleting }}
      onConfirm={() =>
        deleteCustomer(customerId, {
          onSuccess: () => {
            dispatch(setSelectedCustomer([]));
          },
        })
      }
    >
      <Tooltip title="Xóa" placement="bottom">
        <MdDelete className="icon" color="var(--color-red-500)" />
      </Tooltip>
    </Popconfirm>
  );
}

export default DeleteCustomer;
