/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Popconfirm, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { useDeleteProduct } from "./useDeleteProduct";

function DeleteProduct({ productId }) {
  const { deleteProduct } = useDeleteProduct();
  return (
    <Popconfirm
      title="Xóa sản phẩm"
      description="Bạn có chắc muốn xóa sản phẩm này không?"
      okText="Xóa"
      okButtonProps={{ danger: true }}
      onConfirm={() => deleteProduct(productId)}
      cancelText="Hủy"
    >
      <Tooltip title="Xóa" placement="bottom">
        <MdDelete className="icon" color="var(--color-red-500)" />
      </Tooltip>
    </Popconfirm>
  );
}

export default DeleteProduct;
