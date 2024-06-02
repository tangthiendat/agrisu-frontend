import { MdDelete } from "react-icons/md";
import { Popconfirm, Tooltip } from "antd";
import { useDeleteCustomer } from "./hooks";
import { setSelectedCustomer } from "./customerSlice.ts";
import { useAppDispatch } from "../../store/hooks.ts";

interface DeleteCustomerProps {
  customerId: string;
}

const DeleteCustomer: React.FC<DeleteCustomerProps> = ({ customerId }) => {
  const { deleteCustomer, isDeleting } = useDeleteCustomer();
  const dispatch = useAppDispatch();
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
};

export default DeleteCustomer;
