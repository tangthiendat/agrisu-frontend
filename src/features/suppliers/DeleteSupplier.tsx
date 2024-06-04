import { Popconfirm, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { setSelectedSupplier } from "./supplierSlice.ts";
import { useDeleteSupplier } from "./hooks/index.ts";
import { useAppDispatch } from "../../store/hooks.ts";

interface DeleteSupplierProps {
  supplierId: string;
}

const DeleteSupplier: React.FC<DeleteSupplierProps> = ({ supplierId }) => {
  const { deleteSupplier, isDeleting } = useDeleteSupplier();
  const dispatch = useAppDispatch();
  return (
    <Popconfirm
      title="Xóa nhà cung cấp"
      description="Bạn có chắc muốn xóa nhà cung cấp này không?"
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true, loading: isDeleting }}
      onConfirm={() =>
        deleteSupplier(supplierId, {
          onSuccess: () => {
            dispatch(setSelectedSupplier([]));
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

export default DeleteSupplier;
