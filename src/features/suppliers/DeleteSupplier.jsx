/* eslint-disable react/prop-types */
import { Popconfirm, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { useDeleteSupplier } from "./hooks/useDeleteSuppliers";
import { useDispatch } from "react-redux";
import { setSelectedSupplier } from "./supplierSlice";

function DeleteSupplier({ supplierId }) {
  const { deleteSupplier, isDeleting } = useDeleteSupplier();
  const dispatch = useDispatch();
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
}

export default DeleteSupplier;
