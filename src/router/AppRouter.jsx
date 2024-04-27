import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Error from "../ui/Error";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Suppliers from "../pages/Suppliers";
import Customers from "../pages/Customers";
import Retail from "../pages/Retail";
import Invoices from "../pages/Invoices";
import CashFlow from "../pages/CashFlow";
import WarehouseReceipt from "../pages/WarehouseReceipt";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        index: true,
        errorElement: <Error />,
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        errorElement: <Error />,
        element: <Dashboard />,
      },
      {
        path: "/products",
        errorElement: <Error />,
        element: <Products />,
      },
      {
        path: "partners/suppliers",
        errorElement: <Error />,
        element: <Suppliers />,
      },
      {
        path: "partners/customers",
        errorElement: <Error />,
        element: <Customers />,
      },

      {
        path: "/transactions/invoices",
        errorElement: <Error />,
        element: <Invoices />,
      },
      {
        path: "/sales/retail",
        errorElement: <Error />,
        element: <Retail />,
      },
      {
        path: "/sales/warehouse-receipt",
        errorElement: <Error />,
        element: <WarehouseReceipt />,
      },
      {
        path: "/cash-flow",
        errorElement: <Error />,
        element: <CashFlow />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}
export default AppRouter;
