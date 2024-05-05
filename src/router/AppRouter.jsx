import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Error from "../ui/Error";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Suppliers from "../pages/Suppliers";
import Customers from "../pages/Customers";
import NewOrder from "../pages/NewOrder";
import Orders from "../pages/Orders";
import WarehouseReceipts from "../pages/WarehouseReceipts";
import WarehouseExports from "../pages/WarehouseExports";
import CashFlow from "../pages/CashFlow";
import NewWarehouseReceipt from "../pages/NewWarehouseReceipt";
import NewWarehouseExport from "../pages/NewWarehouseExport";
import Reports from "../pages/Reports";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";

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
        path: "/partners/suppliers",
        errorElement: <Error />,
        element: <Suppliers />,
      },
      {
        path: "/partners/customers",
        errorElement: <Error />,
        element: <Customers />,
      },
      {
        path: "/transactions/orders",
        errorElement: <Error />,
        element: <Orders />,
      },
      {
        path: "/transactions/warehouse-receipts",
        errorElement: <Error />,
        element: <WarehouseReceipts />,
      },
      {
        path: "/transactions/warehouse-exports",
        errorElement: <Error />,
        element: <WarehouseExports />,
      },
      {
        path: "/sales/new-order",
        errorElement: <Error />,
        element: <NewOrder />,
      },
      {
        path: "/sales/new-warehouse-receipt",
        errorElement: <Error />,
        element: <NewWarehouseReceipt />,
      },
      {
        path: "/sales/new-warehouse-export",
        errorElement: <Error />,
        element: <NewWarehouseExport />,
      },
      {
        path: "/cash-flow",
        errorElement: <Error />,
        element: <CashFlow />,
      },
      {
        path: "/reports",
        errorElement: <Error />,
        element: <Reports />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        errorElement: <Error />,
        element: <Login />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}
export default AppRouter;
