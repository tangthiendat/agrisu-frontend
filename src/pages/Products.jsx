import { Typography } from "antd";
import ProductTable from "../features/products/ProductTable";
import AddProduct from "../features/products/AddProduct";
import SearchProductBar from "../features/products/SearchProductBar";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../features/products/productSlice";

const { Title } = Typography;
function Products() {
  const dispatch = useDispatch();

  function handleSelectProduct(selectedProduct) {
    dispatch(setSelectedProduct([selectedProduct]));
  }

  function handleClear() {
    dispatch(setSelectedProduct([]));
  }

  return (
    <div className="card min-h-[calc(100vh-64px-1.5rem*2)]">
      <Title className="mb-2">Sản phẩm</Title>
      <div className="mb-4 flex content-center items-center justify-between">
        <div className="basis-[30%]">
          <SearchProductBar
            onSelectProduct={handleSelectProduct}
            onClear={handleClear}
          />
        </div>
        <AddProduct />
      </div>
      <div>
        <ProductTable />
      </div>
    </div>
  );
}

export default Products;
