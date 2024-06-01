import ProductTable from "../features/products/ProductTable";
import AddProduct from "../features/products/AddProduct";
import SearchProductBar from "../features/products/SearchProductBar";
import { setSelectedProduct } from "../features/products/productSlice";
import Title from "antd/es/typography/Title";
import { IProduct } from "../interfaces";
import { useAppDispatch } from "../store/hooks";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();

  function handleSelectProduct(selectedProduct: IProduct) {
    dispatch(setSelectedProduct([selectedProduct]));
  }

  function handleClear() {
    dispatch(setSelectedProduct([]));
  }

  return (
    <div className="card min-h-[calc(100vh-64px-1.5rem*2)]">
      <Title className="mb-2">Sản phẩm</Title>
      <div className="mb-4 flex items-center justify-between">
        <div className="basis-[35%]">
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
};

export default Products;
