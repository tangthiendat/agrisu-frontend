/* eslint-disable react/prop-types */
import { Popconfirm, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { useDeleteSupplier } from "./hooks/useDeleteSuppliers";

function DeleteSupplier({ supplierId }) {
  const { deleteSupplier, isDeleting } = useDeleteSupplier();
  return (
    <Popconfirm
      title="Xóa nhà cung cấp"
      description="Bạn có chắc muốn xóa nhà cung cấp này không?"
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true, loading: isDeleting }}
      onConfirm={() => deleteSupplier(supplierId)}
    >
      <Tooltip title="Xóa" placement="bottom">
        <MdDelete className="icon" color="var(--color-red-500)" />
      </Tooltip>
    </Popconfirm>
  );
}

export default DeleteSupplier;
