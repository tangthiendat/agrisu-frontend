import { Typography } from "antd";

import ProductTable from "../features/products/ProductTable";
import AddProduct from "../features/products/AddProduct";

const { Title } = Typography;
function Products() {
  return (
    <div className="container">
      <Title className="mb-2">Sản phẩm</Title>
      <div className="mb-4 flex content-center items-center justify-end">
        <AddProduct />
      </div>
      <div>
        <ProductTable />
      </div>
    </div>
  );
}

export default Products;
